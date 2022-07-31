// Go：第8章\8.3\示例23\main.go
package main

import "fmt"

func main() {
	var s = "全栈开发"
	fmt.Println(len(s))
	k := []rune(s)
	fmt.Printf("s：%T\n", k)

	for m, n := range k {
		fmt.Printf("%d：%c\n", m, n)
	}
}
