// JS：第1章\1.6.2\index3.js
let print = s => console.log(s), // 定义一个打印方法
  s = "text" // 定义一个变量 s，并赋值为字符串
print(s) // 输出：text
s = true // 赋值 s 为布尔值
print(s) // 输出：true
s = 17 // 赋值 s 为整型数值
print(s) // 输出：17
s = 6.3 // 赋值 s 为浮点型数值
print(s) // 输出：6.3
s = [1, 2, 3] // 赋值为数组
print(s)// 输出：[ 1,2,3 ]
s = new Object() // 赋值 s 为一个对象
s.name = "ly"
print(s.name) // 输出：ly