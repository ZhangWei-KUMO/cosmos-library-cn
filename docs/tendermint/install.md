---
category: Tendermint
order: 0
title: Install
---

## 三种安装方式

### 下载pre-build包
首先去以下链接中下载预构建包：https://github.com/tendermint/tendermint/releases;

### Brew安装
对于Mac用户可以借助brew安装：

```bash
brew install tendermint
```

> Tendermint是基于go语言编写，所以需要运行机器中已经安装好go，并export好相关环境变量。

### Git安装

```bash
git clone https://github.com/tendermint/tendermint.git
cd tendermint
make install
make build
```

以上无论哪种安装方式，我们最终检测是否安装成功：

```bash
# 成功后会输出版本号，编写本文档时为0.34.10
tendermint version

# 查询tendermint 命令行的帮助，这个很重要因为他们的flag经常换
tendermint node --help
```

## 启动一个简单的单节点区块链

```bash
# 初始化一个验证节点
tendermint init validator
```

之后tendermint会生成一个私有验证者，节点key，genesis创世文件。这三个都是以JSON格式存储在`$HOME/.tendermint`文件夹中。
分别为：

```bash
/data/priv_validator_state.json
/config/node_key.json
/config/genesis.json
```

```bash
tendermint start proxy_app=kvstore
```
如果一切顺利，那么恭喜你tendermint安装成功。

## 常见bug

与go的环境变量不兼容，

