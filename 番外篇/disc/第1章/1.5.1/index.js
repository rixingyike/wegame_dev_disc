// JS：第1章\1.5.1\index.js
class Car {
  #color = "red"
  constructor() { }
  get color() {
    return this.#color
  }
  run() {
    this.#start()
    console.log("running")
  }
  #start() {
    console.log("starting")
  }
}
let c = new Car()
console.log(c.color) // 输出：red
// console.log(c.#color) // SyntaxError: Private name #color is not defined.
c.run() // 输出：running
// c.start() // c.start is not a function