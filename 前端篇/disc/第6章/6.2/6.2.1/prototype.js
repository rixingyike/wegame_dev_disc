// JS：disc\第6章\6.2\6.2.1\prototype.js
// 构造函数
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.friends = ["小王", "小李"]
}
// 原型
Person.prototype = {
  constructor: Person,
  say: function () {
    return `我的名字是${this.name}，我是一名${this.job}。`
  }
}
// 实例化
let person1 = new Person("LY", 18, "程序员")
let person2 = new Person("MN", 20, "篆刻爱好者")
person1.friends.push("花木兰")
console.log(person1.friends) // Output：[ '小王', '小李', '花木兰' ]
console.log(person2.friends) // Output：[ '小王', '小李' ]
console.log(person1.friends === person2.friends) // Output：false
console.log(person1.say === person2.say) // Output：true
console.log(person1.say()) // Output：我的名字是LY，我是一名程序员。
console.log(person2.say()) // Output：我的名字是MN，我是一名篆刻爱好者。