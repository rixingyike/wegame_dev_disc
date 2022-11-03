// Go：第6章\6.3\示例74\main.go
package main

import "fmt"

func main() {
	// var m map[string]int
	var m = make(map[string]int)
	m["小程序"] = 2017
	m["小游戏"] = 2018

	v := m["小游戏"]
	fmt.Printf("The value：%d\n", v)

	v, ok := m["小程序"]
	fmt.Printf("The value：%d，ok = %v\n", v, ok)
}
