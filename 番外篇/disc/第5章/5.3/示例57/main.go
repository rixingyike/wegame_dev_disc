// Go：第5章\5.3\示例57\main.go
package main

import (
	"fmt"
	"math"
)

func main() {
	var sqrtFunc = func(x float64) float64 {
		return math.Sqrt(x)
	}
	fmt.Println(sqrtFunc(36))
}
