// Go：第10章\10.5\示例93\main.go
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
