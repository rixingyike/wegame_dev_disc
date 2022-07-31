// JS：第2章\2.5\示例23\index.js
/** 饮料制作流程 */
class DrinksMaking {
  washkettle() {
    console.log("洗水壶")
  }
  boilWater() {
    console.log("浇开水")
  }
  washTeaKettle() {
    console.log("洗茶壶")
    throw new Error("需在子类中得写")
  }
  washTeaCup() {
    console.log("洗茶杯")
    throw new Error("需在子类中得写")
  }
  prepareTea() {
    console.log("拿茶叶")
    throw new Error("需在子类中得写")
  }
  pourWater() {
    console.log("沏茶")
    throw new Error("需在子类中得写")
  }
  // 制作饮料的流程模板
  make() {
    this.washkettle()
    this.boilWater()
    this.washTeaKettle()
    this.washTeaCup()
    this.prepareTea()
    this.pourWater()
    console.log("ok~")
  }
}

/** 泡茶流程 */
class TeaMaking extends DrinksMaking {
  washTeaKettle() {
    console.log("洗茶壶")
  }
  washTeaCup() {
    console.log("洗茶杯")
  }
  prepareTea() {
    console.log("拿茶叶")
  }
  pourWater() {
    console.log("沏茶")
  }
}

/** 冲咖啡的流程 */
class CoffeeMaking extends DrinksMaking {
  washTeaKettle() {
    console.log("洗咖啡壶")
  }
  washTeaCup() {
    console.log("洗咖啡杯")
  }
  prepareTea() {
    console.log("拿咖啡粉")
  }
  pourWater() {
    console.log("沏咖啡")
  }
}

const tea = new TeaMaking()
tea.make() // 冲茶

const coffee = new CoffeeMaking()
coffee.make() // 冲咖啡