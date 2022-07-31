// JS：open_data\index.js
// import { promisify } from "../src/utils.js" // 无法导入

// 接收来自主域的命令请求
wx.onMessage(async res => {
  let executeRes
  if (res.command === "render") {
    executeRes = await render(res.data) // 渲染共享画布
  } else if (res.command === "update") {
    executeRes = await update(res.data) // 更新用户得分
  }
  console.log(`${res.command}执行结果`, executeRes)
})

// 拉取好友游戏数据
async function retrieveUserGameDataList() {
  const res = await promisify(wx.getFriendCloudStorage)({
    keyList: ["rank"]
  })?.catch(console.log)
  return res?.data ?? []
  // return new Promise((resolve, reject) => {
  //   // 这个接口本身并不支持Promise风格调用
  //   wx.getFriendCloudStorage({
  //     keyList: ["rank"],
  //     success: res => {
  //       if (res.errMsg === "getFriendCloudStorage:ok") resolve(res.data)
  //     },
  //     fail: err => reject(err)
  //   })
  // })
}

// 更新用户的KVData数据
async function update(data) {
  let needUpdate = true
  const newRankValue = JSON.parse(data.KVDataList[0].value)
    , userGameDataList = await retrieveUserGameDataList()
  console.log("更新前已加载好友游戏数据", userGameDataList)

  // 检查是否需要更新
  const N = userGameDataList.length
  for (let j = 0; j < N; j++) {
    const user = userGameDataList[j]
    const rankValue = JSON.parse(user.KVDataList[0].value)
    if (data.openid === user.openid) {
      if (newRankValue.wxgame.score <= rankValue.wxgame.score) needUpdate = false
      break
    }
  }

  if (needUpdate) {
    const KVDataList = data.KVDataList
    const res = await promisify(wx.setUserCloudStorage)({
      KVDataList
    })?.catch(console.log)
    return res?.errMsg === "setUserCloudStorage:ok"
  }

  return false
}

// 在共享画布上渲染排行榜
async function render(data) {
  const userGameDataList = await retrieveUserGameDataList()
    , sharedCanvas = wx.getSharedCanvas()
    , context = sharedCanvas.getContext("2d")
  console.log("渲染时已加载好友游戏数据", userGameDataList)

  // 绘制标题
  context.fillStyle = "#07336b"
  context.font = "bold 20px/22px STHeiti"
  context.fillText("排行榜", 20, 40)

  // 绘制玩家昵称及得分列表
  context.font = "14px STHeiti"
  let offsetY = 75
  const N = userGameDataList.length
  for (let j = 0; j < N; j++) {
    const user = userGameDataList[j]
    const txt = user.nickname
    if (user.KVDataList.length > 0) {
      const rankValue = JSON.parse(user.KVDataList[0].value)
      txt = `玩家：${user.nickname}\t\t\t分数：${rankValue.wxgame.score}`
    }
    context.fillText(txt, 20, offsetY)
    offsetY += 25
  }

  return true
}

/** 将小程序/小游戏异步接口转为同步接口 */
function promisify(asyncApi) {
  return (args = {}) =>
    new Promise((resolve, reject) => {
      asyncApi(
        Object.assign(args, {
          success: resolve,
          fail: reject
        })
      )
    })
}
