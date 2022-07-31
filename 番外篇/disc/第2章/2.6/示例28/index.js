// JS：第2章\2.6\示例28\index.js
/** 折扣基类 */
class Discounter {
  goods
  nextDiscounter
  setGoods(goods) {
    this.goods = goods
    return this
  }
  setPrice(price) {
    this.goods.price = price
    return this
  }
  setNextDiscounterr(discounter) {
    this.nextDiscounter = discounter
    this.nextDiscounter.setGoods(this.goods)
    return this
  }
  getNextDiscounter() {
    return this.nextDiscounter
  }
  getPrice() {
    let price = this.calculate()
    if (this.nextDiscounter) {
      let price2 = this.nextDiscounter.getPrice()
      if (price > price2) price = price2
    }
    return price
  }
  calculate() {
    throw new Error("需要在子类中重写")
  }
}
/** 依据节假日给折扣，88折 */
class HolidayDiscounter extends Discounter {
  calculate() {
    const now = new Date()
    , today = `${now.getMonth() + 1}-${now.getDate()}`
    let price = this.goods.price
    if (["5-1", "10-1", "1-1", "11-4"].includes(today)) {
      price *= .88
    }
    return price
  }
}
/** 依据商品(手机)给折扣 */
class GoodsDiscounter extends Discounter {
  calculate() {
    let price = this.goods.price
    if (this.goods.title.includes("手机")) {
      price *= .98
    }
    return price
  }
}
/** 满减折扣，满5000享93折，满2000享95折 */
class MoneyOffDiscounter extends Discounter {
  calculate() {
    let price = this.goods.price
    if (price > 5000) {
      price *= .93
    } else if (price > 2000) {
      price *= .95
    }
    return price
  }
}
/** 人为因为原因直接给折扣 */
class ManmadeDiscounter extends Discounter {
  constructor(discountMoney) {
    super()
    this.discountMoney = discountMoney
  }
  calculate() {
    let price = this.goods.price
    if (this.discountMoney) {
      price -= this.discountMoney
    }
    return price
  }
}
// 消费代码
const goods = {
  title: "三防智能手机",
  price: 6888
}
const discounter = new HolidayDiscounter().setGoods(goods)
discounter.setNextDiscounterr(new GoodsDiscounter())
  .setNextDiscounterr(new MoneyOffDiscounter())
  .setNextDiscounterr(new ManmadeDiscounter(500))
  .setNextDiscounterr(new HolidayDiscounter())
goods.price = 7000
console.log(`原价：${goods.price}`, `折扣价：${discounter.getPrice()}`);
goods.price = 3000
console.log(`原价：${goods.price}`, `折扣价：${discounter.getPrice()}`);