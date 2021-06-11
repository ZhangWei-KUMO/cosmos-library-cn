---
category: faq
order: 0
title: Go的环境变量设置
---

Tendermint是一个由go语言编写的项目，对于Go语言环境变量的设置尤为重要。在Go的环境变量中最为重要的两个环境变量为`GOROOT`和`GOPATH`。`GOROOT`是Go的安装路径，而`GOPATH`则是go编译后二进制文件的存放地和在使用go编程时导入package的搜索路径，其内部包含三个主要目录：

1. bin: 存放可执行文件
2. pkg: 存放*.a文件，也就是编译好的库
3. src: 存放go的源文件

与其他编程语言go语言需要在`~/.bash_profile`文件中`export`变量:

```bash
GOROOT=/usr/local/go
export GOROOT
export $PATH:$GOROOT/bin
export $PATH:$GOPATH/bin
```
## 确保Go的安装配置

输入`go env`命令行后shell中会出现一列环境变量，我们看重点的`GOROOT`和`GOPATH`,在go的默认设置中`GOPATH`会在`$HOME/go`,这个go文件夹就是Go Workspace


## Go语言常用命令行

```bash
# 加载第三方库
go get <PACKAGE_NAME>
# 在项目根目录构建
go build
# 运行启动文件
go run *.go
```