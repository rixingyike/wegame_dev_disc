// JS：第1章\1.6.2\index13_1.js
let name = "ly",
  obj = {
    name,
    say() {
      return `Hi ${this.name}`
    }
  }
console.log(obj.name) // 输出： ly
console.log(obj.say()) // 输出： Hi ly