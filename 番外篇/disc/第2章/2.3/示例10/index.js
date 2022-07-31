// JS：第2章\2.3\示例10\index.js
const car = {
  drive: function () {
    console.log(`${this.name}开始行驶`);
  }
}
const car2 = Object.create(car, {
  name: {
    value: "桑塔纳",
    enumerable: true
  }
})
car2.drive()