// JS：disc\第2章\2.2.2_练习8\instance_of.js
function instanceOf(left, right) {
  const instancePrototype = Object.getPrototypeOf(left)
  if(!instancePrototype) return false
  if (instancePrototype === right.prototype) return true 
  return instanceOf(Object.getPrototypeOf(instancePrototype), right)
}
console.log(instanceOf(1, Number)) // true
console.log(instanceOf("1", String)) // true
console.log(instanceOf({}, Object)) // true
console.log(instanceOf(Symbol("1"), Symbol)) // true
console.log(instanceOf(1n, BigInt)) // true
console.log(instanceOf(/[0-9]{2}/g, RegExp)) // true