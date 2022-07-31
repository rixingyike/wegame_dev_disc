// JS：第1章\1.4.4\linked_list.js
/** 链表节点类型 */
class Node {
  element
  next = null // JS 没有指针，这个变量在其它语言里要用指针类型
  constructor(element) {
    this.element = element
  }
  toString() {
    return this.element
  }
}
/** 链表 */
class LinkedList {
  #head = null
  #length = 0
  constructor() { }
  get isEmpty() {
    return !this.#length
  }
  get size() {
    return this.#length
  }
  /**
   * 追加结点
   * @param  {} element 元素
   */
  append(element) {
    const node = new Node(element)
    let current = null
    if (this.#head === null) { // 这是一个全等判断，但用在这里没必要
      this.#head = node
    } else {
      current = this.#head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.#length++
  }
  /**
   * 任意位置插入结点
   * @param  {} position 位置
   * @param  {} element 元素
   */
  insertAt(position, element) {
    if (position >= 0 && position <= this.#length) {
      const node = new Node(element)
      let current = this.#head
      let previous = null
      let index = 0
      if (position === 0) {
        this.#head = node
      } else {
        while (index++ < position) { // index++是后递增，判断后再递增
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node
      }
      this.#length++
      return true
    }
    return false
  }
  /**
   * 移除指定位置结点
   * @param  {} position 位置
   */
  removeAt(position) {
    // 检查越界值
    if (position > -1 && position < length) {
      let current = this.#head
      let previous = null
      let index = 0
      if (position === 0) { // 这个全等判断有必要
        this.#head = current.next
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        previous.next = current.next
      }
      this.#length--
      return current.element
    }
    return null
  }
  /**
   * 查找元素位置
   * @param  {} element 元素
   */
  findIndex(element) {
    let current = this.#head
    let index = -1
    while (current) {
      if (element === current.element) {
        return index + 1
      }
      index++ // 单独成句，是前递增，还是后递增无所谓
      current = current.next
    }
    return -1
  }
  /**
   * 删除指定结点
   * @param  {} element 元素
   */
  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }
  /** 转为字符串打印 */
  print() {
    let current = this.#head
    let s = ''
    while (current) {
      s += `${current} `// 这里使用了模板字符串，注意有一个空格
      current = current.next
    }
    console.log(s)
  }
}
export default LinkedList