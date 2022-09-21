// JS：src\managers\cloud_function_manager.js
const HISTORY = "history" // 游戏历史数据集合名称
  , ERROR = "error" // 错误信息集合名称

/** 云资源管理者 */
class CloudFunctionManager {
  constructor() {
    wx.cloud.init({
      env: "dev-df2a97"
    })
    this.#db = wx.cloud.database({
      throwOnNotFound: false
    })
  }

  /** 云数据库引用 */
  #db

  /** 
   * 上传用户得分
   * @param {number} userScore 
   */
  async uploadScore(userScore) {
    const res = await wx.cloud.callFunction({
      name: "uploadScore",
      data: {
        score: userScore
      }
    }).catch(console.log)

    return {
      errMsg: res.errMsg === "cloud.callFunction:ok" ? "uploadScore:ok" : res.errMsg
    }
  }

  /** 写入游戏历史数据 */
  async writeHistoryData(userScore, systemScore) {
    return await this.write({
      dateCreated: new Date(),
      userScore,
      systemScore
    }, HISTORY)
  }

  /** 读取游戏历史数据 */
  async readHistoryDatas() {
    return await this.read(HISTORY)
  }

  /** 清空游戏历史数据 */
  async clearHistoryDatas() {
    return await this.clear(HISTORY)
  }

  /** 记录错误日志 */
  async writeError(err) {
    return await this.write({
      dateCreated: new Date(),
      err
    }, ERROR)
  }

  /** 读取错误日志 */
  async readErrors() {
    return await this.read(ERROR)
  }

  /** 清除错误日志 */
  async clearErrors() {
    return await this.clear(ERROR)
  }

  /** 向云数据库写入数据 */
  async write(data, collection = HISTORY) {
    return this.#db.collection(collection).add({
      data
    }).catch(console.log)
  }

  /** 从云数据库读取数据 */
  async read(collection = HISTORY) {
    const _ = this.#db.command
    return this.#db.collection(collection)
      .where({
        "dateCreated": _.lt(new Date())
      })
      .orderBy("dateCreated", "asc")
      .get().catch(console.log)
  }

  /** 清扫云数据库集合数据 */
  async clear(collection = HISTORY) {
    const _ = this.#db.command
    return await this.#db.collection(collection).where({
      "dateCreated": _.lt(new Date())
    }).remove().catch(console.log) // 仅能移除1条
  }

  /** 从云数据库分页读取数据 */
  async readByPage(collection = HISTORY, pageIndex = 1, pageSize = 10, whereCondition = null) {
    const _ = this.#db.command
      , offset = (pageIndex - 1) * pageSize
    whereCondition = whereCondition || {
      "dateCreated": _.lt(this.#db.serverDate())
    }
    const listRes = await this.#db.collection(collection)
      .where(whereCondition)
      .orderBy("dateCreated", "desc")
      .limit(pageSize)
      .skip(offset)
      .get().catch(console.log)
    const totalRes = await this.#db.collection(collection)
      .where(whereCondition)
      .orderBy("dateCreated", "desc")
      .count().catch(console.log)

    return {
      errMsg: listRes?.errMsg === "collection.get:ok" ? "readByPage:ok" : listRes?.errMsg
      , data: {
        list: listRes?.data ?? []
        , total: totalRes?.total ?? 0
      }
    }
  }

  /** 从云数据库使用聚合对象实现分页查询 */
  async readByPageViaAggregate(collection = HISTORY, pageIndex = 1, pageSize = 10, whereCondition = null) {
    const _ = this.#db.command
      , offset = (pageIndex - 1) * pageSize
      , $ = this.#db.command.aggregate
    whereCondition = whereCondition || {
      userScore: _.gte(0)
    }

    const listRes = await this.#db.collection(collection)
      .aggregate()
      .addFields({
        totalSystemScore: $.sum("$systemScore")
        , totalUserScore: $.sum("$userScore")
        , totalScore: $.add(["$systemScore", "$userScore"])
      })
      .match(whereCondition)
      .sort({
        dateCreated: -1
      })
      .limit(pageSize)
      .skip(offset)
      .end().catch(console.log)

    const totalRes = await this.#db.collection(collection)
      .aggregate()
      .match(whereCondition)
      .sort({
        dateCreated: -1
      })
      .count("total")
      .end().catch(console.log)

    return {
      errMsg: listRes?.errMsg === "collection.aggregate:ok" ? "readByPageViaAggregate:ok" : listRes?.errMsg
      , data: {
        list: listRes?.list ?? []
        , total: totalRes?.list[0]?.total ?? 0
      }
    }
  }

  /** 循环清扫云数据库集合数据 */
  async forceClear(collection = HISTORY) {
    const list = (await this.read(collection))?.data ?? []
      , n = list.length
    for (let j = 0; j < n; j++) {
      const row = list[j]
      await this.#db.collection(collection).doc(row._id).remove()
    }
    return {
      errMsg: n > 0 ? "forceClear:ok" : ""
    }
  }
}

export default new CloudFunctionManager()