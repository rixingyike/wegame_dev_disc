// Go：第5章\5.1\示例38\main.go
package main

import "fmt"

const (
	Unknown = iota
	Female
	Male
)

func main() {
	fmt.Printf("未知：%v，女：%v，男：%v\n",
		Unknown, Female, Male)
}
