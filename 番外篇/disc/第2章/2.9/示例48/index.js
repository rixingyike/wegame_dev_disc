// JS：第2章\2.9\示例48\index.js
/** 一个信息打印类 */
class Info {
  constructor(obj) {
    this.obj = obj
  }
  toString() {
    let s = ""
    let keys = Object.keys(this.obj)
    for (let key of keys) {
      s += `${key}\t\t${this.obj[key]}\n`
    }
    return s
  }
}
// 将arr转换为Info需要的格式
function adaptArrToObject(arr) {
  return {
    name: arr[0],
    age: arr[1],
    address: arr[2],
    date: arr[3]
  }
}
// 消费代码
const arr = ["小游戏", 3, "北京", "2020年11月22日"]
const info = new Info(adaptArrToObject(arr))
console.log(`${info}`)