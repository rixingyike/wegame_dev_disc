// Go：第9章\9.1\示例35\main.go
package main

import "fmt"

const (
	LENGTH int = 10
	WIDTH  int = 5
)

func main() {
	const a, b, c int = 1, 2, 3
	const area = LENGTH * WIDTH
	fmt.Printf("area：%d\n", area)
	println(a, b, c)
}
