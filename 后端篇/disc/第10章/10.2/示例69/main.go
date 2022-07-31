// Go：第10章\10.2\示例69\main.go
package main

import "fmt"

func main() {
	b := make([]int, 3, 5)
	fmt.Printf("%p：%v，len=%d，cap=%d\n", &b, b, len(b), cap(b))

	b = append(b, 1)
	fmt.Printf("%p：%v，len=%d，cap=%d\n", &b, b, len(b), cap(b))

	b = append(b, 1, 1)
	fmt.Printf("%p：%v，len=%d，cap=%d\n", &b, b, len(b), cap(b))
}
