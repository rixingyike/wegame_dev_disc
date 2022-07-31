// Go：第8章\8.1\示例4\main.go
package main

import "fmt"

func main() {
	var arr = [2]string{"小游戏", "小程序"}
	arr[0] = "小游戏开发"

	// 遍历数组
	for i := 0; i < len(arr); i++ {
		v := arr[i]
		fmt.Printf("%d：%s\n", i, v)
	}
}
