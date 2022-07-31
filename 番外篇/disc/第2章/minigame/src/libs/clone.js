// JS：第2章\minigame\src\libs\clone.js
// 通过扩展原型，实现对象的深拷贝
if (!Object.prototype.clone) {
  Array.prototype.clone = function () {
    let sourceArr = this.valueOf()
    let newArr = []
    for (let j = 0; j < sourceArr.length; j++) {
      newArr.push(sourceArr[j].clone())
    }
    return newArr
  }

  Boolean.prototype.clone = function () {
    return this.valueOf()
  }
  Number.prototype.clone = function () {
    return this.valueOf()
  }
  String.prototype.clone = function () {
    return this.valueOf()
  }

  Date.prototype.clone = function () {
    return new Date(this.valueOf())
  }
  RegExp.prototype.clone = function () {
    let pattern = this.valueOf()
    let flags = ""
    flags += pattern.global ? "g" : ""
    flags += pattern.ignoreCase ? "i" : ""
    flags += pattern.multiline ? "m" : ""
    return new RegExp(pattern.source, flags)
  }
  Function.prototype.clone = function () {
    let that = this
    let temp = function () {
      return that.apply(this, arguments)
    }
    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        temp[key] = this[key]
      }
    }
    return temp
  }
  Object.prototype.clone = function () {
    let Constructor = this.constructor
    let obj = new Constructor()

    for (let attr in this) {
      if (this.hasOwnProperty(attr)) {
        if (this[attr] === null) {
          obj[attr] = null
        } else if (!!this[attr].clone()) {
          obj[attr] = this[attr].clone()
        } else {
          obj[attr] = this[attr]
        }
      }
    }
    return obj
  }
}