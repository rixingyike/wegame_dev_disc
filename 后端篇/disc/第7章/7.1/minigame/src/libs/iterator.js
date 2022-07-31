// JS：src\libs\iterator.js
// 扩展Object类型的迭代器接口
if (!Object.prototype[Symbol.iterator]){
  Object.prototype[Symbol.iterator] = function* () {
    let keys = Object.keys(this).sort()
    for (let key of keys) {
      yield [key, this[key]]
    }
  }
}

/** 迭代器 */
class Iterator{
  /** 迭代器构造器
   * @param {*} source Object、Array、String、Set、Map和TypedArray
   */
  constructor(source){
    this.#internalIterator = source[Symbol.iterator]()
  }

  #internalIterator

  next(){
    return this.#internalIterator.next()
  }
}

export default Iterator