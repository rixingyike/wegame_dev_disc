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
export async function vibrate(){
  // 可能会派发这样一个错误："vibrateShort:fail:not supported"
  const res = await wx?.vibrateShort().catch(console.log)
  if (!res || res.errMsg !== "vibrateShort:ok"){
    wx?.vibrateLong().catch(console.log)
  }
}