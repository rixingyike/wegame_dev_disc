// Go：第10章\10.2\示例71\main.go
package main

import "fmt"

func main() {
	var s = [...]int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	fmt.Println("s[:] =", s[:])     // [0 1 2 3 4 5 6 7 8 9]
	fmt.Println("s[1:4] =", s[1:4]) // [1 2 3]
	fmt.Println("s[:3] =", s[:3])   // [0 1 2]
	fmt.Println("s[4:] =", s[4:])   // [4 5 6 7 8 9]
}
