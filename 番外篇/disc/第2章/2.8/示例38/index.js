// JS：第2章\2.8\示例38\index.js
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
const folder = new Folder("前端开发", [
  new Folder("JS", [
    new File("JS语法基础"),
    new File("JS实战练习")
  ]),
  new Folder("jQuery", [
    new File("jQuery接口学习"),
    new File("jQuery应用实战")
  ]),
  new File("微信小程序"),
  new File("微信小游戏")
])
folder.getChildByName("JS").add(new File("JS从0到1"))
folder.print()