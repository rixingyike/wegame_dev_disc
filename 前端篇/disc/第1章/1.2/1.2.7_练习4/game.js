// JS：disc\第1章\1.2\1.2.7_练习4\game.js
import './js/libs/weapp-adapter'

// 获取主画布的渲染上下文对象
let mainContext = canvas.getContext("2d")

// 实现动画
let image = wx.createImage()
image.onload = function () {
  // mainContext.drawImage(image, 0, 0)
  moveDownImage()
}
image.src = "https://cdn.jsdelivr.net/gh/rixingyike/images/2021/20210829224044小游戏从0到1.png"

let imagePositionY = 0
function moveDownImage() {
  // 清屏
  mainContext.clearRect(0, 0, canvas.width, canvas.height)
  // 重绘
  mainContext.drawImage(image, 0, imagePositionY++)
  // 循环
  requestAnimationFrame(moveDownImage)
}
// moveDownImage()