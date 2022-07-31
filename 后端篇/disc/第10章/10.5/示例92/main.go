// Go：第10章\10.5\示例92\main.go
package main

import (
	"fmt"
)

func main() {
	var a int = 1
	var b int = 2
	fmt.Printf("交换前 a 的值 : %d\n", a)
	fmt.Printf("交换前 b 的值 : %d\n", b)

	// 交换两个指针变量的值
	swap(&a, &b)
	fmt.Printf("交换后 a 的值 : %d\n", a)
	fmt.Printf("交换后 b 的值 : %d\n", b)
}

func swap(x *int, y *int) {
	*x, *y = *y, *x
}
