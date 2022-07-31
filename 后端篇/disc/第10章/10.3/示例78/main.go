// Go：第10章\10.3\示例78\main.go
package main

import "fmt"

func main() {
	// 遍历数组
	var arr = [3]int{1, 2, 3}
	for i, v := range arr {
		fmt.Printf("%d：%d\n", i, v)
	}

	// 遍历字典
	var m = map[string]int{"小游戏": 2018, "小程序": 2017}
	for k, v := range m {
		fmt.Printf("%s：%d\n", k, v)
	}

	// 遍历通道
	var channel1 = make(chan int, 2)
	go func() {
		channel1 <- 1
		channel1 <- 2
		close(channel1)
	}()
	for i := range channel1 {
		fmt.Printf("%d\n", i)
	}

	// 遍历字符串
	for i, c := range "Go" {
		fmt.Printf("%d：%c\n", i, c)
	}
}
