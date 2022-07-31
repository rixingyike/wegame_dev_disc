// JS：disc\第1章\1.1\technology.js
class Technology {
  static #instance
  static getInstance() { /*...*/ }

  constructor(name, age) { this.#name = name }

  get name() {
    return this.#name
  }
  set name(val) {
    this.#name = val
  }
  age
  #name

  print() { console.log(`name = ${this.#name}`) }
}
let t = new Technology("小游戏", 3)
t.print() // name = 小游戏
function Foo(name) {
  this.name = name
}
let f = new Foo("foo")
t.name = "全栈开发"
t.print() // name = 全栈开发