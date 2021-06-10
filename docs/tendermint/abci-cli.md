---
category: Tendermint
order: 8
title: ABCI-CLI
---

为了方便 ABCI 服务器和简单应用程序的测试和调试，我们构建了一个 CLI，即 abci-cli，用于从命令行发送 ABCI 消息。

 ```bash
git clone git@git.zhlh6.cn:tendermint/tendermint.git
cd tendermint
make install_abci
```

abci-cli 工具允许我们将 ABCI 消息发送到我们的应用程序，以帮助构建和调试它们。最重要的消息是deliver_tx、check_tx 和commit，但为了方便、配置和信息目的，还有其他消息。 我们将启动一个 kvstore 应用程序，它与上面的 abci-cli 同时安装。 kvstore 只是将交易存储在默克尔树中。 

```bash
# 在一个终端中先启动一个kvstore
abci-cli kvstore
# 在另一个终端上启动一个
abci-cli echo hello
abci-cli info
```

至于出现什么我特么也不知道。

一个ABCI应用必须提供两个东西：

* 一个socket server
* ABCI消息的处理器

当我们运行`abci-cli info`,将会打开一个新的连接到ABCI server上，并调用Info()方法，并告诉我们当前默克尔树上的交易状况。当我们向这个单一连接发送多个message时，通常会使用`abci-cli console` 和 `abci-cli batch`两个命令行。比如`abci-cli console`会打开一个交互式控制台。