// Go：第6章\6.3\示例76\main.go
package main

import "fmt"

type MapKeyType interface {
	type string, int, float64, bool 
}
type MapValueType MapKeyType

func main() {
	var m = map[string]string{"山东": "济南", "河南": "郑州"}
	for province := range m {
		fmt.Printf("%s的省会是%s\n", province, m[province])
	}
	// 删除字典成员
	ok := deleteMapMemeber(m, "山东")
	fmt.Printf("删除山东：%v\n", ok) // 删除山东：true

	ok = deleteMapMemeber(m, "云南")
	fmt.Printf("删除云南：%v\n", ok) // 删除云南：false

	for province := range m {
		fmt.Printf("%s的省会是%s\n", province, m[province])
	}

	var m1 = map[int]string{2018: "小游戏", 2017: "小程序"}
	for key := range m1 {
		fmt.Printf("%v：%v\n", key, m1[key])
	}

	ok = deleteMapMemeber(m1, 2017)
	fmt.Printf("删除2017：%v\n", ok) // 删除2017：true

	ok = deleteMapMemeber(m1, 2017)
	fmt.Printf("删除2017：%v\n", ok) // 删除2017：false

	for key := range m1 {
		fmt.Printf("%v：%v\n", key, m1[key])
	}
}

func deleteMapMemeber[T1 MapKeyType, T2 MapValueType](m map[T1]T2, key T1) bool {
	_, ok1 := m[key]
	delete(m, key)
	_, ok2 := m[key]
	return ok1 != ok2
}