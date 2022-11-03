// Go：第6章\6.3\示例77\main.go
package main

import "fmt"

func main() {
	var s = []int{1, 2, 4, 8, 16, 32, 64}
	for i, v := range s {
		fmt.Printf("2^%d = %d\n", i, v)
	}
}
