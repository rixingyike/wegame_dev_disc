/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：第2章\2.3\示例11\index.js
const car = {
  drive: function () {
    console.log(`${this.name}开始行驶`);
  }
}

const OtherCar = function () { }
OtherCar.prototype = car

const car2 = Object.assign(new OtherCar(), { name: '桑塔纳' })
car2.drive()

const car3 = {}
car3.__proto__ = car2
car3.drive()