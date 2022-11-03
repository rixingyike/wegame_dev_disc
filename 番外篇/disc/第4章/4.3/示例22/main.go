// Go：第4章\4.3\示例22\main.go
package main

import "fmt"

var (
	isStrong  bool      = false
	age                 = 3
	strength1 float32   = 100.0
	strength2           = 100.0
	score1    complex64 = complex(1, 2)
	score2              = complex(23.23, 11.11)
	name      string    = "小游戏"
	orderNo1  byte      = 'a'
	orderNo2            = 'A'
)

func main() {
	const f = "%T：%v\n"
	fmt.Printf(f, isStrong, isStrong)
	fmt.Printf(f, age, age)
	fmt.Printf("%T：%f\n", strength1, strength1)
	fmt.Printf("%T：%f\n", strength2, strength2)
	fmt.Printf(f, score1, score1)
	fmt.Printf(f, score2, score2)
	fmt.Printf(f, name, name)
	fmt.Printf(f, orderNo1, orderNo1)
	fmt.Printf(f, orderNo2, orderNo2)
}
