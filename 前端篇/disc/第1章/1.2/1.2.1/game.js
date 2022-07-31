// JS：disc\第1章\1.2\1.2.1\game.js
import './js/libs/weapp-adapter'
import './js/libs/symbol'

// import Main from './js/main'
// new Main()

// 创建画布
let canvas = wx.createCanvas()
console.log(canvas.width, canvas.height) // Output: 414 736

// 练习1
console.assert(canvas.width == 414 && canvas.height == 736, "屏幕尺寸断言有误")