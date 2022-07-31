// JS：controllers\api\histories.js
"use strict"
import model from "../../models/index.js"

export default {
  /**
   * GET /histories：查询个人的历史记录
   * @param {*} ctx 
   * @param {*} next 
   * @returns {obejct} {"errMsg":"ok","data":[{}]}
   */
  "GET ": async (ctx, next) => {
    const { openid } = ctx.request.query
      , res = { errMsg: "ok" }
      , db = await model.connect()
    res.data = await model.execute(db, "select * from history where openid=@openid order by date_created desc limit 10", { openid })
    ctx.status = 200
    ctx.body = res
  },

  /**
   * POST /histories：新增一条历史记录
   * @returns {*} {"errMsg":"ok","data":newid}
   */
  "POST ": async (ctx, next) => {
    const { openid, user_score, system_score } = ctx.request.body
      , activity = model.history({ openid, user_score, system_score })
      
    await activity.save() // 即使成功返回也是undefined
    const res = { errMsg: activity.identity() > 0 ? "ok" : "", data: activity.identity() }
    ctx.status = 200
    ctx.body = res
  },

  /**
   * DELETE /histories/{history_id}：依据history_id删除一条记录
   * @param {*} ctx 
   * @param {*} next 
   * @returns {object} {"errMsg":"ok"}
   */
  "DELETE /:history_id": async (ctx, next) => {
    let { history_id: id } = ctx.params
    const { openid } = ctx.request.query
      , db = await model.connect()
    id = parseInt(id)
    /**
     * 返回的数据示例
     * {affectedRows: 1
        changedRows: 0
        fieldCount: 0
        insertId: 0
        message: ""}
     */
    // 只用一个id就足够了，这里演示两个查询的使用
    const res = await model.execute(db, "delete from history where id=@id && openid=@openid limit 1", { id, openid })
    ctx.status = 200
    ctx.body = {
      errMsg: res.affectedRows > 0 ? "ok" : "err"
      , data: res.affectedRows
    }
  }
}