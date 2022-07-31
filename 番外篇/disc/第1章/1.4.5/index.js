// JS：第1章\1.4.5\index.js
function bubbleSort(arr) {
  let temp
  const len = arr.length // 声明常量，存储数组长度，避免 for 循环中重复访问
  console.log(len);
  let n = 0
  for (let i = 1; i < len; i++) {
    // n++
    for (let j = 0; j < len - i; j++) {
      n++
      console.log(len,i,j,n);
      if (arr[j] > arr[j + 1]) { // 相邻元素两两对比
        temp = arr[j + 1]  // 交换元素
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    } // end for j
  } // end for i
  return arr
}
let arr = [3, 9, 76, 5, 47, 15, 23, 26, 33, 2, 46, 4, 89, 50, 7]
console.log(bubbleSort(arr)) // 输出： [ 2, 3, 4, 5, 7, 9, 15, 23, 26, 33, 46, 47, 50, 76, 89 ]

