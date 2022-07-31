// Go：第10章\10.2\示例72\main.go
package main

import "fmt"

func main() {
	var s []int // 声明后即可操作

	// 向切片添加一个元素
	s = append(s, 1)
	echo("s", s) // len=1 cap=1 s=[1]

	// 添加多个元素
	s = append(s, 2, 3, 4)
	echo("s", s) // len=4 cap=4 s=[1 2 3 4]

	// 创建切片 s1
	s1 := make([]int, len(s), cap(s))

	// 从s拷贝元素到 s1
	copy(s1, s)
	echo("s1", s1) // len=4 cap=4 s1=[1 2 3 4]

	// 创建切片 s2
	s2 := s1[1:] // 注意长度少1
	copy(s2, s)
	echo("s2", s2) // len=3 cap=3 s2=[1 2 3]
}

func echo(name string, x []int) {
	fmt.Printf("len=%d cap=%d %s=%v\n", len(x), cap(x), name, x)
}
