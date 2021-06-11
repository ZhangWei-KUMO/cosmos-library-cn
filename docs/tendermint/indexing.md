---
category: Tendermint
order: 2
title: Indexing Transactions
---

Tendermint允许用户对交易和区块进行索引，已经订阅和查询与其相关的区块链交易结果。其中交易的索引是通过`TxResult.Events`，区块的索引是通过`Response(Begin|End)Block.Events`。

## 添加事件

开发者可以在Tendermint应用中自由定义想要索引的事件。接下来我们在DeliverTx方法中自定义事件。比如Bob支付给Alice一笔1000元劳务费去南京南站。我们需要给transfer这个对象定义四个字段：sender,recipient,balance,note,并且对这四个字段进行赋值。

```go
func (KVStoreApplication) DeliverTx(req abcitypes.RequestDeliverTx) abcitypes.ResponseDeliverTx {
+ events := []abci:Event{
+     {
+         Type:"transfer",
+         Attributes:[]abci:EventAttribute{
+             {Key: []byte("sender"), Value: []byte("Bob"), Index: true},
+             {Key: []byte("recipient"), Value: []byte("Alice"), Index: true},
+             {Key: []byte("balance"), Value: []byte("100"), Index: true},
+             {Key: []byte("note"), Value: []byte("Yi Bi Diao Zao"), Index: true},
+         }
+     }
+ }
- return abcitypes.ResponseDeliverTx{Code: 0}
+ return abcitypes.ResponseDeliverTx{Code: 0,Events: events}
}
```

> 在Index属性的设置上只要不设置为`null`都会被索引。

## 交易事件的请求

## 订阅交易

## 区块事件的请求