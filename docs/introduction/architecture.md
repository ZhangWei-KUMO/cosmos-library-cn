---
category: StarPort
order: 4
title: 存储文件夹的架构
---

在文件夹中文本架构如下：

```bash
-- config
|--- addrbook.json
|--- node_key.json
|--- app.toml
|--- comfig.toml
|--- genesis.json
|--- priv_validator_key.json
|--- gentx
   |--- gentx-object
|--- write-file-atomic-[NUMBERS]
-- data
|--- application.db
|--- blockstore.db
|--- cs.wal
|--- evidence.db
|--- priv_validator_state.json
|--- snapshots
|--- state.db
|--- tx_index.db
```

## Private Validator State

在`data`文件夹中最重要的是`priv_validator_state.json`,其字段如下：

|name|type|details|
|--:|--:|--:|
|height|Number String|区块高度|
|round|Number|区块高度|
|step|Number|区块高度|
|signature|String||
|signbytes|String||

## Private Validator Key

私有验证密钥位于` priv_validator_key.json`,其数据结构如下：

```json
{
  "address": "",
  "pub_key": {
    "type": "tendermint/PubKeyEd25519",
    "value": ""
  },
  "priv_key": {
    "type": "tendermint/PrivKeyEd25519",
    "value": ""
  }
}
```

### addrbook.json

```json
{
    "key": "c378869cf8f6179572dd1cd2",
    "addrs": []
}
```

## P2P 设置

