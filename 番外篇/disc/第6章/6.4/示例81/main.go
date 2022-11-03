// Go：第6章\6.4\示例81\main.go
package main

import "fmt"

type Technology struct {
	Name string
	age  int
}

func (t *Technology) Print() {
	fmt.Printf("Name：%s，age：%d\n", t.Name, t.age)
}

func dealWithTechnology(t *Technology) {
	t.Name = "全栈开发"
	t.age = 10
	fmt.Printf("Name: %s\n", t.Name)
	fmt.Printf("age: %d\n", t.age)
}

func main() {
	var t = Technology{"小游戏", 3}
	dealWithTechnology(&t)
	t.Print()
}
