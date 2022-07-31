// JS：disc\第7章\7.3\7.3.3\prototype.js
// 父类
function SuperType() {
  this.property = true
}
SuperType.prototype.getSuperValue = function () {
  return this.property
}

// 子类
function SubType() {
  this.subProperty = false
}
// 子类继承父类
SubType.prototype = new SuperType()

// 给子类添加新方法
SubType.prototype.getSubValue = function () {
  return this.subProperty
}
// 重写父类的方法
SubType.prototype.getSuperValue = function () {
  return this.property
}
SubType.prototype.callSuperMethod = function () {
  return this.getSuperValue()
}

// 实例化
const instance = new SubType()
console.log("getSubValue", instance.getSubValue()) // Output：false
console.log("getSuperValue", instance.getSuperValue()) // Output：true
console.log("callSuperMethod", instance.callSuperMethod()) // Output：true