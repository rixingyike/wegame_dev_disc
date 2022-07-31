// JS代码：第1章/1.4.2/index.js
import Queue from "./queue.js";
const queue = new Queue()
console.log(queue.isEmpty) // 查看是否为空的属性，Output：true
console.log(queue.head) // 输出： undefined
queue.push('微信')
queue.push('小游戏')
console.log(queue.size) // 输出：2
console.log(queue.isEmpty) // 输出：false
queue.shift()
console.log(queue.size) // 输出：1