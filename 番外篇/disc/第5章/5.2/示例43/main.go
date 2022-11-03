// Go：第5章\5.2\示例43\main.go
package main

import "fmt"

func main() {
	sum := 0
	i := 0
	// for ;i < 11; {
	for i < 11 {
		sum += i
		i++
	}
	fmt.Println(sum) // 55
}
