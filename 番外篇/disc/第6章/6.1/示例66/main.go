// Go：第6章\6.1\示例66\main.go
package main

import "fmt"

func main() {
	var a = [3][4]int{
		{0, 1, 2, 3},   /*  第一行索引为 0 */
		{4, 5, 6, 7},   /*  第二行索引为 1 */
		{8, 9, 10, 11}} /* 第三行索引为 2 */

	for i := 0; i < 3; i++ {
		for j := 0; j < 4; j++ {
			fmt.Printf("n[%d][%d] = %d\t", i, j, a[i][j])
		}
		fmt.Printf("\n")
	}
}
