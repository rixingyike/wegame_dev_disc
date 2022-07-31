import "./clone.js"

// 测试代码
let obj1 = {
  name: "Beijing",
  date: new Date(),
  desc: null,
  reg: /^LY$/,
  arr: ["a", 1, true],
  fn: function (a, b) {
    this.n = this.n || 1
    console.log(++this.n + a + b, this.name)
  }
}

let obj2 = obj1.clone()
obj2.name = "Bj"
obj1.fn(1, 2) // 输出：5 'Beijing'
obj2.fn(1, 2) // 输出：5 'Bj'
obj2.fn(1, 2) // 输出：6 'Bj'
console.log(obj1.fn === obj2.fn) // 输出：false