// Go：第5章\5.3\示例60\main.go
package main

import "fmt"

func main() {
	var i = 0
	defer func() {
		fmt.Printf("defer func：i = %d\n", i)
	}()
	i++
	i++
	fmt.Printf("i = %d\n", i)
}
