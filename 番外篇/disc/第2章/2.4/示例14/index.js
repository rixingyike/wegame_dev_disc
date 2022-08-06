/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「网络榨知机」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：第2章\2.4\示例14\index.js
Array.prototype.enumerate = function* () {
  for (let [index, value] of this.entries()) {
    yield [index, value]
  }
}
const arr = ["Angular", 2021, "Vue", "React", "元宇宙网文"]
  , iterator = arr.enumerate()
let item = iterator.next()
do {
  console.log(`${item.value[0]}：${item.value[1]}`)
  if (item.value[1] === "React") break
  item = iterator.next()
} while (!item.done)