// Go：第10章\10.5\示例85\main.go
package main

import (
	"fmt"
)

func main() {
	var i = 42
	var p = &i
	fmt.Println(*p) // 42
	*p = 21
	fmt.Println(*p) // 21
	// p = 21
	// p = &21
}
