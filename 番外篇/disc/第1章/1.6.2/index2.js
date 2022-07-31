// JS：第1章\1.6.2\index2.js
let obj = {
  name: "ly",
  say: function () {
    return `Hi ${this.name}`
  }
}
console.log(obj.name) // 输出： ly
console.log(obj.say()) // 输出： Hi ly