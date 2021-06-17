---
category: Gaia
order: 2
title: 升级你的节点
---

本文将教会您如何将gaiad全节点升级到新版本。首先关闭gaiad实例。从github上获取最新代码并且进行编译：

```bash
cd gaia
git fetch --all && git checkout <new_version>
make install
```

 ## 升级Genesis文件

 如果您是要加入主网的话，则从[mainnet repo](https://github.com/cosmos/mainnet)获取genesis文件。如果是希望加入测试网的话，则从[testnet repo](https://github.com/cosmos/testnets)。不管是从哪获取，我们都将文件以`new_genesis.json`名进行保存,然后替代之前的`genesis.json`。

```bash
cd $HOME/.gaia/config
cp -f genesis.json new_genesis.json
mv new_genesis.json genesis.json
```

## 将state暴露给新的genesis.json

```bash
cd $HOME/.gaia/config
gaiad export --for-zero-height --height=<export-height> > new_genesis.json
```

```bash
cp -f genesis.json new_genesis.json
mv new_genesis.json genesis.json
gaiad start
```
