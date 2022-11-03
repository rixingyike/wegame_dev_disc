// Go：第4章\4.1\示例10\main.go
package main

import (
	"errors"
	"fmt"
)

func add(a, b int) (int, error) {
	if a >= b {
		return a + b, nil
	}
	return 0, errors.New("异常：a不能小于b")
}

func main() {
	var a, b = 1, 3
	if c, err := add(a, b); err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println(c)
	}
}
