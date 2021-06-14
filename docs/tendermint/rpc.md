---
category: Tendermint
order: 4
title: RPC 远程程序调用
---

Tendermint在远程程序调用方法上由三种方式所组成：

1. 基于HTTP协议的URIGET请求调用；
2. 基于HTTP协议的JSON格式的POST请求调用；
3. 基于websocket协议的subscribe订阅模式；

> Tendermint提供了一个web端的调试[界面应用](https://docs.tendermint.com/master/rpc/#/)。可以选择两种服务：默认为cosmos主网节点交互，另一个为本地端口26657的本地tendermint。本教程所有请求均为GET请求

## 获取节点信息

如我们获取当前区块链健康状况请求如下：

```bash
# 获取本地区块链
curl -X GET "http://localhost:26657/health" -H "accept: application/json"
```

|目的|路径|说明|
|---:|---:|---:|
|健康|`/health`|如果成功返回一个空result对象|
|状态|`/status`|返回当前node_info,sync_info,validator_info|
|网络信息|`/net_info`|节点数量的信息|
|区块链|`/blockchain?minHeight=VALUE&maxHeight=VALUE`|返回制定区块范围的区块，区间间隔不超过20个区块。|
|获取区块(by hash)|`/block_by_hash?hash=VALUE`|hash键值对为必填项|
|获取区块(by height)|`/block?height=NUMBER`|基于高度获取特点区块信息,如果没有填写参数则返回最新区块|
|获取提交信息|`/block_results`||
|获取提交信息|`/commit?height=NUMBER`|height为可选参数，如果没有参数则返回最新提交信息|
|获取验证者|`/validators?height=NUMBER&page=NUMBER&per_page=NUMBER`|获取验证节点列表，节点将依据投票权重进行降序排序，所有参数均为可选参数|
|获取创世区块|`/genesis`||
|获取共识状态|`/dump_consensus_state`|切勿在ABCI应用中调用|
|获取共识状态|`/consensus_state`|切勿在ABCI应用中调用|
|获取共识参数|`/consensus_params?height=NUMBER`||
|获取未确权交易列表|`/unconfirmed_txs?limit=NUMBER`|limit最大值为30|
|获取未确权交易数|`/num_unconfirmed_txs`||
|搜索交易|`/tx_search?query=tx.height=1000&prove=BOLEAN&page=1&per_page=30&order_by=asc`|
  order_by可选`asc`升序和`dasc`降序，`per_page`单页最大数量为100，`tx.height`为交易区块高度
|
|搜索区块|`/block_search?query=block.height=1000&prove=BOLEAN&page=1&per_page=30&order_by=asc`|
|

## 交易
|目的|路径|说明|
|---:|---:|---:|
|通过哈希获取交易|`/tx?hash=VALUE`||
|交易同步广播|`/broadcast_tx_sync?tx=NUMBER`||
|交易异步广播|`/broadcast_tx_async?tx=NUMBER`||
|广播交易提交|`broadcast_tx_commit?tx=NUMBER`||
|检查交易|`check_tx?tx=NUMBER`||


## ABCI API

|目的|路径|说明|
|---:|---:|---:|
|ABCI信息|`/abci_info`|返回一个简单的应用信息对象|
|ABCI信息|`/abci_query?path=VALUE&data=VALUE&height=VALUE&prove=BOLEAN`|获取特定信息，其中`path`和`data`为必选项|

## 广播

|目的|路径|说明|
|---:|---:|---:|
|ABCI信息|`/broadcast_evidence?evidence=JSON_EVIDENCE_encoded`|广播行为不当的证据|

[原文链接](http://localhost:8000/docs/tendermint/rpc)