/**
 * 《微信小游戏开发：后端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// Go：第6章\6.5\示例87\main.go
package main

import (
	"fmt"
)

func main() {
	var ptr *int
	fmt.Printf("指针变量ptr指向的地址为 : %v\n", ptr)
	fmt.Printf("指针变量ptr的内存地址值为 : %x\n", &ptr)

	var a = 10
	ptr = &a
	fmt.Printf("指针变量ptr指向的地址为 : %v\n", ptr)
	fmt.Printf("指针变量ptr的内存地址值为 : %x\n", &ptr)
}
