// JS：disc\第2章\2.2.5_练习11\to_primitive.js
let tech = tech2 = {
  name: "小游戏",
  age: 2021,
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case "number":
        return this.age
      case "string":
        return this.name
      default:
        return `{ name: ${this.name} }`
    }
  }
}

// 消费代码
tech.name = "全栈开发"
const a = tech + 1
console.log(a) // { name: 全栈开发 }1
console.log(`tech：${tech}`) // tech：全栈开发
++tech // 正则运算
const b = tech + 1
console.log(b) // 2023
console.log(tech) // 2022
console.log(`tech：${tech}`) // tech：2022
console.log(`tech2：${tech2}`) // tech2：全栈开发