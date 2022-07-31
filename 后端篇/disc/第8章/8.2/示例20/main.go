// Go：第8章\8.2\示例20\main.go
package main

import "fmt"

func main() {
	var a int = 10
	var b int32 = 20
	var c float32
	var p *int

	// 运算符实例
	fmt.Printf("a = %T\n", a)
	fmt.Printf("b = %T\n", b)
	fmt.Printf("c = %T\n", c)

	// 取变量a的地址
	p = &a

	fmt.Printf("a = %d\n", a)
	fmt.Printf("*p = %d\n", *p) // 间接取出a值
	fmt.Printf("p = %d\n", p)   // p是一个内存地址
}
