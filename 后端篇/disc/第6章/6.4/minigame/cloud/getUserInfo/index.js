const cloud = require("wx-server-sdk")

cloud.init()

/**
 * 云函数入口函数
 * @param {*} event 
 * @param {*} context 
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}