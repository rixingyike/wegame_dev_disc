// JS：disc\第6章\6.2\6.2.2\new_operator.js
function newOperator() {
  const constructor = Array.prototype.shift.call(arguments)

  // 判断参数是否是一个函数
  if (typeof constructor !== "function") throw SyntaxError("第1个参数须是函数")

  // 创建一个空对象
  const newObject = Object.create(constructor.prototype)
  // 绑定this对象，执行构造函数
  const result = constructor.apply(newObject, arguments)
  // 看构造函数是否有返回并且是引用类型
  const flag = result && (typeof result === "object" || typeof result === "function")

  // 返回结果
  return flag ? result : newObject
}

// 构造函数
function PersonConstructorFunction(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.friends = ["小王", "小李"]
  this.say = function () {
    return `我的名字是${this.name}，我是${this.job}。`
  }
}
// let p = new PersonConstructorFunction("石桥码农", 18, "程序员")
let p = newOperator(PersonConstructorFunction, "石桥码农", 18, "程序员")
p.say() // 我的名字是石桥码农，我是程序员。