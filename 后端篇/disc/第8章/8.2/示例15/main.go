// Go：第8章\8.2\示例15\main.go
package main

import "fmt"

func main() {
	var a int = 10
	var b int = 20
	var c int

	c = a + b
	fmt.Printf("加：a + b = %d\n", c)

	c = a - b
	fmt.Printf("减：a - b = %d\n", c)

	c = a * b
	fmt.Printf("乘：a * b = %d\n", c)

	c = a / b
	fmt.Printf("除：a / b = %d\n", c)

	c = a % b
	fmt.Printf("取余：a %% b = %d\n", c)

	a++
	fmt.Printf("递增：a++ = %d\n", a)

	a--
	fmt.Printf("递减：a-- = %d\n", a)
}
