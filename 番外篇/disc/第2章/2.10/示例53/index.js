/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「网络榨知机」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：第2章\2.10\示例53\index.js
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
    , person = new PersonModal(name, clothes.gender, clothes.height, clothes.clothesName)
  person.takePhoto()
}