// Go：第10章\10.4\示例79\main.go
package main

import "fmt"

type Technology struct {
	Name string
	age  int
}

func (t Technology) Print() {
	fmt.Printf("Name：%s，age：%d\n", t.Name, t.age)
}

func (t *Technology) ChangeName(name string) {
	t.Name = name
}

func (t Technology) ChangeAge(age int) {
	t.age = age
	t.Print() // Name：全栈开发，age：10
}

func main() {
	var t = &Technology{"小游戏", 3}
	t.Print()
	t.ChangeName("全栈开发")
	t.ChangeAge(10)
	t.Print()

	var t1 = Technology{"小程序", 4}
	t1.Print()
	t1.ChangeName("全栈开发")
	t.ChangeAge(10)
	t1.Print()
}
