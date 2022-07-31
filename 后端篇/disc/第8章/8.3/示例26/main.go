// Go：第8章\8.3\示例26\main.go
package main

import (
	"fmt"
)

func main() {
	var a = `小游戏`
	// a[0] = 'H'
	fmt.Printf("a[0]：%c（%T）\n", a[0], a[0]) // a[0]：å（uint8）
	var c = []rune(a)
	fmt.Printf("c：%T\n", c) // c：[]int32
	c[0] = 'A'
	fmt.Printf("%s\n", string(c)) // A游戏
}
