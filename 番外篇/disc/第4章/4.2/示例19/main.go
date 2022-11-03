// Go：第4章\4.2\示例19\main.go
package main

import "fmt"

func main() {
	a := 10 // 声明并赋值
	var c int

	c = a
	fmt.Printf("c = a，c = %d\n", c)

	c += a
	fmt.Printf("c += a，c = %d\n", c)

	c -= a
	fmt.Printf("c -= a，c = %d\n", c)

	c *= a
	fmt.Printf("c *= a，c = %d\n", c)

	c /= a
	fmt.Printf("c /= a，c = %d\n", c)

	c <<= 2
	fmt.Printf("c <<= 2，c = %d\n", c)

	c >>= 2
	fmt.Printf("c >>= 2，c = %d\n", c)

	c &= 2
	fmt.Printf("c &= 2，c = %d\n", c)

	c ^= 2
	fmt.Printf("c ^= 2，c = %d\n", c)

	c |= 2
	fmt.Printf("c |= 2，c = %d\n", c)
}
