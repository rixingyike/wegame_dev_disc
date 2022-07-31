// Go：第8章\8.3\示例24\main.go
package main

import (
	"fmt"
	"math"
)

func main() {
	var x, y int = 3, 4
	var f float64 = math.Sqrt(float64(x*x + y*y))
	var z = int(f)
	var a = float64(x) + 0.5
	var b = int(a)
	var c = uint(f)
	fmt.Println(x, y, z, a, b, c)
}
