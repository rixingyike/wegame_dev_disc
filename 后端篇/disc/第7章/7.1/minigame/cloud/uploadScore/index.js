// 云函数入口文件
const cloud = require("wx-server-sdk")

// 与小程序端的代码一致，均需调用 init 方法初始化
// cloud.init()
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 可在入口函数外缓存 db 对象
const db = cloud.database()

// 重命名数据库查询、更新指令对象，便于使用
const _ = db.command

// 云函数入口函数
// export default async function main(event, context) {
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // 以 openid-score 作为记录 id
  const openid = wxContext.OPENID
  const docId = `openid-score`
  const querResult = await db.collection("score").doc(docId).get().catch(console.log)
  // const userRecord = querResult?.data 

  if (querResult) {
    // 第一次会取不到记录，querResult会为空
    const userRecord = querResult.data
    // 更新用户分数
    const maxScore = userRecord.scores.concat([event.score]).reduce((acc, cur) => cur > acc ? cur : acc)
    const updateResult = await db.collection("score").doc(docId).update({
      data: {
        // _.push 指往 scores 数组字段尾部添加一个记录，该操作为原子操作
        scores: _.push(event.score),
        max: maxScore
      }
    })

    if (updateResult.stats.updated === 0) {
      // 没有更新成功，更新数为 0
      return {
        success: false
      }
    }

    return {
      success: true,
      updated: true
    }

  } else {
    // 创建新的用户记录
    await db.collection("score").add({
      // data 是将要被插入到 score 集合的 JSON 对象
      data: {
        // 这里指定了 _id，如果不指定，数据库会默认生成一个
        _id: docId,
        // 这里指定了 _openid，因在云函数端创建的记录不会默认插入用户 openid，如果是在小程序端创建的记录，会默认插入 _openid 字段
        _openid: openid,
        // 分数历史
        scores: [event.score],
        // 缓存最大值
        max: event.score,
      }
    })

    return {
      success: true,
      created: true,
    }
  }
}
