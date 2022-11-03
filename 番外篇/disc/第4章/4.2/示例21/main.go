// Go：第4章\4.2\示例21\main.go
package main

import "fmt"

func main() {
	var a int = 10
	var b int = 20
	var c int = 30
	var d int = 40
	var e int

	e = (a + b) * c / d
	fmt.Printf("(a + b) * c / d = %d\n", e)

	e = ((a + b) * c) / d
	fmt.Printf("((a + b) * c) / d = %d\n", e)

	e = (a + b) * (c / d)
	fmt.Printf("(a + b) * (c / d) = %d\n", e)

	e = a + (b*c)/d
	fmt.Printf("a + (b * c) / d = %d\n", e)
}
