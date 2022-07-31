// Go：models\account.go
package models

type Account struct {
	Id   int64			`xorm:"bigint pk autoincr 'id'" json:"id"`
	Name string  		`xorm:"VARCHAR(45) unique 'name' comment('用户名')"`
	Passwd string  	`xorm:"VARCHAR(45) comment('密码')"`
	Role string  		`xorm:"VARCHAR(45) default 'assistant' comment('用色: assistant、administrator')"`
}