---
category: IBC
order: 1
title: 总览
---

## IBC是什么？

基于IBC模块的设计，IBC开发者无需关心客户端、连接、证明机制的底层细节。尽管如此，我们还是简要介绍一下底层以便开发者能够更好地理解高层。尤其是开发者经常会打交道的channels和ports。并教会开发者如何自定义自己的packets，和IBCModule的回调。

为了你的模块能够在IBC上进行交互，你必须绑定ports，定义自己的数据包结构，并知道如何对它们进行加密解密和实现IBCModule的接口。

## Components

### Clients

IBC客户端是轻客户端（绑定了一个唯一的client-id）,它会追踪其他区块链的共识状态以及根据客户端的共识状态正确验地证证明所需的证明规范。
一个客户端可以任意数量的区块链相连。支持IBC的客户端有：

1. Solo Machine 设备客户端，如手机、电脑、浏览器
2. Tendermint 基于cosmos区块链的默认客户端
3. localhost 用于测试、模拟和将数据包中继到同一应用程序上的模块。

### Connections

每一个`ConnectionEnd`都会与一个对手链的客户端相关联。用于IBC状态的验证。 

### Proofs and Paths

在IBC中，区块链并不在网络中直接通信。相反，某个链会向一个规定的消息类型和特定的对手链的预订路径提交某些状态（比如在handshake部分中添加特定的connectionEnd，或者将packets中继到对手链的某个module中）。

relayer prcoess会监听这些paths的更新，并中继传递消息。将存储在paths下的数据连同证明提交给交易对手链。所有的IBC提交消息的实现都定义在[ICS-24]()中, 所有生成证明验证格式则放在[ICS-23]()中。

### Capabilities

由于IBC的执行环境为模块间互不信任，所以ports和channels上模块行为必须要得到验证，只有具有适当权限的模块才能使用它们。整个过程是通过[dynamic capabilities]()完成的。在绑定port或为module创建channel之后，IBC将会返回dynamic capabilities, module必须声明以及使用了哪个port和channel，它们都有独立的`portID`和`channelID`，以防止被其他module重复使用。

上述介绍的这些背景信息，在实际的IBC模块的开发中并不会与之打交道。IBC应用从本质上来说是一个独立的module。开发者可以将module视为一个互联网中的一个app，portID类似于IP port，而channelID类似于IP address。

### Channels

一个channel可以是`ORDERED`, 在这种情况下,被接收的packets必须按照发送包指定的顺序进行数据处理，也有可能`UNORDERED`,则不存在这种限制。module可以选择通信channel，也可选择接受或拒绝通道。

channel的handshake一共分四步：简单来讲，若A链和B链之间已经存在一个connection，并且想打开一个channel:

1. A链会发送一个`ChanOpenInit`消息给B链进行channel初始化；
2. B链会发送一个`ChanOpenTry`消息打开与A链之间的channel；
3. A链会发送一个`ChanOpenAck`消息将channel最终的状态标记为open；
4. B链也会发送一个`ChanOpenConfirm`消息将channel最终的状态标记为open；


如果上述步骤成功后，channel就会对双方打开。在handshake的每一步中，与`channelEnd`相关连的模块都会执行回调。比如`chanOpenInit`会执行`OnChanOpenInit`回调函数。

## Packets

同传统的互联网应用一样，Modules之间在IBC channels上发生packets进行通信，所有的packet都包含源模块的portID和channelID和目标模块的portID和channelID，同时包含一个sequence选择是否排序。除此之外还包含`TimeoutTimestamp`,`TimeoutHeight`用于数据包超时处理。而应用层的的通信数据则存放在`Data []byte`字段中，这些信息对于IBC handler来说完全不透明。对于发送方来说它会将信息加密进`Data`字段中，而接收方则对该字段进行解密。

