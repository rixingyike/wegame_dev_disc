// Go：第5章\5.3\示例56\main.go
package main

import "fmt"

func swap(x, y *string) {
	*x, *y = *y, *x
}

func swap2(x, y interface{}) {
	x, y = y, x
}

func main() {
	var a string = "A"
	var b string = "B"
	fmt.Printf("交换前 a = %s（%d）\n", a, &a)
	fmt.Printf("交换前 b = %s（%d）\n", b, &b)

	swap(&a, &b)
	fmt.Printf("交换一 a = %s（%d）\n", a, &a)
	fmt.Printf("交换一 b = %s（%d）\n", b, &b)

	swap2(&a, &b)
	fmt.Printf("交换二 a = %s（%d）\n", a, &a)
	fmt.Printf("交换二 b = %s（%d）\n", b, &b)

	var c, d = 1, 2
	fmt.Printf("交换前 c = %d（%d）\n", c, &c)
	fmt.Printf("交换前 c = %d（%d）\n", d, &d)

	swap2(&c, &d)
	fmt.Printf("交换三 c = %d（%d）\n", c, &c)
	fmt.Printf("交换三 c = %d（%d）\n", d, &d)
}
