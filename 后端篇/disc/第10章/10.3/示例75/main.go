// Go：第10章\10.3\示例75\main.go
package main

import "fmt"

func main() {
	var m = map[string]string{"山东": "济南", "河南": "郑州"}
	for province := range m {
		fmt.Printf("%s的省会是%s\n", province, m[province])
	}
	// 删除字典成员
	ok := deleteMapMemeber(m, "山东")
	fmt.Printf("删除山东：%v\n", ok)
	ok = deleteMapMemeber(m, "云南")
	fmt.Printf("删除云南：%v\n", ok)

	for province := range m {
		fmt.Printf("%s的省会是%s\n", province, m[province])
	}
}

func deleteMapMemeber(m map[string]string, key string) bool {
	_, ok1 := m[key]
	delete(m, key)
	_, ok2 := m[key]
	return ok1 != ok2
}
