// Go：第8章\8.3\示例25\main.go
package main

import (
	"fmt"
)

func main() {
	var s1 = "Hello\n World" // 会换行
	var s2 = `Hello\n World` // 不会换行
	fmt.Println(s1)
	fmt.Println(s2)
}
