// JS：disc\第1章\1.2\1.2.8_练习5\game.js
import './js/libs/weapp-adapter'

// 获取主画布的渲染上下文对象
let mainContext = canvas.getContext("2d")

// 实现有缓动的拖动动画
let targetX = 0,
  targetY = 0,
  currentX = 0,
  currentY = 0

let image = wx.createImage()
image.onload = function () {
  mainContext.drawImage(image, 0, 0)
}
image.src = "https://cdn.jsdelivr.net/gh/rixingyike/images/2021/20210829224044小游戏从0到1.png"

wx.onTouchMove(function (e) {
  let touch = e.touches[0]
  targetX = touch.clientX
  targetY = touch.clientY
})
// 循环
function animate() {
  mainContext.clearRect(0, 0, canvas.width, canvas.height)
  currentX += (targetX - currentX) / 15 // 分母越大，滑动效果越细腻
  currentY += (targetY - currentY) / 15
  mainContext.drawImage(image, currentX, currentY)
  requestAnimationFrame(animate)
}
animate()