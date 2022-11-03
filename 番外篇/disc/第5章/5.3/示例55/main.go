// Go：第5章\5.3\示例55\main.go
package main

import "fmt"

func split(sum int) (x, y int) {
	x = sum * 4 / 10
	y = sum - x
	return
}

func main() {
	fmt.Println(split(48))
}
