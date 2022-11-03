/**
 * 《微信小游戏开发：后端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// Go：第6章\6.2\示例72\main.go
package main

import "fmt"

func main() {
	var s []int // 声明后即可操作

	// 向切片添加一个元素
	s = append(s, 1)
	echo("s", s) // len=1 cap=1 s=[1]

	// 添加多个元素
	s = append(s, 2, 3, 4)
	echo("s", s) // len=4 cap=4 s=[1 2 3 4]

	// 创建切片 s1
	s1 := make([]int, len(s), cap(s))

	// 从s拷贝元素到 s1
	copy(s1, s)
	echo("s1", s1) // len=4 cap=4 s1=[1 2 3 4]

	// 创建切片 s2
	s2 := s1[1:] // 注意长度少1
	copy(s2, s)
	echo("s2", s2) // len=3 cap=3 s2=[1 2 3]
}

func echo(name string, x []int) {
	fmt.Printf("len=%d cap=%d %s=%v\n", len(x), cap(x), name, x)
}
