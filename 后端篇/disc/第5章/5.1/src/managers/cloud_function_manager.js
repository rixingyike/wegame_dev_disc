// JS：src\managers\cloud_function_manager.js
const HISTORY = "history" // 游戏历史数据集合名称
  , ERROR = "error" // 错误信息集合名称

/** 云资源管理者 */
class CloudFunctionManager {
  constructor() {
    wx.cloud.init({
      env: "dev-df2a97"
    })
    this.#db = wx.cloud.database()
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
}

export default new CloudFunctionManager()