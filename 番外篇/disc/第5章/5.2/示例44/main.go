// Go：第5章\5.2\示例44\main.go
package main

import "fmt"

func main() {
	sum := 0
	i := 0
	for {
		if !(i < 11) {
			break
		}
		sum += i
		i++
	}
	fmt.Println(sum) // 55
}
