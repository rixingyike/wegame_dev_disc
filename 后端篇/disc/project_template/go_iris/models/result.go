package models

type Result struct {
	ErrMsg    string   `json:"errMsg"`    // 返回的提示消息
	Data   interface{} `json:"data"`   		// HTTP响应数据
}