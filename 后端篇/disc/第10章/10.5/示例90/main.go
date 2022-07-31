// Go：第10章\10.5\示例91\main.go
package main

import (
	"fmt"
	"unsafe"
)

func main() {
	var a = [3]int{1, 3, 5}
  var ptrA [3]*int // 指针数组
  var ptr = (*int)(unsafe.Pointer(&a)) // 非安全指针

  fmt.Printf("%T：%v\n", a, a) // [3]int：[1 3 5]

  for i := 0; i < len(a); i++ {
    fmt.Printf("*ptr = %d\n", *ptr)
    ptrA[i] = ptr
    ptr = (*int)(unsafe.Pointer(uintptr(unsafe.Pointer(ptr)) + unsafe.Sizeof(a[i])))
  }

  for i := 0; i < len(ptrA); i++ {
    fmt.Printf("ptrA[%d] = %v\n", i, *ptrA[i])
  }

  var b = [...]int{0,1,2,3,4,4,4,5,3,4,3,4}
  var ELEMENT_SIZE = unsafe.Sizeof(b[0])
  ptr = (*int)(unsafe.Pointer(&b))
  for i := 0; i < len(b); i++ {
    fmt.Printf("%02d：*ptr = %d\n", i, *ptr)
    ptr = (*int)(unsafe.Pointer(uintptr(unsafe.Pointer(ptr)) + ELEMENT_SIZE))
  }
  fmt.Printf("*ptr = %d\n", *ptr)
  *ptr = 10
  fmt.Printf("*ptr = %d\n", *ptr)
}
