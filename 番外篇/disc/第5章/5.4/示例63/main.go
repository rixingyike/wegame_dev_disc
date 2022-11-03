// Go：第5章\5.4\示例63\main.go
package main

import "fmt"

func main() {
	var add = func() func(int) int {
		sum := 0
		return func(x int) int {
			sum += x
			return sum
		}
	}

	fn1, fn2 := add(), add()
	for i := 0; i < 5; i++ {
		fmt.Println(
			fn1(i),
			fn2(-i),
		)
	}
}
