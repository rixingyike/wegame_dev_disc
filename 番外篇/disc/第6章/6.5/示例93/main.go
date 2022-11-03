/**
 * 《微信小游戏开发：后端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// Go：第6章\6.5\示例93\main.go
package main

import (
	"fmt"
)

// DivideError结构体
type DivideError struct {
	Dividee int // 被除数
	Divider int // 除数
}

// 让DivideError实现error接口
func (d *DivideError) Error() string {
	return fmt.Sprintf(`除数不能为零，当前被除数为%d，除数为%d`, d.Dividee, d.Divider)
}

// Divide函数定义int类型的除法运算
func Divide(a int, b int) (int, error) {
	if b == 0 {
		return 0, &DivideError{a, b}
	}
	return a / b, nil
}

func main() {
	// 正常情况
	if result, err := Divide(100, 10); err == nil {
		fmt.Println("100 / 10 = ", result)
	} else {
		fmt.Println(err.Error())
	}

	// 除数为零的错误情况
	if result, err := Divide(100, 0); err == nil {
		fmt.Println("100 / 0 = ", result)
	} else {
		fmt.Println(err.Error())
	}
}
