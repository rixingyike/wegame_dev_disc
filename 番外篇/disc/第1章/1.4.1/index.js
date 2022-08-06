/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「网络榨知机」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
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