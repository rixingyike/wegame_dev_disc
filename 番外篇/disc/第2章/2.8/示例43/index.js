// JS：第2章\2.8\示例43\index.js
/** 文件对象 */
class File {
  constructor(name) {
    this.name = name
  }
  add() {
    throw new Error("文件是叶节点")
  }
  remove() { }
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
  remove(file) {
    let index = this.files.indexOf(file)
    if (index > -1) this.files.splite(index, 1)
  }
  getChildByName(name) {
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
/** 文件及文件夹组合对象，自实现组合模式 */
class CompositeFile {
  static FILE = "file"
  static FOLDER = "folder"

  constructor(name, children = undefined) {
    if (!children) {
      this.#file = new File(name)
    } else {
      this.#file = new Folder(name, children)
      this.#state = CompositeFile.FOLDER
    }
  }

  get name() {
    return this.#file.name
  }
  /** 对象状态
   * @type {string} file or folder
   */
  #state = "file"
  #file

  /** 改变对象状态 */
  changeState(state) {
    if (this.#state !== state) {
      if (state === CompositeFile.FILE) {
        this.#file = new File(this.#file.name)
      } else {
        this.#file = new Folder(this.#file.name, [])
      }
    }
  }
  /** 添加子节点 */
  add(...files) {
    if (this.#state === CompositeFile.FILE) {
      this.changeState(CompositeFile.FOLDER)
    }
    this.#file.add(...files)
  }
  /** 移除节点 */
  remove(file) {
    if (this.#state === CompositeFile.FOLDER) {
      this.#file.remove(file)
    }
  }
  getChildByName(name) {
    if (this.#state === CompositeFile.FOLDER) {
      return this.#file.getChildByName(name)
    } else {
      return undefined
    }
  }
  print(tab = "") {
    this.#file.print(tab)
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
    return new CompositeFile(target)
  } else if (instanceOf(target, Array)) {
    const r = new CompositeFile(name, [])
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
folder.getChildByName("JS")?.add(new CompositeFile("JS从0到1"))
folder.print()
folder.getChildByName("微信小程序")?.add(
  new CompositeFile("原生组件")
  , new CompositeFile("平台接口"))
folder.print()