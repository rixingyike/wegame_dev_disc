/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「网络榨知机」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：第2章\2.4\示例16\index.js
function print(iterator) {
  let item = iterator.next()
  do {
    console.log(item.done, item.value)
    item = iterator.next()
  } while (!item.done)
}
// 迭代Map
const map = new Map()
map.set("focus", "digitization")
map.set("location", "Beijing")
print(map[Symbol.iterator]())

// 迭代WeakMap
const wm = new WeakMap()
const o1 = {},
  o2 = function () { },
  o3 = []
wm.set(o1, 1)
wm.set(o2, "小游戏")
wm.set(o3, "全栈开发")
// print(wm[Symbol.iterator]()) // 不可遍历