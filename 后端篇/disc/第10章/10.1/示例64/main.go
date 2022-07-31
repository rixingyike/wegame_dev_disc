// Go：第10章\10.1\示例64\main.go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	var a [2]string
	a[0] = "小游戏"
	a[1] = "小程序"
	fmt.Println(a) // [小游戏 小程序]

	var b [3]string = [3]string{"小游戏", "小程序", "全栈开发"}
	fmt.Println(b) // [小游戏 小程序 全栈开发]

	var c [2]string

	fmt.Printf("a's type %v\n", reflect.TypeOf(a))
	fmt.Printf("b's type %v\n", reflect.TypeOf(b))
	fmt.Printf("c's type %v\n", reflect.TypeOf(c))
	fmt.Printf("a = b %v\n", reflect.TypeOf(a) == reflect.TypeOf(b))
	fmt.Printf("a = c %v\n", reflect.TypeOf(a) == reflect.TypeOf(c))
}
