// Go：第5章\5.1\示例30\main.go
package main

import "fmt"

func main() {
	// 主函数也是函数，这些是函数内的局部变量
	var a, b, c int = 1, 2, 3

	for _, a := range [3]int{3, 8, 1} {
		// 这些是区块内的局部变量
		var b = a + 1
		var c = b * 2
		fmt.Printf("a = %d，b = %d，c = %d\n", a, b, c)
	}

	fmt.Printf("a = %d，b = %d，c = %d\n", a, b, c)
}
