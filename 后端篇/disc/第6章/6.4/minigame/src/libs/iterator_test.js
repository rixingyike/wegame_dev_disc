// JS：src\libs\iterator_test.js
import Iterator from "./iterator.js"

// 测试用的打印函数
function print(source) {
  console.log(`\nprint ${typeof source}: ${source.toString()}`)
  const iterator = new Iterator(source)
  let item = iterator.next()
  while (!item.done) {
    console.log(`value:${item.value}，done：${item.done}`)
    item = iterator.next()
  }
}

const arr = [123, "LY", true, new Date().getTime()]
print(arr)

const str = "I see u"
print(str)

const m = new Map([["name", "LY"], [123, "NumberKeyed"], [{}, "ObjectKeyed"], [() => { }, "Arrow Funcs Keyed"]])
print(m)

const s = new Set([1, 2, 2, 3, 3, 5])
print(s)

const obj = {
  name: "LY",
  location: "Beijing",
  age: 18
}
print(obj)

const obj2 = {}
print(obj2)