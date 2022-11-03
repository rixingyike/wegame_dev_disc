// Go：第5章\5.1\示例29\main.go
package main

import (
	"fmt"

	"./models"
)

var (
	i int = 100 // 包内私有变量
)

func main() {
	fmt.Printf("add：%d\n", add(1, 2)) // add：107
	// println(models.tech1) // 在包外部，不可访问models包内私有变量
	fmt.Printf("print Name：%s in %s\n", models.Tech2.Name, "main") // Output：print Name：technology.Tech2 in main
	// fmt.Printf("print age%s in %s\n", models.Tech2.age, "main") // 不可访问
	// models.Tech2.print() // 在外部，不可调用Technology的私有方法print
	// fmt.Printf("print %d in %s\n", c, "main") // 不能访问add函数内的私有变量
}

func add(a, b int) int {
	// 函数内可以访问实参及包内成员
	var c = a + b + i
	var arr = [3]int{1, 3}
	for _, i := range arr {
		c += i
	}
	return c
}
