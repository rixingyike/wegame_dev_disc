// Go：第8章\8.1\示例13\main.go
package main

import (
	"errors"
	"fmt"
	"reflect"
)

func main() {
	var (
		isHappy = true
		age     = 0
		salary  = 0.0
		name    = "小游戏"
		orderNo = 'A'
		err     = errors.New("NULL")
	)
	fmt.Printf(`isHappy：%s
		age：%s
		salary：%s
		name：%s
		orderNo：%s
		err：%s`,
		reflect.TypeOf(isHappy),
		reflect.TypeOf(age),
		reflect.TypeOf(salary),
		reflect.TypeOf(name),
		reflect.TypeOf(orderNo),
		reflect.TypeOf(err))
}
