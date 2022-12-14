/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// 示例51：第2章\2.10\decorator\src\index.ts
@classDecorator
class Car {
  @propDecorator
  name = "car"

  @methodDecorator
  drive() {
    console.log(`${this.name}驾驶中..`) // 将被替换
  }
  brake() {
    console.log(`${this.name}刹车中..`)
  }
}
// 类装饰器，添加新方法charge
function classDecorator(constructor: Function) {
  // 在原型上添加新方法
  constructor.prototype.charge = function (this: Car) {
    console.log(`${this.name}充电中..`)
  }
}
// 属性装饰器
function propDecorator(target: any, prop: string) {
  console.log(`属性被访问：${prop}`) // prop等于name
}
// drive方法装饰器，添加额外代码
function methodDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  // 改变方法的实现
  descriptor.value = function (this: Car) {
    console.log(`${this.name}驾驶中..`)
    console.log(`${this.name}已启动自动驾驶`)
  }
}
// 消费代码
const car = new Car()
car.drive();
car.brake();
// 用TS类型转换，加可选链操作符，调用通过修饰器添加的charge方法
(car as any)?.charge()