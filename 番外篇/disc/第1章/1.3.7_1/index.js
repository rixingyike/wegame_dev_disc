/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「网络榨知机」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：第1章\1.3.7-1\index.js
class Car {
  #color = "none"
  constructor(color) {
    this.#color = color
  }
  get color() {
    return this.#color
  }
  run() {
    console.log(`color = ${this.color}, running...`)
  }
}
let car1 = new Car("red")
car1.run() // 输出：color = red, running...