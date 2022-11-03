// Go：第5章\5.2\示例48\main.go
package main

import "fmt"

func main() {
	s := "abcd"
	for i, c := range s {
		switch c {
		case 'a':
			fmt.Printf("%d：a\n", i)
			fallthrough
		case 'b':
			fmt.Printf("%d：b\n", i)
			fallthrough
		case 'c':
			fmt.Printf("%d：c\n", i)
			fallthrough
		default:
			fmt.Printf("%d：d\n", i)
		}
	}
}
