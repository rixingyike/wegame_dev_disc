## 如何安装与使用babel-node

### 1，安装Node.js

下载链接：https://nodejs.org/en/download/。作者安装与使用的版本是v10.22.0。

在安装了Node.js之后，就可以使用如下指令，测试一般的js代码了。

```
cd disc
node ./第1章/1.3.7/index.js
```

但是Node.js 在默认情况下是不支持 import 和 export 的，包括类的公有及私有字段声明也是不支持的，如果我们的代码中想使用这些功能，可以考虑使用babel-node代表node指令。

### 2，安装与配置babel-node

安装与配置步骤：

1）初始化目录

```
cd desc
npm init
```

2）安装依赖包

```
npm install -g @babel/node @babel/core
npm install @babel/preset-env --save-dev
```

3）配置 .babelrc 文件，开启语法支持

在项目根目录下新建`.babelrc`文件，内容如下:

```
{
  "presets": [ "@babel/preset-env" ]
}
```

### 3，使用babel-node的指令示例

```
cd disc
babel-node ./第1章/1.3.7/index.js
```