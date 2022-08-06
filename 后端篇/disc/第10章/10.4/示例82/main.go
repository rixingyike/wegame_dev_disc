/**
 * 《微信小游戏开发：后端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「网络榨知机」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
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
