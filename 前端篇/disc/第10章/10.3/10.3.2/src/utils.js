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