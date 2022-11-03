// Go：第4章\4.1\示例3\main.go
package main

import "fmt"

func main() {
	var a = 1
	var p *int // int型的指针，默认值为nil
	p = &a     // 取int变量a的地址
	add(p)
	fmt.Println(p)
	fmt.Println(*p)
}

func add(n *int) {
	*n = *n + 2
}
