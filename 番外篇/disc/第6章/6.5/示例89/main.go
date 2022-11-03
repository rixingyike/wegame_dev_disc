/**
 * 《微信小游戏开发：后端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// Go：第6章\6.5\示例89\main.go
package main

import (
	"fmt"
)

func main() {
	var a = [3]int{1, 3, 5}
	var ptrA [3]*int
	fmt.Printf("%T：%v\n", a, a)

	for i := 0; i < len(a); i++ {
		ptrA[i] = &a[i]
	}

	for i := 0; i < len(ptrA); i++ {
		fmt.Printf("ptrA[%d] = %v\n", i, *ptrA[i])
	}
}
