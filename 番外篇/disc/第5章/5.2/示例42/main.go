// Go：第5章\5.2\示例42\main.go
package main

import "fmt"

func main() {
	sum := 0
	for i := 0; i < 11; i++ {
		sum += i
	}
	fmt.Println(sum) // 55
}
