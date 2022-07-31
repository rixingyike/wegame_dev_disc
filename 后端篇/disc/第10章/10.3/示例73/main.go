// Go：第10章\10.3\示例73\main.go
package main

import "fmt"

func main() {
	// 以string作键
	var m1 = map[string]int{"小游戏": 2018, "小程序": 2017}
	fmt.Printf("%v：%T\n", m1, m1)

	// 以int整型作键
	var m2 = map[int]string{2018: "小游戏", 2017: "小程序"}
	fmt.Printf("%v：%T\n", m2, m2)

	// 以float64作键
	var m3 = make(map[float64]string)
	m3[2018.12] = "小游戏"
	m3[2017.1] = "小程序"
	fmt.Printf("%v：%T\n", m3, m3)
}
