// Go：第9章\9.3\示例58\main.go
package main

import "fmt"

func getNext() func() int {
	i := 0
	return func() int {
		i++
		return i
	}
}

func main() {
	nextNum := getNext()
	fmt.Println(nextNum())
	fmt.Println(nextNum())
	fmt.Println(nextNum())

	nextNum1 := getNext()
	fmt.Println(nextNum1())
	fmt.Println(nextNum1())
	fmt.Println(nextNum1())
}
