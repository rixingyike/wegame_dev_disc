// Go：第10章\10.5\示例89\main.go
package main

import (
	"fmt"
)

func main() {
	var a = [3]int{1, 3, 5}
	var ptrA [3]*int
	fmt.Printf("%T：%v\n", a, a)

	for i := 0; i < len(a); i++ {
		ptrA[i] = &a[i]
	}

	for i := 0; i < len(ptrA); i++ {
		fmt.Printf("ptrA[%d] = %v\n", i, *ptrA[i])
	}
}
