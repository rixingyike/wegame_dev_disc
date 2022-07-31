// Go：第8章\8.1\示例7\main.go
package main

import (
	"fmt"
	// "time"
)

func main() {
	var ch1 chan int = make(chan int)
	var ch2 = make(chan string, 1) // 带1个缓冲位置

	// 符号<-在通信变量右边，向通道写入
	go func() {
		ch1 <- 1
		ch1 <- 2
	}()
	go func() {
		ch2 <- "小游戏"
		ch2 <- "小程序"
	}()

	// 符号<-在通信变量左边，从通道读取
	v1 := <-ch1
	fmt.Println(v1) // 输出：1
	v1 = <-ch1
	fmt.Println(v1) // 输出：1
	v2 := <-ch2
	fmt.Println(v2) // 输出：小游戏
	v2 = <-ch2
	fmt.Println(v2) // 输出：小程序

	// time.Sleep(1 * time.Second)
}
