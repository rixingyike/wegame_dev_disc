// Go：第4章\4.1\示例5\main.go
package main

import "fmt"

func main() {
	var s []string                    // 这是一个切片，声明时不需要指定长度
	fmt.Printf("s：%v\n", s)           // 是一个空数组
	var arr = [2]string{"小游戏", "小程序"} // 这是数组
	s = arr[0:2]
	s = append(s, "全栈开发") // 向切片追加新元素
	fmt.Printf("s：%v\n", s)
}
