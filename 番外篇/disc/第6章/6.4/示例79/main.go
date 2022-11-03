/**
 * 《微信小游戏开发：后端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// Go：第6章\6.4\示例79\main.go
package main

import "fmt"

type Technology struct {
	Name string
	age  int
}

func (t Technology) Print() {
	fmt.Printf("Name：%s，age：%d\n", t.Name, t.age)
}

func (t *Technology) ChangeName(name string) {
	t.Name = name
}

func (t Technology) ChangeAge(age int) {
	t.age = age
	t.Print() // Name：全栈开发，age：10
}

func main() {
	var t = &Technology{"小游戏", 3}
	t.Print()
	t.ChangeName("全栈开发")
	t.ChangeAge(10)
	t.Print()

	var t1 = Technology{"小程序", 4}
	t1.Print()
	t1.ChangeName("全栈开发")
	t.ChangeAge(10)
	t1.Print()
}
