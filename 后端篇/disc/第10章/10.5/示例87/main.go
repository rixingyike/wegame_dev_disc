// Go：第10章\10.5\示例87\main.go
package main

import (
	"fmt"
)

func main() {
	var ptr *int
	fmt.Printf("指针变量ptr指向的地址为 : %v\n", ptr)
	fmt.Printf("指针变量ptr的内存地址值为 : %x\n", &ptr)

	var a = 10
	ptr = &a
	fmt.Printf("指针变量ptr指向的地址为 : %v\n", ptr)
	fmt.Printf("指针变量ptr的内存地址值为 : %x\n", &ptr)
}
