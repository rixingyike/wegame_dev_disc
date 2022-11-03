/**
 * 《微信小游戏开发：前端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/

// JS：disc\第6章\6.2\6.2.9\a.js
console.log("a started")
exports.done = false
const b = require("./b.js") // 导入了b.js
console.log("in a, b.done =", b.done)
exports.done = true
console.log("a done")