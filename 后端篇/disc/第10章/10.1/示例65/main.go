// Go：第10章\10.1\示例65\main.go
package main

import "fmt"

func main() {
	var n [10]int
	fmt.Printf("%v\n", n)

	for i := 0; i < 5; i++ {
		n[i] = i + 100
	}

	for j := 0; j < 5; j++ {
		fmt.Printf("n[%d] = %d\n", j, n[j])
	}
}
