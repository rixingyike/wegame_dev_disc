// JS：disc\第6章\6.2\6.2.6\person.js
// 基类对象
class PersonBase {
  constructor(name, age, job){
    this.name = name
    this.age = age
    this.job  = job
    this.friends = ["小王", "小李"]
  }
}
// 类对象
class Person extends PersonBase {
  constructor(name, age, job){
    super(name, age, job)
    // this.say = function() {
    //   return `我的名字是${this.name}，我是一名${this.job}。`
    // }
  }
  say() {
    return `我的名字是${this.name}，我是一名${this.job}。`
  }
}
let p = new Person("LY", 18, "程序员")
console.log(p.say()) // Output：我的名字是LY，我是一名程序员。