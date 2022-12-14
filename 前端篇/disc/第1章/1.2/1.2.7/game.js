/**
 * 《微信小游戏开发：前端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：disc\第1章\1.2\1.2.7\game.js
import './js/libs/weapp-adapter'

// 获取主画布的渲染上下文对象
let mainContext = canvas.getContext("2d")

// 实现动画
let image = wx.createImage()
image.onload = function () {
  mainContext.drawImage(image, 0, 0)
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
moveDownImage()