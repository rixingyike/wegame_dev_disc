/**
 * 《微信小游戏开发：后端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// Go：第6章\6.2\示例69\main.go
package main

import "fmt"

func main() {
	b := make([]int, 3, 5)
	fmt.Printf("%p：%v，len=%d，cap=%d\n", &b, b, len(b), cap(b))

	b = append(b, 1)
	fmt.Printf("%p：%v，len=%d，cap=%d\n", &b, b, len(b), cap(b))

	b = append(b, 1, 1)
	fmt.Printf("%p：%v，len=%d，cap=%d\n", &b, b, len(b), cap(b))
}
