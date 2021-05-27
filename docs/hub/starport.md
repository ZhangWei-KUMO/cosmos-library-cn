---
category: Starport
order: 1
title: 使用starport启动一个区块链
---


## 安装golang环境

```bash
wget <URL>
# release package
tar -xzvf go.tar.gz
```

> golang版本 v1.16.0+

将解压后的go文件夹移动到`/usr/local`, 如果之前有安装过的旧版本请先删除。最后将GO的环境变量export出来。

> 通过 go env 命令行可以查看当前GOPATH和GOROOT的路径，针对ubuntu系统，由于权限限制需要对go文件夹的写入权限进行解锁。

```bash
sudo chmod -R 777 /usr/local/go
```

# 下载脚手架

```
starport app <rep>
```
## 使用nohup守护者启动后台

```bash
nohup starport serve 
```