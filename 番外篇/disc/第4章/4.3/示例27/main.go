// Go：第4章\4.3\示例27\main.go
package main

import "fmt"

func main() {
	var format = "%T：%v\n"

	var b bool
	fmt.Printf(format, b, b)

	var i int
	fmt.Printf(format, i, i)

	var f float64
	fmt.Printf(format, f, f)

	var c1 complex128
	fmt.Printf(format, c1, c1)

	var s string
	fmt.Printf(format, s, s)

	var p *int
	fmt.Printf(format, p, p)

	var arr [3]int
	fmt.Printf(format, arr, arr)

	var s1 []int
	fmt.Printf(format, s1, s1)

	var m map[string]string
	fmt.Printf(format, m, m)

	type Person struct{ name string }
	var person1 Person
	fmt.Printf(format, person1, person1)

	var err error
	fmt.Printf(format, err, err)
}
