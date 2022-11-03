/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：第2章\2.4\示例20\index.js
function print(iterator) {
  let item = iterator.next()
  do {
    console.log(item.done, item.value)
    item = iterator.next()
  } while (!item.done)
}
// 改造原型，增加标准迭代器属性
Object.prototype[Symbol.iterator] = function* () {
  const keys = Object.keys(this).sort()
  for (let key of keys) {
    yield [key, this[key]]
  }
}

// 迭代Object
const obj = {
  focus: "digitization",
  location: "Beijing"
}
print(obj[Symbol.iterator]())

// 使用for of遍历
for (const item of obj) {
  console.log(item)
}