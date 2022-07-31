// Go：第9章\9.1\示例30\models\technology.go
package models

import "fmt"

func init() {
	tech1.print("technology.init")
	Tech2.print("technology.init")
	fmt.Printf("print tech1.age：%d in technology.init\n", tech1.age)
	fmt.Printf("print Tech2.age：%d in technology.init\n", Tech2.age)
	// Output:
	// call technology.tech1's print in technology.init
	// call technology.Tech2's print in technology.init
	// print tech1.age：3 in technology.init
	// print Tech2.age：5 in technology.init
}

var (
	tech1 = &Technology{Name: "technology.tech1", age: 3} // 包内私有变量
	Tech2 = &Technology{Name: "technology.Tech2", age: 5} // 包内公开变量
)

type Technology struct {
	Name string
	age  int
}

// 这是一个私有方法，在包内可见
func (t *Technology) print(scope string) {
	fmt.Printf("call %s's print in %s\n", t.Name, scope)
}
