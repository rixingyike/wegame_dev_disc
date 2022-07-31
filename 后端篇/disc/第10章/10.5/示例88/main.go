// Go：第10章\10.5\示例89\main.go
package main

import (
	"fmt"
)

func main() {
	var a = [3]int{1, 3, 5}
	for i := 0; i < len(a); i++ {
		fmt.Printf("a[%d] = %d\n", i, a[i])
	}
}
