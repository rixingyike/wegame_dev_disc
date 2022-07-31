// JS：第2章\2.8\示例37\index.js
import instanceOf from "./instance_of.js"
const obj = {
  "前端开发": [
    { "JS": ["JS语法基础", "JS实战练习"] },
    { "jQuery": ["jQuery接口学习", "jQuery应用实战"] },
    "微信小程序",
    "微信小游戏"
  ]
}
// 递归打印函数
function print(target, tab = "") {
  if (instanceOf(target, String)) {
    console.log(`${tab}${target}`)
  } else if (instanceOf(target, Array)) {
    tab += "\t"
    for (let j = 0; j < target.length; j++) {
      print(target[j], tab)
    }
  } else {
    for (let key in target) {
      console.log(`${tab}${key}`)
      print(target[key], tab)
    }
  }
}
print(obj)