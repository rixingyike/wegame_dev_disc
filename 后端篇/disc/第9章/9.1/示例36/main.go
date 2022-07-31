// Go：第9章\9.1\示例36\main.go
package main

import "fmt"

const (
	INT64_MAX = int64(^uint64(0) >> 1)
	INT64_MIN = ^INT64_MAX
)

const (
	// 这个数大于INT64_MAX
	bigNum = 9223372036854775807 + 1
	// 这个数小于INT64_MIN
	smallNum = -9223372036854775808 - 1
)

func main() {
	fmt.Printf("INT64_MAX：%d\n", INT64_MAX)
	fmt.Printf("INT64_MIN：%d\n", INT64_MIN)

	fmt.Println("\nbigNum")
	fmt.Println(needInt(bigNum - 1))
	fmt.Println(needFloat64(bigNum))

	fmt.Println("\nsmallNum")
	fmt.Println(needInt(smallNum + 1))
	fmt.Println(needFloat64(smallNum))
}

func needInt(x int64) int64 {
	fmt.Printf("needInt x = %v\n", x)
	return x*5 + 1
}

func needFloat64(x float64) float64 {
	fmt.Printf("needFloat64 x = %v\n", x)
	return x * 0.1
}
