// JS：disc\第7章\7.3\7.3.3\extends.js
// 父类
class SuperType {
  constructor() { }
  property = true
  getSuperValue() {
    return this.property
  }
}

// 子类
class SubType extends SuperType {
  constructor() {
    super()
  }
  subProperty = false
  getSubValue() {
    return this.subProperty
  }
  getSuperValue() {
    return this.property
  }
  callSuperMethod() {
    return this.getSuperValue()
  }
}

// 实例化
const instance = new SubType()
console.log("getSubValue", instance.getSubValue()) // Output：false
console.log("getSuperValue", instance.getSuperValue()) // Output：true
console.log("callSuperMethod", instance.callSuperMethod()) // Output：true