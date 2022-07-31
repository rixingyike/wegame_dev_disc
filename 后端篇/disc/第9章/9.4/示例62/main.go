// Go：第9章\9.4\示例62\main.go
package main

import "fmt"

// 斐波纳契函数
func fibonacci() func() int {
	a, b := 0, 1
	return func() (r int) {
		r = a
		a, b = b, a+b
		return
	}
}

func main() {
	f := fibonacci()
	for i := 0; i < 10; i++ {
		fmt.Printf("%d\t", f())
	}
}
