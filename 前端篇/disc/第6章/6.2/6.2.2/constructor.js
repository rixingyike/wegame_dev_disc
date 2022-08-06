/**
 * 《微信小游戏开发：前端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「网络榨知机」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/

// JS：disc\第6章\6.2\6.2.2\constructor.js
// 构造函数
function PersonConstructorFunction(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.friends = ["小王", "小李"]
  this.say = function () {
    return `我的名字是${this.name}，我是${this.job}。`
  }
}
let p = new PersonConstructorFunction("石桥码农", 18, "程序员")
console.log(p.say()) // Output：我的名字是石桥码农，我是程序员。