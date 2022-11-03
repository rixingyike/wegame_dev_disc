// Go：第4章\4.1\示例12\main.go
package main

import (
	"fmt"
)

func main() {
	var (
		isHappy bool
		age     int
		salary  float64
		name    string
		orderNo rune
		err     error
	)
	fmt.Printf(`isHappy：%t
		age：%d
		salary：%g
		name：%s
		orderNo：%d
		err：%v`, isHappy, age, salary, name, orderNo, err)
}
