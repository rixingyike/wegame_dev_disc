// Go：第8章\8.1\示例8\main.go
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

func main() {
	var t = new(Technology) // 声明一个*Technology类型的指针变量t
	t.Name = "小游戏"          // 赋值
	t.Age = 3
	t.Print()
}
