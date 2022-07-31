// JS：第1章\1.6.2\index13_2.js
function say() {
  return `Hi ${this.name}`
}
let name = "ly",
  obj = {
    name,
    say,
  }
console.log(obj.name) // 输出： ly
console.log(obj.say()) // 输出： Hi ly
// console.log(say()) // TypeError: Cannot read property 'name' of undefined