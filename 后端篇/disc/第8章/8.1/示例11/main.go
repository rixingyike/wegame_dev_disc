// Go：第8章\8.1\示例11\main.go
package main

import (
	"fmt"
	"reflect"
)

// 声明全局变量
var a int = 20

func main() {
	// 在函数中声明局部变量
	var a int = 10
	var b int = 20
	var c = 0 // 声明变量，没有指定类型
	fmt.Printf("c's type：%s\n", reflect.TypeOf(c))
	fmt.Printf("main函数中 a = %d\n", a)
	c = sum(a, b)
	fmt.Printf("main函数中 c = %d\n", c)
}

/* 自定义函数，两数相加
 * @param {int} a 相加数1
 * @param {int} b 相加数2
 */
func sum(a, b int) int {
	fmt.Printf("sum函数中 a = %d\n", a)
	fmt.Printf("sum函数中 b = %d\n", b)
	return a + b
}
