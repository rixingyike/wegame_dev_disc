/**
 * 《微信小游戏开发：前端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：disc\第2章\2.2.2_练习8\instance_of.js
function instanceOf(left, right) {
  const instancePrototype = Object.getPrototypeOf(left)
  if(!instancePrototype) return false
  if (instancePrototype === right.prototype) return true 
  return instanceOf(Object.getPrototypeOf(instancePrototype), right)
}
console.log(instanceOf(1, Number)) // true
console.log(instanceOf("1", String)) // true
console.log(instanceOf({}, Object)) // true
console.log(instanceOf(Symbol("1"), Symbol)) // true
console.log(instanceOf(1n, BigInt)) // true
console.log(instanceOf(/[0-9]{2}/g, RegExp)) // true