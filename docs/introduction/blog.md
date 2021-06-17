---
category: StarPort
order: 2
title: 快速启动一个简单的区块链博客
---

## 准备事项

1. 安装Golang语言；
2. 配置Golang的环境变量;
3. 前端环境配置;
4. 下载安装starport CLI工具
   
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

### 前端环境配置

```bash
# 安装NVM
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
# 安装nodeJSv12.1.1
nvm install v12.1.1
# 使用nodeJSv12.1.1
nvm use v12.1.1
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

## 项目结构

* 前端
  * 端口：:8082
* 后端
  * Faucet,port:4500
  * API,port:1317
  * Tendermint node,port:26657

## 后端项目的启动

```bash
# 简单启动
starport serve
# 守护者进程后台启动
nohup starport serve &
# 关闭守护者进程，首先查找starport serve的PID
ps -ef
# 关闭
kill [PID]
```

## 前端项目启动

```bash
cd vue
npm run dev
# 或后台启动
nohup npm run serve &
```

## 配置config.yml

整个区块链的配置位于`config.yml`文件中。其中主要是对`accounts`和`validators`进行设置，默认内容如下：

```yml
accounts:
  - name: alice
    coins: ["20000token", "200000000stake"]
  - name: bob
    coins: ["10000token", "100000000stake"]
validator:
  name: alice
  staked: "100000000stake"
client:
  vuex:
    path: "vue/src/store"
  openapi:
    path: "docs/static/openapi.yml"
faucet:
  name: bob
  coins: ["5token", "100000stake"]
```

完整设置如下：

```yml
accounts:
  - name: alice
    coins: ["20000token", "200000000stake"]
    address: "cosmos1r83m977ejhsuw3mg0gklnm7k8ut8f9waq6yhtn",
    # mnemonic用于账户生成，如果设置了address该字段会被跳过
    mnemonic: "fix car ..."
  - name: bob
    coins: ["10000token", "100000000stake"]
build:
  # 用于构建区块链二进制的工具名，通常为链名+d
  binary: "hypatiad"
# 初始化中我们将alice设置为验证节点，初始stake为100000000
validator:
  name: alice
  staked: "100000000stake"
client:
  vuex:
    path: "vue/src/store"
  openapi:
    path: "docs/static/openapi.yml"
faucet:
  name: bob
  coins_max: ["2000token", "1000stake"]
  coins: ["500token", "100000stake"]
init:
# 指定区块链数据存储的文件夹，名称为我们的区块链名称
  home: "~/.hypatia",
# 指定数据存储文件夹的配置文件，一般不设置，使用默认config.toml
  config: "config/config.toml",
# 指定数据存储文件夹的应用配置文件，一般不设置，使用默认app.toml
  app: "config/app.toml",
# 设置私钥，默认值为test
  keyring-backend: "os",
# 配置各类通信端口
  host:
    rpc: ":26659"
    p2p: ":26658"
    prof: ":6061"
    grpc: ":9091"
    api: ":1318"
#  genesis设置
  genesis:   
    app_state:
      staking:
        params:
          bond_denom: "denom"
```

## 设置genesis.json

`genesis.json`是基于`config.yml`文件的配置在区块链启动时自动生成的文件。

————————
参考资料：https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units