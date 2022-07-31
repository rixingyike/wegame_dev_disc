// JS代码：第1章/1.4.2/queue.js
/**
 * 数据结构：队列
 */
class Queue {
  #items = []
  constructor(items) {
    this.#items = items || [] // 判断赋值，但用在这里没有意义
  }
  get items() {
    return this.#items
  }
  /** 头部元素 */
  get head() {
    // return this.#items[0] // 这个返回有没有问题？
    return this.#items[this.#items.length-1]
  }
  /** 队列大小 */
  get size() {
    return this.#items.length // length 是 Array 属性，返回元素个数
  }
  /** 是否为空 */
  get isEmpty() {
    return !this.#items.length
  }
  /**
   * 入列
   * @param  {} element
   */
  push(element) {
    this.#items.push(element) // push 是 Array 的内建方法，从尾部推入一个元素
  }
  /** 出列 */
  shift() {
    // return this.#items.shift() // shift 是从 Array 头部抽出一个元素
    return this.#items.pop()
  }
  /** 清空 */
  clear() {
    // this.#items = []
    this.#items.length = 0 // 亦能达到同样的清空效果
  }
  /** 打印 */
  print() {
    console.log(this.#items)
  }
}

export default Queue