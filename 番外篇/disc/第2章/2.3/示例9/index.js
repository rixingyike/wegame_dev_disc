/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：第2章\2.3\示例9\index.js
// 产品类：汽车
class Car {
  logo // 品牌标识
  no // 编号
  wheel // 轮子
  engine // 发动机
  color // 颜色

  toString() {
    return `这是${this.logo}，编号${this.no}，有${this.wheel}、${this.engine}和${this.color}`
  }
}

// 建造指挥者，建造者模式的核心体现
class BuilderDirector {
  #builder
  #parts = ["Engine", "Wheel", "Color", "Logo", "No"]

  buildParts(builder, parts = undefined) {
    parts = parts ?? this.#parts
    for (let part of parts) {
      const fn = builder[`build${part}`]
      if (fn) fn.call(builder)
    }
    this.#builder = builder
    return this
  }

  getResult() {
    return this.#builder.getCar()
  }
}

// 奥迪车建造者类
class AudiCarBuilder {
  constructor(car) {
    this.car = car
  }
  car
  buildLogo() {
    this.car.logo = "奥迪A6"
  }
  buildNo() {
    this.car.no = `AD${Math.round(Math.random() * 100)}`
  }
  buildWheel() {
    this.car.wheel = "四个车轮"
  }
  buildEngine() {
    this.car.engine = "2.0T四缸涡轮增压发动机"
  }
  buildColor() {
    this.car.color = "黑色喷漆"
  }
  getCar() {
    return this.car
  }
}

// 红旗轿车建造者类
class RedflagCarBuilder {
  constructor(car) {
    this.car = car
  }
  car
  buildLogo() {
    this.car.logo = "红旗H5"
  }
  buildNo() {
    this.car.no = `RH${Math.round(Math.random() * 100)}`
  }
  buildWheel() {
    this.car.wheel = "四个车轮"
  }
  buildEngine() {
    this.car.engine = "1.5T汽油发动机"
  }
  buildColor() {
    this.car.color = "红色喷漆"
  }
  getCar() {
    return this.car
  }
}

// 消费代码
const director = new BuilderDirector()
const audiCar = director.buildParts(new RedflagCarBuilder(new Car()))
  .getResult()
console.log(`汽车已建造好：${audiCar}`)

const redflagCar = director.buildParts(new AudiCarBuilder(new Car()))
  .getResult()
console.log(`汽车已建造好：${redflagCar}`)

const redflagCar2 = director.buildParts(new AudiCarBuilder(new Car()), ["Engine", "Wheel", "Logo"])
  .getResult()
console.log(`汽车已建造好：${redflagCar2}`)