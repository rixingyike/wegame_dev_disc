/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：第1章\1.6.2\index3.js
let print = s => console.log(s), // 定义一个打印方法
  s = "text" // 定义一个变量 s，并赋值为字符串
print(s) // 输出：text
s = true // 赋值 s 为布尔值
print(s) // 输出：true
s = 17 // 赋值 s 为整型数值
print(s) // 输出：17
s = 6.3 // 赋值 s 为浮点型数值
print(s) // 输出：6.3
s = [1, 2, 3] // 赋值为数组
print(s)// 输出：[ 1,2,3 ]
s = new Object() // 赋值 s 为一个对象
s.name = "ly"
print(s.name) // 输出：ly