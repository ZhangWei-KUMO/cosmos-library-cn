---
category: Starport
order: 2
title: 快速启动一个简单的区块链博客
---

## 准备事项

1. 安装Golang语言；
2. 配置Golang的环境变量
3. 下载安装starport CLI工具
   
### 安装安装Golang语言

> 本教程使用的系统环境为Ubuntu16.4

```bash
# 下载go1.16.5安装包
wget https://dl.google.com/go/go1.16.5.linux-amd64.tar.gz
# 删除旧go包（如果有的话）
sudo rm -rf /usr/local/go
# 解压并安装
sudo tar -C /usr/local -xzf go1.16.5.linux-amd64.tar.gz
```

### 配置Golang的环境变量

打开`.bash_profile `
```bash
vim ~/.bash_profile 
```

将go的环境变量暴露给系统
```bash
export PATH=$PATH:/usr/local/go/bin
export PATH=$PATH:~/go/bin
```

重启刷新`.bash_profile`
```bash
source ~/.bash_profile 
```

### 下载安装starport CLI工具

```bash
curl https://get.starport.network/starport@v0.15.1! | bash
```

## 安装并启动博客

```bash
# 下载blog项目
starport app github.com/example/blog
# 启动
starport serve
```