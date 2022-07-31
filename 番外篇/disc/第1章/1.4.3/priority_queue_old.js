// JS：第1章\1.4.3\priority_queue.js 
import Queue from "./queue.js"
/**
 * 数据结构：优先队列
 */
class PriorityQueue extends Queue { // extends 是继承，es6 新语法
  /** 
   * 推入元素
   * @param  {} element 准备推入的元素
   * @param  {} priority priority 值越大，优先级越高，默认值 0
   */
  push(element, priority = 0) {
    // newOne 是一个对象, 在 es6 中如果属性名和变量名一致，属性名可以省略
    const newOne = { element, priority }
    if (this.isEmpty) {
      this.#items.push(newOne)
    } else {
      // 这里的箭头函数，作为参数，连 return 关键字都省略了，
      // findIndex 是 Array 的内建方法，返回满足测试条件的第一个元素的索引
      const preIndex = this.#items.findIndex(item => item.priority < newOne.priority)
      if (preIndex > -1) {
        this.#items.splice(preIndex, 0, newOne)
      } else {
        this.#items.push(newOne)
      }
    }
  }
}
export default PriorityQueue