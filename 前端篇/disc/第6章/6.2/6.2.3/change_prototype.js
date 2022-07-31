// JS：disc\第6章\6.2\6.2.3\change_prototype.js
class Being {
  run(i) {
    console.log(`${i} running..`)
  }
}
// const Being = function () {
//   this.run = (i) => {
//     console.log(`${i} running..`)
//   }
// }
class Person {
  title = "微信小游戏"
}
// const Person = function () {
//   this.title = "微信小游戏"
// }

const person1 = {
  print: function () {
    console.log(`title：${this?.title}`)
  }
}
person1.print() // Output：title：undefined
person1.__proto__ = new Person()
// Object.setPrototypeOf(person1, new Person())
person1.print() // Output：title：微信小游戏

person1.run?.(1)
person1.__proto__.__proto__ = new Being()
person1.run?.(2) // Output：2 running..
new Person().run?.(3)

Person.prototype.__proto__ = new Being()
person1.run?.(4) // Output：4 running..
new Person().run?.(5) // Output：5 running..