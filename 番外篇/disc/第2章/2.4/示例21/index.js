/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「网络榨知机」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：第2章\2.4\示例21\index.js
/** 集合对象 */
class ArrayCollection {
  constructor(source) {
    this.#arr = source
  }

  get size() {
    return this.#arr.length
  }
  #arr

  createIterator() {
    // return new ArrayCollectionIterator(this.#arr)
    return new ArrayCollectionIterator(this.#arr.slice())
  }
  append(item) {
    this.#arr.push(item)
  }
  remove(item) {
    const index = this.#arr.indexOf(item)
    if (index > -1) this.#arr.splice(index, 1)
  }
}

/** 集合对象的迭代器对象 */
class ArrayCollectionIterator {
  constructor(arr) {
    this.#arr = arr
  }
  #arr
  #currentIndex = -1
  // 往下移一位，并返回标准迭代值
  next() {
    this.#currentIndex++
    return {
      value: this.#arr[this.#currentIndex],
      done: this.#currentIndex >= this.#arr.length
    }
  }
  // 将迭代索引重设到首位
  reset() {
    this.#currentIndex = -1
  }
}

// 消费代码
const ac = new ArrayCollection(["Angular", 2021, "Vue", "React", "元宇宙网文"])
  , iterator = ac.createIterator()
let item = iterator.next()
do {
  console.log(item.done, item.value)
  item = iterator.next()
} while (!item.done)