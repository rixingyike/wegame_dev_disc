// Go：第4章\4.1\示例9\main.go
package main

import (
	"fmt"
)

// 定义结构体Technology
type Technology struct {
	Name string
	Age  int
}

func (t *Technology) Print() {
	fmt.Printf("%v", t)
}

// 定义一个IPrintable接口
type IPrintable interface {
	Print()
}

func print(target IPrintable) {
	target.Print()
}

func main() {
	// 声明一个*Technology类型的指针变量t
	var t = &Technology{Name: "小游戏", Age: 3}
	print(t)
}
