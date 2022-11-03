/**
 * 《微信小游戏开发：前端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
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