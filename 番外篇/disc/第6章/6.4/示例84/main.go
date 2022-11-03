/**
 * 《微信小游戏开发：后端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// Go：第6章\6.4\示例84\main.go
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

func absFloat64(i interface{}) (float64, error) {
	if f, ok := i.(MyFloat); ok {
		if f < 0 {
			return float64(-f), nil
		}
		return float64(f), nil
	} else {
		return 0, fmt.Errorf("参数异常")
	}
}

func absVertex(i interface{}) (float64, error) {
	if v, ok := i.(*Vertex); ok {
		return math.Sqrt(float64(v.X*v.X + v.Y*v.Y)), nil
	} else {
		return 0, fmt.Errorf("参数异常")
	}
}

func main() {
	var a interface{}
	a = MyFloat(-11.0)
	if r, err := absFloat64(a); err == nil {
		fmt.Printf("MyFloat abs：%.2f\n", r)
	} else {
		fmt.Printf("MyFloat error：%s\n", err.Error())
	}

	a = &Vertex{3.0, 4.0}
	// a = Vertex{3.0, 4.0}
	if r, err := absVertex(a); err == nil {
		fmt.Printf("Vertex abs：%.2f\n", r)
	} else {
		fmt.Printf("Vertex error：%s\n", err.Error())
	}

	a = 100
	if r, err := absVertex(a); err == nil {
		fmt.Printf("100 abs：%.2f\n", r)
	} else {
		fmt.Printf("100 error：%s\n", err.Error())
	}
}
