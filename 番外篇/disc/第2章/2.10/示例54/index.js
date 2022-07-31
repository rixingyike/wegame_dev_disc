// JS：第2章\2.10\示例54\index.js
/** 模特对象类型 */
class PersonModal {
  constructor(name, gender, height, clothesName) {
    this.name = name
    this.gender = gender
    this.clothesName = clothesName
    this.height = height
  }
  takePhoto() {
    console.log(`模特：${this.name}\n性别：${this.gender}\n身高：${this.height}\n衣服：${this.clothesName}`)
  }
}
/** 享元模式对象类型 */
class Flyweight {
  static cache = {}
  static create(name, clothes) {
    const key = Buffer.from(encodeURI(`${clothes.gender}${clothes.height}${clothes.clothesName}`)).toString("base64")
      , p = this.cache[key] || (this.cache[key] = new PersonModal(name, clothes.gender, clothes.height, clothes.clothesName))
    p.name = name
    return p
  }
}
// 试衣数据
const clothesDataArray = [{ height: 160, gender: "男", clothesName: "服装1号" }]
for (let j = 0; j < 100; j++) {
  clothesDataArray.push({
    height: 160 + Math.round(Math.random() * 5),
    gender: Math.random() > .5 ? "男" : "女",
    clothesName: `服装${j % 2}号`
  })
}
// 开始模拟试衣
for (let i = 0; i < clothesDataArray.length; i++) {
  const clothes = clothesDataArray[i]
    , name = Math.random() > .5 ? `张${i}` : `李${i}`
    , person = Flyweight.create(name, clothes)
  person.takePhoto()
}
// 查看缓存成就
const keys = Object.keys(Flyweight.cache)
console.log("创建的对象数量", keys.length)