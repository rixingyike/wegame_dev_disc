// JS：第2章\2.4\示例17\index.js
function print(iterator) {
  let item = iterator.next()
  do {
    console.log(item.done, item.value)
    item = iterator.next()
  } while (!item.done)
}
// 迭代Set
const set = new Set()
set.add(2020)
set.add(2021)
print(set[Symbol.iterator]())