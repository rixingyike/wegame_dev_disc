// Go：第6章\6.5\示例86\main.go
package main

import (
	"fmt"
)

func main() {
	var a int = 10                    // 声明变量
	var ptrA *int                     // 声明指针变量
	ptrA = &a                         // 为指针变量赋值
	fmt.Printf("*ptrA = %d\n", *ptrA) // 获取指针所指向的数据内容
	*ptrA = *ptrA + 1                 // 修改指针指向的数据内容
	fmt.Printf("*ptrA = %d\n", *ptrA)
	fmt.Printf("a = %d\n", a)
	fmt.Printf("&ptrA = %d\n", &ptrA)
}
