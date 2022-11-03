// Go：第5章\5.1\示例30\models\history.go
package models

import "fmt"

func init() {
	println("history.init")
	// 在包内部，可以访问包的私有成员：变量及函数、方法
	tech1.print("history.init")
	Tech2.print("history.init")
	fmt.Printf("print tech1.age：%d in history.init\n", tech1.age)
	fmt.Printf("print Tech2.age：%d in history.init\n", Tech2.age)
	// Output：
	// history.init
	// call technology.tech1's print in history.init
	// call technology.Tech2's print in history.init
	// print tech1.age：3 in history.init
	// print Tech2.age：5 in history.init
}
