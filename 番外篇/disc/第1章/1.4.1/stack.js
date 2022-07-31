// JS代码：第1章\1.4.1\stack.js
/** 数据结构：栈 */
class Stack {
  constructor() {}
  /** 末位元素 */
  get tail() {
    // TODO：这里代码有问题，如果 length 为 0 怎么办？
    return this.#items[this.#items.length - 1]
  }
  /** 是否为空栈 */
  get isEmpty() {
    return !this.#items.length //这是将数值类型转化为布尔类型
  }
  /** 元素个数 */
  get size() {
    return this.#items.length
  }
  #items = []
  /**
   * 入栈
   * @param  {} element 待推入的元素
   */
  push(element) {
    this.#items.push(element) // push 是 Array 内建方法，从尾部推入一个元素
  }
  /** 出栈 */
  pop() {
    return this.#items.pop() // pop 是 Array 内建方法，从尾部抽出一个元素
  }
  /** 清空 */
  clear() {
    this.#items.length = 0 // 清空数组
  }
  /** 打印 */
  print() {
    console.log(this.#items)
  }
}

export default Stack