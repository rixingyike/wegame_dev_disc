// Go：第10章\10.4\示例83\main.go
package main

import (
	"fmt"
	"math"
)

type MyFloat float64 // float64别名
type Vertex struct { // 结构体类型
	X int
	Y int
}

func absFloat64(i interface{}) float64 {
	f := i.(MyFloat)
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

func absVertex(i interface{}) float64 {
	v := i.(*Vertex)
	return math.Sqrt(float64(v.X*v.X + v.Y*v.Y))
}

func main() {
	var a interface{}
	a = MyFloat(-11.0)
	fmt.Printf("MyFloat abs：%.2f\n", absFloat64(a))

	a = &Vertex{3.0, 4.0}
	// a = Vertex{3.0, 4.0}
	fmt.Printf("Vertex abs：%.2f\n", absVertex(a))
}
