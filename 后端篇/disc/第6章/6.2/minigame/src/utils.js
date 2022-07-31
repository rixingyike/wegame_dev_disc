// JS：src\utils.js
/** 浅拷贝对象 */
export default function copy(source) {
  let res = {}
  for (var key in source) {
    res[key] = source[key]
  }
  return res
}

/** 在指定位置绘制文本 */
export function drawText(context, x, y, text) {
  context.fillText(text, x, y)
}

/** 将小程序/小游戏异步接口转为同步接口 */
export function promisify(asyncApi) {
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

/** 振动 */
export async function vibrate() {
  // 可能会派发这样一个错误："vibrateShort:fail:not supported"
  const res = await wx?.vibrateShort().catch(console.log)
  if (!res || res.errMsg !== "vibrateShort:ok") {
    wx?.vibrateLong().catch(console.log)
  }
}

/** 防沉迷检查 */
export async function checkAdvisedToRest() {
  const key = "REST_CHECK_KEY"
    , todayDate = new Date().toLocaleDateString()
    , res = await wx.getStorage({ key }).catch(console.log)
    , data = res?.data || {}
    , startTime = data?.startTime
    , date = data?.date

  if (startTime && date === todayDate) {
    const todayPlayedTime = Date.now() - startTime //+ 1000 * 60 * 60 * 3
      , checkRes = await wx.checkIsUserAdvisedToRest({ todayPlayedTime })
    if (checkRes.result) {
      const alertRes = await wx.showModal({
        title: "警告"
        , content: "你已超过建议游戏时间！"
        , showCancel: false
      })
      if (alertRes.confirm) wx.exitMiniProgram()
    }
  }

  if (!data.startTime) data.startTime = Date.now()
  data.date = todayDate
  wx.setStorage({ key, data })
}