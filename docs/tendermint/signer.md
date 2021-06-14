---
category: Tendermint
order: 2
title: Remote Signer
---

Tendermint 为验证者提供了远程签名者选项。远程签名者使操作员能够将验证器密钥存储在不同的机器上，从而在服务器受到威胁时最大限度地减少攻击面。Remote Signer从架构上来看是一个client-server结构。假设因为需要提交提案或是投票时，Tendermint需要一把公钥或是签名的时候，它可以从Remote Signer那里获取。

> 要运行安全验证器和远程签名器系统，建议使用 VPC（虚拟私有云）或私有连接。

Tendermint为此提供了两种不同的配置方法：Raw 或 gRPC。

## Raw

## gRPC