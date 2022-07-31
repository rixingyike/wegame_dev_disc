// JS：第2章\2.10\示例49\index.js
class Car {
  name = "car"
  drive() {
    console.log(`${this.name}驾驶中..`)
  }
}
class BrakeEnabledCar extends Car {
  brake() {
    console.log(`${this.name}刹车中..`)
  }
}
class ChargeEnabledCar extends BrakeEnabledCar {
  charge() {
    console.log(`${this.name}充电中..`)
  }
}
const car = new ChargeEnabledCar()
car.drive()
car.brake()
car.charge()