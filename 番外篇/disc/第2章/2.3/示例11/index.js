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