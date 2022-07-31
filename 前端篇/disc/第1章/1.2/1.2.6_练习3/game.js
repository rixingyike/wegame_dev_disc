// JS：disc\第1章\1.2\1.2.6_练习3\game.js
import './js/libs/weapp-adapter'

// 获取主画布的渲染上下文对象
let mainContext = canvas.getContext("2d")

// 思考与练习3，通过定时器检查
let image = wx.createImage()
image.src = "https://cdn.jsdelivr.net/gh/rixingyike/images/2021/20210829224044小游戏从0到1.png"
// 使用定时器检测加载完成度
let intervalId = setInterval(() => {
  if (image.width > 0) {
    console.log("image.width", image.width) // Output：image.width 300
    clearInterval(intervalId) // 完成后清除定时器
    mainContext.drawImage(image, 0, 0)
  }
}, 200)