// JS：disc\第6章\6.2\6.2.5\instance_of.js
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
// 测试代码
console.log(instanceOf(0, Number)) // Output：true
console.log(instanceOf("0", String)) // Output：true
console.log(instanceOf(true, Boolean)) // Output：true
console.log(instanceOf(null, null)) // Output：true
console.log(instanceOf(undefined, undefined)) // Output：true
console.log(instanceOf(Symbol("s"), Symbol)) // Output：true
console.log(instanceOf({}, Object)) // Output：true
console.log(instanceOf(/.{2}/, RegExp)) // Output：true
class Class1 { }
class Class2 extends Class1 { }
class Class3 extends Class2 { }
console.log(instanceOf(new Class2, Class1)) // Output：true
console.log(instanceOf(new Class3, Class1)) // Output：true
console.log(instanceOf(new Class3, RegExp)) // Output：false