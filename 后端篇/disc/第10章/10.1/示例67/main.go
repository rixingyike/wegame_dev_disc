// Go：第10章\10.1\示例67\main.go
package main

import "fmt"

func getAverage(arr []int) float32 {
	arr[0] = 200
	var avg, sum float32
	var size = len(arr)
	for i := 0; i < size; i++ {
		sum += float32(arr[i])
	}
	avg = sum / float32(size)
	return avg
}

func main() {
	var arr = []int{100, 2, 4, 21, 50}
	fmt.Printf("arr = %v\n", arr)

	var avg = getAverage(arr)
	fmt.Printf("平均值: %.2f\n", avg)
	fmt.Printf("arr = %v\n", arr)
}
