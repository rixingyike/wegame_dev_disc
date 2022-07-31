// Go：第9章\9.2\示例46\main.go
package main

import "fmt"

func main() {
	var a int = 1

LOOP1:
	{
		for a < 5 {
			if a == 3 {
				a = a + 1
				goto LOOP1
			}
			fmt.Printf("LOOP1：a = %d\n", a)
			a++
		}
		fmt.Printf("循环1结束\n")
	}

LOOP2:
	{
		for a < 10 {
			if a == 7 {
				a = a + 1
				goto LOOP2
			}
			fmt.Printf("LOOP2：a = %d\n", a)
			a++
		}
		fmt.Printf("循环2结束\n")
	}
}
