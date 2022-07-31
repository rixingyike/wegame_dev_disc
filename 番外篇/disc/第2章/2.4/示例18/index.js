// JS：第2章\2.4\示例18\index.js
function print(iterator) {
  let item = iterator.next()
  do {
    console.log(item.done, item.value);
    item = iterator.next()
  } while (!item.done)
}
// 迭代字符串
const str = "小游戏0~1"
print(str[Symbol.iterator]())