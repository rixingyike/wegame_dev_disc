// Go：第5章\5.3\示例59\main.go
package main

import (
	"fmt"
)

const (
	Pi = 3.1415926
)

// 结构体
type Circle struct {
	radius float64
}

// 结构体上的方法
func (c Circle) getArea() float64 {
	return Pi * c.radius * c.radius
}

func main() {
	var c1 Circle
	c1.radius = 5.0
	fmt.Printf("半径：%.2f，圆面积 = %.2f\n", c1.radius, c1.getArea())
}
