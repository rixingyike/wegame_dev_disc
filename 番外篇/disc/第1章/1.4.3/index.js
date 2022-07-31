// JS：第1章\1.4.3\index.js
import PriorityQueue from "./priority_queue.js"
const queue = new PriorityQueue()
console.log(queue.isEmpty) // 查看是否为空的属性，Output: true
queue.push('微信', 1)
queue.push('小游戏')
queue.push('小程序', 3)
console.log(queue.size) // 输出： 3
console.log(queue.isEmpty) // 输出： false
queue.print()
// 输出：
// [ { element: '小程序', priority: 3 },
//   { element: '微信', priority: 1 },
//   { element: '小游戏', priority: 0 } ]