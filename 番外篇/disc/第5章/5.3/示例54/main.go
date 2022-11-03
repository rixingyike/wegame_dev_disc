// Go：第5章\5.3\示例54\main.go
package main

import "fmt"

func swap(x, y string) (string, string) {
	return y, x
}
func main() {
	var a, b = "大", "小"
	fmt.Println(a, b)
	fmt.Printf("%v %v\n", &a, &b)

	a, b = swap(a, b)
	fmt.Println(a, b)
	fmt.Printf("%v %v\n", &a, &b)

	a, b = b, a
	fmt.Println(a, b)
	fmt.Printf("%v %v\n", &a, &b)
}
