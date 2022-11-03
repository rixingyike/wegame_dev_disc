// Go：第6章\6.2\示例70\main.go
package main

import "fmt"

func main() {
	var a []int
	fmt.Printf("a：%v，len=%d，cap=%d\n", a, len(a), cap(a))
}
