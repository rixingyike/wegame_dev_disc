// Go：第9章\9.2\示例45\main.go
package main

import "fmt"

func main() {
	sum := 0
	for i := 0; i < 11; i++ {
		if i%2 == 0 {
			continue
		}
		sum += i
	}
	fmt.Println(sum) // 55
}
