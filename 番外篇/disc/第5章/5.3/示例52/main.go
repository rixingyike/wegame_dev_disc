// Go：第5章\5.3\示例52\main.go
package main

import "fmt"

func add(x int, y int) (int, error) {
	if x < y {
		return 0, fmt.Errorf("参数x（%d）应大于y（%d）", x, y)
	}
	return x + y, nil
}

func main() {
	if r, err := add(42, 13); err == nil {
		fmt.Printf("add(42, 13) = %d\n", r)
	}
}
