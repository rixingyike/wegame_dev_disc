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