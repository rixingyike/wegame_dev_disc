// Go：第10章\10.5\示例91\main.go
package main

import (
	"fmt"
	"unsafe"
)

type Technology struct {
  Name string 
  age int 
}

func main() {
	var t = new(Technology) 
  var pName = (*string)(unsafe.Pointer(t))
  *pName = "小游戏"
  var pAge = (*int)(unsafe.Pointer(uintptr(unsafe.Pointer(pName)) + unsafe.Offsetof(t.age)))
  *pAge = 3
  fmt.Printf("%v\n", *t)
}
