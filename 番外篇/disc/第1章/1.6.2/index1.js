// JS：第1章\1.6.2\index1.js
// 定义一个对象
let obj = new Object()
// 动态创建属性 name
obj.name = "ly"
// 动态创建方法 say
obj.say = function () {
  return `Hi ${this.name}`
}
console.log(obj.name) // 输出： ly
console.log(obj.say()) // 输出： Hi ly