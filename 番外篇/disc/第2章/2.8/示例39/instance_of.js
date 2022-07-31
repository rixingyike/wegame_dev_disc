// JS：第2章\2.8\示例39\instance_of.js
function instanceOf(target, kind) {
  // basicTypes："number", "boolean", "string", "undefined", "object"
  switch (typeof target) {
    case "number": {
      return Object.prototype.toString.call(new kind) === "[object Number]"
      break
    }
    case "boolean": {
      return Object.prototype.toString.call(new kind) === "[object Boolean]"
      break
    }
    case "string": {
      return Object.prototype.toString.call(new kind) === "[object String]"
      break
    }
    case "undefined": {
      return Object.prototype.toString.call(kind) === "[object Undefined]"
      break
    }
    case "object":
    default: {
      // 有typeof为null的情况，toString结果为[object Null]
      if (!!!target && Object.prototype.toString.call(kind) === "[object Null]") return true
      const left = target.__proto__
        , right = kind.prototype
      if (left === null) {
        return false
      } else if (left === right) {
        return true
      } else {
        return instanceOf(left, kind)
      }
    }
  }
}

export default instanceOf