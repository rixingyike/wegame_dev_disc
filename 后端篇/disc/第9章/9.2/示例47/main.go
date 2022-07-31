// Go：第9章\9.2\示例47\main.go
package main

import "fmt"

func main() {
	var score = 95
	var grade, info = rate(score)
	fmt.Printf("分数：%d，等级：%s（%s）\n", score, grade, info)

	score = 75
	grade, info = rate(score)
	fmt.Printf("分数：%d，等级：%s（%s）\n", score, grade, info)

	score = 55
	grade, info = rate(score)
	fmt.Printf("分数：%d，等级：%s（%s）\n", score, grade, info)
}

func rate(score int) (string, string) {
	var grade, info string // 等级，评语
	switch {
	case score > 90:
		grade = "A"
	case score > 80:
		grade = "B"
	case score > 70:
		grade = "C"
	case score > 60:
		grade = "D"
	case score > 50:
		grade = "E"
	default:
		grade = "F"
	}

	switch grade {
	case "A":
		info = "优秀"
	case "B", "C":
		info = "良好"
	case "D":
		info = "及格"
	case "E":
		info = "不及格"
	default:
		info = "差矣"
	}

	return grade, info
}
