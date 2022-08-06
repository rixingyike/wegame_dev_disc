/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「网络榨知机」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
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