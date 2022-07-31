// JS：disc\第1章\1.2\1.2.5\game.js
import './js/libs/weapp-adapter'

// 创建画布，这是一个离屏 Canvas
let otherCanvas = wx.createCanvas()
let context = otherCanvas.getContext("2d")

// 绘制矩形
context.fillStyle = "red"
context.fillRect(0, 0, 100, 100)
// context.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100) // 练习2

// 将离屏内容翻绘在主屏上
let mainContext = canvas.getContext("2d")
mainContext.drawImage(otherCanvas, 0, 0)

// 此处相当于清空画布，矩形看不到了
canvas.width = canvas.width
canvas.height = canvas.height

// 清空画布的正规方法，效果等同
mainContext.clearRect(0, 0, canvas.width, canvas.height)