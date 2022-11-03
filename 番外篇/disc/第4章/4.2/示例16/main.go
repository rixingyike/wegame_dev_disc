// Go：第4章\4.2\示例16\main.go
package main

import (
	"errors"
	"fmt"
)

func main() {
	var a int = 10
	var b int = 20

	if a == b {
		fmt.Printf("a == b：a 等于 b\n")
	} else {
		fmt.Printf("a == b：a 不等于 b\n")
	}

	if a < b {
		fmt.Printf("a < b：a 小于 b\n")
	} else {
		fmt.Printf("a < b：a 不小于 b\n")
	}

	if a > b {
		fmt.Printf("a > b：a 大于 b\n")
	} else {
		fmt.Printf("a > b：a 不大于 b\n")
	}

	if a <= b {
		fmt.Printf("a <= b：a 小于等于 b\n")
	}

	if b >= a {
		fmt.Printf("b >= a：b 大于等于 a\n")
	}

	var err1 = errors.New("error")
	var err2 = err1
	fmt.Printf("引用类型相等：(err1 == err2) = %t\n", err1 == err2)

	var p1, p2 = &a, &a
	fmt.Printf("指针类型相等：(p1 == p2) = %t\n", p1 == p2)

	// fmt.Printf("\"1\" == 1 = %t", "1" == 1) // 类型不同，不能直接比较
}
