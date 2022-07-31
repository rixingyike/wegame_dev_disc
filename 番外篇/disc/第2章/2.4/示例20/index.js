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