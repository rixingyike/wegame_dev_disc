// Go：第9章\9.2\示例41\main.go
package main

import (
	"fmt"
	"math"
)

func pow(x, n, limit float64) float64 {
	if v := math.Pow(x, n); v < limit {
		return v
	} else {
		fmt.Printf("%g >= %g\n", v, limit)
	}
	return limit
}

func main() {
	fmt.Println(
		pow(4, 2, 50), // 16
		pow(2, 3, 5),  // 5
	)
}
