---
category: Tendermint
order: 1
title: Application Architecture Guide
---

一款Tendermint 区块链应用会有不同的架构，本章将会给大家一个推荐示范架构的讲解。在Tendermint应用分为两种，一种是终端用户应用，比如像是桌面端的钱包应用，用户下载后可以与系统进行交互。另一种是ABCI应用，它的代码逻辑是跑在区块链上，当终端用户在桌面端提交一笔交易，在经过Tendermint共识机制确认后，会交由ABCI应用进行处理。

客户端应用通过Tendermint Core RPC与验证节点、轻节点进行交互。而Tendermint Core Process会与本地ABCI应用进行交互。原则上来说ABCI应用除了共识之外不和其他任何一方进行通信。如果您的ABCI应用是通过Go语言编写的，则需要将其编译成Tendermint Binary，否则与Tendermint的交互只能通过unix socket。如果需要进行TCP通信，则必须使用加密和认证连接。

所有从ABCI应用中的read行为都是通过Tendermint的`abci_query`端点。




