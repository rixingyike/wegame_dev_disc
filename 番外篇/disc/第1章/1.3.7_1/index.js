// JS：第1章\1.3.7-1\index.js
class Car {
  #color = "none"
  constructor(color) {
    this.#color = color
  }
  get color() {
    return this.#color
  }
  run() {
    console.log(`color = ${this.color}, running...`)
  }
}
let car1 = new Car("red")
car1.run() // 输出：color = red, running...