// JS：disc\第1章\1.2\1.2.6_练习3_2\game.js
import './js/libs/weapp-adapter'

// 获取主画布的渲染上下文对象
let mainContext = canvas.getContext("2d")

// 思考与练习3，通过for循环检查
let image = wx.createImage()
image.src = "https://cdn.jsdelivr.net/gh/rixingyike/images/2021/20210829224044小游戏从0到1.png"
// 使用for循环
for (let j = 0; j < 100000; j++) {
  console.log(image.width) // Output：0?
  if (image.width > 0) {
    console.log("image.width", image.width) // Output：image.width 300？
    mainContext.drawImage(image, 0, 0)
    break
  }
}
console.log(image.width) // Output：0？