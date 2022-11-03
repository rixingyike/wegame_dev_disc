// Go：第5章\5.4\示例61\main.go
package main

import "fmt"

// 阶乘
func factorial(n uint64) uint64 {
	if n > 0 {
		return n * factorial(n-1)
	}
	return 1
}

func main() {
	var a, b, c int = 3, 5, 8
	fmt.Printf("%d! = %d\n", a, factorial(uint64(a)))
	fmt.Printf("%d! = %d\n", b, factorial(uint64(b)))
	fmt.Printf("%d! = %d\n", c, factorial(uint64(c)))
}
