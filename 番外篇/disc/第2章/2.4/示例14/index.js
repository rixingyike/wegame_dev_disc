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