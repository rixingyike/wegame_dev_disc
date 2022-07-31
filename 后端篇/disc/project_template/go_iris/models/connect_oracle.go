package models

import (
	// Oracle配置略为麻烦，可以参见：
	// https://studygolang.com/articles/18238
	// 除非情非得已，个人不建议使用Oracle，体积大且配置麻烦
	// _ "github.com/mattn/go-oci8"
	"xorm.io/xorm"
	"xorm.io/xorm/names"
	"os"
	"fmt"
	"time"
	"strings"
)

// 账号usr，密码123456，实例ORCL
const ORACLE_CONNECTION_STR = "usr/123456@127.0.0.1:1521/ORCL"
// var engine *xorm.Engine

func ConnectOracle() *xorm.Engine {
	if engine == nil {
		var err error
		engine, err = xorm.NewEngine("oci8", ORACLE_CONNECTION_STR)
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