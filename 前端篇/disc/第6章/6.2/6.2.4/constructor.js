// JS：disc\第6章\6.2\6.2.4\constructor.js
// 构造函数
function PersonConstructorFunction(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.friends = ["小王", "小李"]
  this.say = function () {
    return `我的名字是${this.name}，我是${this.job}。`
  }
}
let p = new PersonConstructorFunction("石桥码农", 18, "程序员")
console.log(p.say()) // Output：我的名字是石桥码农，我是程序员。

console.log(p.constructor === PersonConstructorFunction.prototype.constructor) // Output：true
console.log(PersonConstructorFunction.prototype.constructor === PersonConstructorFunction) // Output：true
console.log(Object.getPrototypeOf(p) === PersonConstructorFunction.prototype) // Output：true
console.log(p instanceof PersonConstructorFunction) // Output：true