// JS：第2章\2.6\示例27\index.js
/** 折扣策略的基础对象 */
class DiscounterStrategy {
  calculate() {
    throw new Error("需要在子类中重写该方法")
  }
}
/** 依据节假日给折扣，88折 */
class HolidayDiscounterStrategy extends DiscounterStrategy {
  calculate(goods) {
    let price = goods.price
    let now = new Date()
    let today = `${now.getMonth() + 1}-${now.getDate()}`
    if (["5-1", "10-1", "1-1", "11-4"].includes(today)) {
      price *= .88
    }
    return price
  }
}
/** 依据商品内容(手机)给折扣 */
class GoodsDiscounterStrategy extends DiscounterStrategy {
  calculate(goods) {
    let price = goods.price
    if (goods.title.includes("手机")) {
      price *= .98
    }
    return price
  }
}
/** 满减折扣 */
class MoneyOffDiscounterStrategy extends DiscounterStrategy {
  calculate(goods) {
    let price = goods.price
    if (price > 5000) {
      price *= .93
    } else if (price > 2000) {
      price *= .95
    }
    return price
  }
}
/** 客服人为直接给折扣 */
class ManmadeDiscounterStrategy extends DiscounterStrategy {
  constructor(discountMoney) {
    super()
    this.discountMoney = discountMoney
  }
  calculate(goods) {
    let price = goods.price
    if (this.discountMoney) {
      price -= this.discountMoney
    }
    return price
  }
}
/** 折扣计算者 */
class DiscounterCalculator {
  constructor(goods, deaultStrategy) {
    this.goods = goods
    this.strategy = deaultStrategy
  }
  setStrategy(strategy) {
    this.strategy = strategy
  }
  calculate() {
    return this.strategy.calculate(this.goods)
  }
}
// 消费代码
const goods = {
  title: "三防智能手机",
  price: 6888
}
const calculator = new DiscounterCalculator(goods, new HolidayDiscounterStrategy())
console.log("节假日折扣价", calculator.calculate())

calculator.setStrategy(new GoodsDiscounterStrategy())
console.log("手机商品专属折扣价", calculator.calculate())

calculator.setStrategy(new MoneyOffDiscounterStrategy())
console.log("满减折扣价", calculator.calculate())

calculator.setStrategy(new ManmadeDiscounterStrategy())
console.log("人为折扣价", calculator.calculate())