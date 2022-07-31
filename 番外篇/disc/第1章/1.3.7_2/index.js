// JS 代码：第1章\1.3.7-2\index.js
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
class BlueCar extends Car {
  constructor() { 
    super("blue")
  }
}
class BlackCar extends Car {
  constructor() {
    super("black")
  }
}

let car1 = new Car()
car1 = new BlueCar()
car1.run() // 输出：color = blue, running...
car1 = new BlackCar()
car1.run() // 输出：color = black, running...