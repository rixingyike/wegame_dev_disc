// Go：第5章\5.2\示例50\main.go
package main

import (
	"fmt"
)

func main() {
	determine("小游戏")
	determine(2021)
	determine(11.25)
	determine('A')
	determine("abc"[0])
	determine([2]int{1, 2})
}

func determine(x interface{}) {
	switch x.(type) {
	case string:
		fmt.Printf("%v is string\n", x)
	case int:
		fmt.Printf("%v is int\n", x)
	case float64:
		fmt.Printf("%v is float64\n", x)
	case rune:
		fmt.Printf("%v is rune\n", x)
	case byte:
		fmt.Printf("%v is byte\n", x)
	default:
		fmt.Printf("%v is unknown type\n", x)
	}
}
