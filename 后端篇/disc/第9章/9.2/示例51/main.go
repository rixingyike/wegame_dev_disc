// Go：第9章\9.2\示例51\main.go
package main

import (
	"fmt"
)

func main() {
	var c1, c2, c3 chan int = make(chan int, 0), make(chan int, 0), make(chan int, 0)
	var a, b int

	go func() {
		c3 <- 3   // 向c3写入
		<-c2      // 尝试从c2读取
		c1 <- 1   // 写c1写入
		close(c3) // 关闭c3
	}()

	for i := 0; i < 6; i++ {
		select {
		case a = <-c1:
			fmt.Printf("从c1读取%d\n", a)
		case c2 <- b:
			fmt.Printf("向c2写入%d\n", b)
		case k, ok := <-c3:
			if ok {
				fmt.Printf("c3成功接收%d\n", k)
			} else {
				fmt.Printf("c3已关闭\n")
			}
		}
	}
}
