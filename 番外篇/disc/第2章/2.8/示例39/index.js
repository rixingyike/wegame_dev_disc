// JS：第2章\2.8\示例39\index.js
/** 文件对象 */
class File {
  constructor(name) {
    this.name = name
  }
  add() {
    throw new Error("文件是叶节点")
  }
  remove(){ }
  print(tab = "") {
    console.log(`${tab}${this.name}`)
  }
}
/** 文件夹对象 */
class Folder extends File {
  constructor(name, children = []) {
    super(name)
    this.files = children
  }
  add(...files) {
    this.files.push(...files)
  }
  remove(file){
    let index = this.files.indexOf(file)
    if (index > -1) this.files.splite(index, 1)
  }
  getChildByName(name){
    return this.files.find(item => item.name == name)
  }
  print(tab = "") {
    console.log(`${tab}${this.name}`)
    if (this.files.length > 0) tab += "\t"
    for (let j = 0; j < this.files.length; j++) {
      let file = this.files[j]
      file.print(tab)
    }
  }
}
// 测试代码
import instanceOf from "./instance_of.js"
// JSON对象
const obj = {
  "前端开发": [
    { "JS": ["JS语法基础", "JS实战练习"] },
    { "jQuery": ["jQuery接口学习", "jQuery应用实战"] },
    "微信小程序",
    "微信小游戏"
  ]
}
// 解析JSON对象
function parse(target, name = "") {
  if (instanceOf(target, String)) {
    return new File(target)
  } else if (instanceOf(target, Array)) {
    const r = new Folder(name)
    for (let j = 0; j < target.length; j++) {
      r.add(parse(target[j]))
    }
    return r 
  } else {
    for (let key in target) {
      const f = parse(target[key], key)
      return f // 只取对象中第一个成员
    }
  }
}
const folder = parse(obj)
folder.getChildByName("JS").add(new File("JS从0到1"))
folder.print()