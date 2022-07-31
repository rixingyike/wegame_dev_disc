// Go：models\history.go
package models

import "time"

type History struct {
	Id   				int64				`xorm:"bigint pk autoincr 'id'" json:"id"`
	Openid 			string  		`xorm:"VARCHAR(32) index('openid_index')" json:"openid"`
	DateCreated time.Time  	`xorm:"DATETIME created default CURRENT_TIMESTAMP 'date_created'" json:"date_created" description:"创建时间"`
	SystemScore int  				`xorm:"TINYINT" json:"system_score"`
	UserScore 	int  				`xorm:"TINYINT" json:"user_score"`
}
