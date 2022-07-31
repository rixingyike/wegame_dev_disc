// Go：第9章\9.2\示例49\main.go
package main

import (
	"fmt"
	"time"
)

func main() {
	var t = time.Now()
	greet(t)

	var d, _ = time.ParseDuration("-6h")
	t = t.Add(d)
	greet(t)

	t = t.Add(d)
	greet(t)
}

func greet(t time.Time) {
	switch {
	case t.Hour() < 12:
		fmt.Println("Good morning")
	case t.Hour() < 17:
		fmt.Println("Good afternoon")
	default:
		fmt.Println("Good evening")
	}
}
