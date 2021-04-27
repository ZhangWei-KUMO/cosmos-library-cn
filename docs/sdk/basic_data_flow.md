---
category: SDK
order: 1
type: 基础知识
title: 你好 IBC
---

区块链间通信协议（IBC）是Cosmos SDK生态系统的重要组成部分。 本教程将帮助你如何在区块链上创建和发送数据包，你将学到：

1. 如何使用IBC在区块链之间创建和发送数据包。 
2. 使用**Cosmos SDK**和**Starport Relaye**r在区块链之间导航。 
3. 创建一个基本的博客帖子，并将该帖子保存在另一个区块链上。

## 什么是Cosmos SDK和IBC？

 Cosmos SDK是用于创建区块链应用程序的框架。 Cosmos SDK使开发人员可以轻松创建可与其他区块链进行本地互操作的自定义区块链。 Cosmos SDK中的IBC模块是**两个区块链之间交互的标准**。 IBC模块定义了发送和接收区块链如何解释数据包和消息的构造。 Cosmos IBC relayer package  使您可以在基于IBC的区块链之间进行连接。本教程教您如何创建两个区块链，然后启动Relay并将其与Starport一起使用以连接两个区块链。 本教程介绍了诸如模块，IBC数据包，中继器以及通过IBC路由的数据包生命周期之类的基本知识。 本教程使用[Starport v0.15.1](https://github.com/tendermint/starport)构建区块链。

 首先将`starport`安装进`/usr/local/bin`：

 ```bash
curl https://get.starport.network/starport@v0.15.1! | bash
 ```

 ### 可能出现的bug

由于starport依赖本地机器安装protoc包，所以针对不同的系统还需安装protoc

```bash
# Linux
apt install -y protobuf-compiler
# MacOS
brew install protobuf
```

导出环境变量

```bash
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export GOBIN=$GOPATH/bin
export PATH=$PATH:$GOROOT:$GOPATH:$GOBIN
 ```
## 创建区块链应用

### 1. 创建一个区块链

我们给这个区块链命名为`planet`:

```bash
# 生成一个叫planet的项目
starport app github.com/user/planet
cd planet 
# 构建项目，时间比较久
starport serve
```

成功后，starport会创建两个个叫`alice`和`bob`的账户和它们的哈希值地址，以及一组用于找回密码的助记词（mnemonic）。
的账户会生成四个进程：

1. 基于Tendermint的`planet`应用，端口号为：26657；
2. LCD服务端，端口为1317
3. 水龙头（faucet）端口为4500
4. 客户端，端口为12345
   
   
### 2. 在区块链中搭建一个博客模块

接下来，使用`Starport`搭建具有IBC功能的博客模块。博客模块包含用于创建博客帖子并将其通过IBC路由到第二个区块链的逻辑。 要搭建一个名为`blog`的模块，请执行以下操作:

```bash
# 这里的--ibc表示搭建时会导出IBC所有的逻辑
starport module create blog --ibc
```

搭建成功后有关于IBC模块的代码都会存放在`planet/x/blog`文件夹中。

## 修改源代码

创建`types`和`transactions`后，必须手动插入逻辑以管理数据表中的更新。下面我们修改源代码以保存数据。

### 1. 在博客文章包中添加creator

从定义IBC数据包结构的`proto`文件开始。 要在接收区块链中标识帖子的创建者，请在数据包内添加创建者字段。该字段未在命令中直接指定，因为它将自动成为`SendIbcPost` CLI命令中的参数。

```go
// planet/proto/blog/packet.proto
// IbcPostPacketData 给packet的payload定义了一个struct，
// 用在bc/packet/proto/message
message IbcPostPacketData {
    string title = "《西游记》";
    string content = "曾经有一份真诚的爱情摆在我面前，我没有珍惜...";
    string creator = "吴承恩"; 
}
```

为了确保接收链会接收到相关内容，我们将该值赋值到IBC`packet`上，msg中`sender`字段会自动包含在`SendIbcPost`中。
由于sender已经作为邮件的签名人通过验证，所以`msg.Sender`可以视为`packet.Creator`。
```go
// planet/x/blog/keeper/msg_server_ibcPost.go
// 整个packet的构造函数如下
    var packet types.IbcPostPacketData

    packet.Title = msg.Title
    packet.Content = msg.Content
    packet.Creator = msg.Sender 

    // Transmit the packet
    err := k.TransmitIbcPostPacket(
        ctx,
        packet,
        msg.Port,
        msg.ChannelID,
        clienttypes.ZeroHeight(),
        msg.TimeoutTimestamp,
    )
```

### 2. 接收报文

基础交易的逻辑在`planet/x/blog/keeper/ibcPost.go`中，我们可以使用以下方法管理IBC数据包：

* 手动调用`TransmitIbcPostPacket`发送数据包，也可以通过它编辑发送前的逻辑；
* 