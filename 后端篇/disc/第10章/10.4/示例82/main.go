// Go：第10章\10.4\示例82\main.go
package main

import (
	"fmt"
	"math"
)

// 接口
type IAbs interface {
	Abs() float64
}

type MyFloat float64 // float64别名
type Vertex struct { // 结构体类型
	X int
	Y int
}

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(float64(v.X*v.X + v.Y*v.Y))
}

func main() {
	var a IAbs
	a = MyFloat(-11.0)
	fmt.Printf("MyFloat.abs：%.2f\n", a.Abs())

	// a = &Vertex{3.0, 4.0}
	a = Vertex{3.0, 4.0}
	fmt.Printf("Vertex.abs：%.2f\n", a.Abs())
}
