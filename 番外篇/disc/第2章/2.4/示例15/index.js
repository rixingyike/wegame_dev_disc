// JS：第2章\2.4\示例15\index.js
function print(iterator) {
  let item = iterator.next()
  do {
    console.log(item.done, item.value)
    item = iterator.next()
  } while (!item.done)
}
// 数组迭代
const arr = ["Angular", 2021, "Vue", "React", "元宇宙网文"]
print(arr[Symbol.iterator]())

// 类型化数组迭代
let a = new Int8Array(new ArrayBuffer(3))
for (let i = 0; i < a.byteLength; i++) {
  a[i] = i * 2 
}
print(a[Symbol.iterator]())