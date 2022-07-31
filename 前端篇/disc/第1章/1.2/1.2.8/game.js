// JS：disc\第1章\1.2\1.2.8\game.js
import './js/libs/weapp-adapter'

// 获取主画布的渲染上下文对象
let mainContext = canvas.getContext("2d")

// 实现人机交互
let image = wx.createImage()
image.onload = function () {
  mainContext.drawImage(image, 0, 0)
}
image.src = "https://cdn.jsdelivr.net/gh/rixingyike/images/2021/20210829224044小游戏从0到1.png"

wx.onTouchMove(function(e) {
  let touch = e.touches[0]
  mainContext.clearRect(0, 0, canvas.width, canvas.height)
  mainContext.drawImage(image, touch.clientX, touch.clientY)
})