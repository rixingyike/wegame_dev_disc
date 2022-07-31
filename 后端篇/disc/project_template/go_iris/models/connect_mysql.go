package models

import (
	_ "github.com/go-sql-driver/mysql"
	"xorm.io/xorm"
	"xorm.io/xorm/names"
	"os"
	"fmt"
	"time"
	"strings"
)

const MYSQL_CONNECTION_STR = "root:liyi@tcp(localhost:3306)/minigame?charset=utf8mb4&parseTime=false"
var engine *xorm.Engine

func ConnectMySQL() *xorm.Engine {
	if engine == nil {
		var err error
		engine, err = xorm.NewEngine("mysql", MYSQL_CONNECTION_STR)
		engine.SetMapper(names.GonicMapper{})
		// 设置连接池的空闲数大小，
		// 在池中允许更多的空闲连接将提高性能，这样可以减少从头开始建立新连接
		engine.SetMaxIdleConns(5)
		// 设置最大打开连接数
		engine.SetMaxOpenConns(10)
		// 设置连接可重用的最大时间长度
		engine.SetConnMaxLifetime (time.Hour)
		engine.TZLocation, _ = time.LoadLocation("Asia/Shanghai")
		
		if err != nil {
			engine = nil 
			panic(err)
		}

		// 连接测试
		if err = engine.Ping(); err != nil {
			engine = nil 
			panic(err)
		}
		fmt.Printf("数据库链接成功")

		// 在调试模式下同步数据库结构
		if strings.Compare(os.Getenv("DEBUG"),"true") == 1 {
			// 如果有新的模型需要同步，加在后面
		}
	}
	
	return engine
}