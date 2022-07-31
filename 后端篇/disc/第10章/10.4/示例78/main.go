// Go：第10章\10.4\示例78\main.go
package main

import "fmt"

type Technology struct {
	Name string
	age  int
}

func main() {
	var t Technology
	fmt.Printf("%T：%v\n", t, t)

	var t2 = Technology{"小游戏", 3}
	fmt.Printf("%T：%v\n", t2, t2)

	v1 := Technology{"小游戏", 3} // 类型为 Technology
	fmt.Printf("%T：%v\n", v1, v1)
	v2 := Technology{Name: "小游戏"} // 指定Name，age被省略
	fmt.Printf("%T：%v\n", v2, v2)
	v3 := Technology{} // 成员均被省略，默认拥有零值
	fmt.Printf("%T：%v\n", v3, v3)
	v4 := Technology{age: 3} // 指定age，Name被省略
	fmt.Printf("%T：%v\n", v4, v4)
	p := &Technology{} // p的类型为 *Technology
	fmt.Printf("%T：%v\n", p, p)

	var t1 = new(Technology)
	fmt.Printf("%T：%v\n", t1, t1)
}
