// JS：disc\第1章\1.2\1.2.3\game.js
import './js/libs/weapp-adapter'
import './js/libs/symbol'

// 创建画布
let canvas = wx.createCanvas()
console.log(canvas.width, canvas.height) // Output: 414 736

// 绘制矩形
let context = canvas.getContext("2d")
context.fillStyle = "red"
context.fillRect(0, 0, 100, 100)