// Go：第8章\8.1\示例6\main.go
package main

import "fmt"

func main() {
	// 初始化多个值
	var m = map[int]string{2: "小游戏", 3: "小程序"}
	m[3] = "小程序开发"
	fmt.Println(m) // 输出：map[2:小游戏 3:小程序开发]

	delete(m, 3)   // 删除
	fmt.Println(m) // 输出：map[2:小游戏]

	m[5] = "全栈开发"
	fmt.Println(m) // 输出：map[2:小游戏 5:全栈开发]
}
