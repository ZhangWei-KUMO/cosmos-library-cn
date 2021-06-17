---
category: Gaia
order: 10
title: Validator Security
---

## 密钥管理——硬件安全模块

对于验证者节点来说，防止黑客对于密钥的窃取是重中之重。其中的硬件管理模块（Hardware Security Modules，简称HSM）是非常重要的策略。在保护Hub上HSM模块必须支持ed25519签名，Cosmos生态所选用的是[YubiHSM2](https://github.com/iqlusioninc/yubihsm.rs)

## DDoS防御（哨兵节点架构）

防止DDoS攻击几乎是所有服务器网络的必备工作之一，在区块链中我们推荐的方法是为验证者节点构建严密的拓扑网络架构——这种架构就是所谓的哨兵节点架构（Sentry Node Architecture）。验证者节点在连接全节点的时候只应该去连他们在现实世界中熟知的节点，大多数的节点是运行在各类云计算中心中，这类云计算中心都可以随时更改IP地址：

在**验证者节点**我们的设置如下，打开`config.toml`:

```bash
# 在数组中填入您的哨兵节点的列表，以逗号分隔
persistent_peers =[list of sentry nodes]

# 将pex设置为true
pex = false
```

在**哨兵节点**我们的设置如下，打开`config.toml`:

```bash
# 放置私有节点列表，以逗号分隔
# 案例 ID: 3e16af0cead27979e1fc3dac57d03df3c7a77acc@3.87.179.235:26656

private_peer_ids = "node_ids_of_private_peers"
```