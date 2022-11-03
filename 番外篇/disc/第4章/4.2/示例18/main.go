// Go：第4章\4.2\示例18\main.go
package main

import "fmt"

func main() {
	var a uint = 10 // 二进制为1010
	var b uint = 20 // 二进制为10100
	var c uint = 0

	c = a & b
	fmt.Printf("按位与：a & b = %d（%b）\n", c, c)

	c = a | b
	fmt.Printf("按位或：a | b = %d（%b）\n", c, c)

	c = a ^ b
	fmt.Printf("按位异或：a ^ b = %d（%b）\n", c, c)

	c = a << 2
	fmt.Printf("左移运算：a << 2 = %d（%b）\n", c, c)

	c = a >> 2
	fmt.Printf("右移运算：a >> 2 = %d（%b）\n", c, c)
}
