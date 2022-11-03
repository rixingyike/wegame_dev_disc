/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：第2章\2.10\示例50\index.js
/** 一个朴素的汽车类 */
class Car {
  constructor(name){
    this.#name = name 
  }
  get name(){
    return this.#name
  }
  #name
  do(action) { }
}
/** 汽车能力基类 */
class CarFeature {
  constructor(decoratedCar) {
    this.decoratedCar = decoratedCar
  }
  get name() {
    return this.decoratedCar.name
  }
  do(action) {
    return this[action]?.() ?? this.decoratedCar?.do(action)
  }
}
/** 行驶之能 */
class DriveEnabledFeature extends CarFeature {
  drive() {
    console.log(`${this.name}行驶中..`)
    return this
  }
}
/** 刹车之能 */
class BrakeEnabledFeature extends CarFeature {
  brake() {
    console.log(`${this.name}刹车中..`)
    return this
  }
}
/** 充电之能 */
class ChargeEnabledFeature extends CarFeature {
  charge() {
    console.log(`${this.name}充电中..`)
    return this
  }
}
/** 鸣笛之能 */
class WhistleEnabledFeature extends CarFeature {
  whistle() {
    console.log(`${this.name}鸣笛中..`)
    return this
  }
}
// 消费代码，创建一辆拥有全部能力的汽车
const car1 = new WhistleEnabledFeature(
  new ChargeEnabledFeature(
    new BrakeEnabledFeature(
      new DriveEnabledFeature(
        new Car("car1")
      )
    )
  )
)
car1.do("drive")
car1.do("brake")
car1.do("charge")
car1.do("whistle")
// 这辆汽车只能鸣笛和充电
const car2 = new WhistleEnabledFeature(
  new ChargeEnabledFeature(
    new Car("car2")
  )
)
car2.do("charge")
car2.do("whistle")