/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：第1章\1.5.1\index.js
class Car {
  #color = "red"
  constructor() { }
  get color() {
    return this.#color
  }
  run() {
    this.#start()
    console.log("running")
  }
  #start() {
    console.log("starting")
  }
}
let c = new Car()
console.log(c.color) // 输出：red
// console.log(c.#color) // SyntaxError: Private name #color is not defined.
c.run() // 输出：running
// c.start() // c.start is not a function