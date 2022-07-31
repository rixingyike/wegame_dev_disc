// Go：第8章\8.2\示例17\main.go
package main

import "fmt"

func main() {
	var a bool = true
	var b bool = false

	if a && b {
		fmt.Printf("a && b：条件为 true\n")
	}
	if a || b {
		fmt.Printf("a || b：条件为 true\n")
	}

	// 修改 a 和 b 的值
	a = false
	b = true

	if a && b {
		fmt.Printf("a && b：条件为 true\n")
	} else {
		fmt.Printf("a && b：条件为 false\n")
	}
	if !(a && b) {
		fmt.Printf("!(a && b)：条件为 true\n")
	}

	// var c = 0
	// fmt.Printf("!c = %t\n", !c) // 零值不能自动转换为布尔值假
}
