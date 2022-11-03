// Go：第6章\6.2\示例68\main.go
package main

import "fmt"

func main() {
	var arr = []int{100, 2, 3, 21, 55}
	arr = append(arr, 10)
	fmt.Printf("%v\n", arr) // Output：[100 2 3 21 55 10]
	fmt.Printf("%T", arr)   // Output：[]int
}
