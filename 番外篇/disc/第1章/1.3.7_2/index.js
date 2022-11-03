/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS 代码：第1章\1.3.7-2\index.js
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
class BlueCar extends Car {
  constructor() { 
    super("blue")
  }
}
class BlackCar extends Car {
  constructor() {
    super("black")
  }
}

let car1 = new Car()
car1 = new BlueCar()
car1.run() // 输出：color = blue, running...
car1 = new BlackCar()
car1.run() // 输出：color = black, running...