// JS代码：第1章\1.4.1\index.js
import Stack from "./stack.js"
const stack = new Stack() // 实例化栈对象
console.log(stack.isEmpty) // 输出：true
console.log(stack.tail) // 输出：undefined
// 添加元素
stack.push(5)
// 读取属性
console.log(stack.tail) // 输出：5
stack.push(11)// 再添加元素 11
console.log(stack.size) // 输出：2
console.log(stack.isEmpty) // 输出：false