// JS：第1章\1.8\game.js
import './js/libs/weapp-adapter'
// import './js/libs/symbol' // 这一行是适配ES6新类型Symbol的，也可以不注释

// import Main from './js/main'
// new Main()

// 创建画布，1.8.1
// let canvas = wx.createCanvas()
// console.log(canvas.width, canvas.height) // 输出： 414 736
// console.assert(canvas.width == 414 && canvas.height == 736, "屏幕尺寸断言有误")

// 关闭调试，思考与练习15
// wx.setEnableDebug({
//   enableDebug: true
// })
// console.log = (...args)=> {}

// 绘制距形，1.8.3
// let context = canvas.getContext("2d")
// context.fillStyle = "red"
// context.fillRect(0, 0, 100, 100)

// 创建画布，这是一个离屏 Canvas，1.8.3
let otherCanvas = wx.createCanvas()
let context = otherCanvas.getContext("2d")
context.fillStyle = "red"
context.fillRect(0, 0, 100, 100)
// context.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100)

// 将离屏内容翻绘在主屏上
let mainContext = canvas.getContext("2d")
mainContext.drawImage(otherCanvas, 0, 0)

// 此处相当于清空画布，距形看不到了
// canvas.width = canvas.width
// canvas.height = canvas.height

// 清扫画布的正规方法，效果等同
mainContext.clearRect(0, 0, canvas.width, canvas.height)

// 绘制网络图片
// let image = wx.createImage()
// image.src = "https://cdn.jsdelivr.net/gh/rixingyike/images/2021/20210829224044小游戏从0到1.png"
// mainContext.drawImage(image, 0, 0)
// image.onload = function () {
//   mainContext.drawImage(image, 0, 0)
// }

// 思考与练习17，通过定时器检查
// let image = wx.createImage()
// image.src = "https://cdn.jsdelivr.net/gh/rixingyike/images/2021/20210829224044小游戏从0到1.png"
// // 使用定时器检测加载完成度
// let intervalId = setInterval(() => {
//   if (image.width > 0) {
//     console.log("image.width", image.width) // 输出：image.width 300
//     clearInterval(intervalId) // 完成后清除定时器
//     mainContext.drawImage(image, 0, 0)
//   }
// }, 200)

// 思考与练习17，通过for循环检查
// let image = wx.createImage()
// image.src = "https://cdn.jsdelivr.net/gh/rixingyike/images/2021/20210829224044小游戏从0到1.png"
// // 使用for循环
// for (let j = 0; j < 10000; j++) {
//   console.log(image.width) // 输出：0?
//   if (image.width > 0) {
//     console.log("image.width", image.width) // 输出：image.width 300？
//     mainContext.drawImage(image, 0, 0)
//     break
//   }
// }
// console.log(image.width) // 输出：0？

// 实现动画
// let image = wx.createImage()
// image.onload = function () {
//   // mainContext.drawImage(image, 0, 0)
//   moveDownImage()
// }
// image.src = "https://cdn.jsdelivr.net/gh/rixingyike/images/2021/20210829224044小游戏从0到1.png"

// let imagePositionY = 0
// function moveDownImage() {
//   // 清屏
//   mainContext.clearRect(0, 0, canvas.width, canvas.height)
//   // 重绘
//   mainContext.drawImage(image, 0, imagePositionY++)
//   // 循环
//   requestAnimationFrame(moveDownImage)
// }
// moveDownImage()

// 实现人机交互
// let image = wx.createImage()
// image.onload = function () {
//   mainContext.drawImage(image, 0, 0)
// }
// image.src = "https://cdn.jsdelivr.net/gh/rixingyike/images/2021/20210829224044小游戏从0到1.png"

// wx.onTouchMove(function (e) {
//   let touch = e.touches[0]
//   mainContext.clearRect(0, 0, canvas.width, canvas.height)
//   mainContext.drawImage(image, touch.clientX, touch.clientY)
// })

// 思考与练习19，实现有缓动的拖动动画
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