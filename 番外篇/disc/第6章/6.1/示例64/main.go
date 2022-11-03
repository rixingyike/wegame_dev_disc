/**
 * 《微信小游戏开发：后端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// Go：第6章\6.1\示例64\main.go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	var a [2]string
	a[0] = "小游戏"
	a[1] = "小程序"
	fmt.Println(a) // [小游戏 小程序]

	var b [3]string = [3]string{"小游戏", "小程序", "全栈开发"}
	fmt.Println(b) // [小游戏 小程序 全栈开发]

	var c [2]string

	fmt.Printf("a's type %v\n", reflect.TypeOf(a))
	fmt.Printf("b's type %v\n", reflect.TypeOf(b))
	fmt.Printf("c's type %v\n", reflect.TypeOf(c))
	fmt.Printf("a = b %v\n", reflect.TypeOf(a) == reflect.TypeOf(b))
	fmt.Printf("a = c %v\n", reflect.TypeOf(a) == reflect.TypeOf(c))
}
