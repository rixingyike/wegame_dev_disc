// Go：第5章\5.1\示例39\main.go
package main

import "fmt"

func main() {
	const (
		a = iota // 0
		b        // 1
		c        // 2
		d = "A"  // "A"，变成字符串
		e        // "A"
		f = 10   // 10，临时设置数字
		g        // 10
		h = iota // 7，恢复计数
		i        // 8
	)
	fmt.Println(a, b, c, d, e, f, g, h, i)
}
