// Go：第5章\5.1\示例32\main.go
package main

import "fmt"

type Technology struct {
	Name string
}

func main() {
	var t = Technology{Name: "小游戏"}
	fmt.Printf("%v\n", t) // {小游戏}
	var p = &t
	print(p)              // {全栈开发}
	fmt.Printf("%v\n", t) // {全栈开发}
}

func print(t *Technology) {
	t.Name = "全栈开发"
	fmt.Printf("%v\n", *t)
}
