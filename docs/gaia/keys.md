---
category: Gaia
order: 8
title: 密钥管理
---

```bash
# 查看当前拥有的密钥
gaiad keys list
# 查看当前节点的验证者公钥
gaiad tendermint show-validator
# 您需要一个账户私钥和公钥对（分别是 sk、pk）才能接收资金、发送 txs、债券 tx 等。 生成新的 secp256k1 密钥，比如账户名为hypatiad, 所谓account_name就是指钱包名称，
gaiad keys add hypatiad
# 输出内容如下
# - name: hypatiad
#  type: local
#  address: cosmos1g7z36hwyywrunnm0fh3pa260cq7a6skdt9pgl3
#  pubkey: cosmospub1addwnpepqvjf8puw48zmavn3egyrnhgp4elq6f5p7l7nq8xn3rgkkx5hyzdmxwqjgp3
#  mnemonic: ""
#  threshold: 0
#  pubkeys: []
# 下面的助记词是唯一找回账户的方式
# immune gossip squirrel tray bring crucial have laptop useful bulk happy plastic provide guitar rib foil casual decade affair paddle accuse list hover solution
gaiad keys add hypatiad --recover

# 输入您的私钥密码查询账户信息
gaiad keys show <account_name> 

```

## gaiad query命令系列

`gaiad query`命令行又称`gaiad q`,

|command|details|
|----:|---:|
| account                  |Query for account by address|
| auth                     |Querying commands for the auth module|
| bank                     |Querying commands for the bank module|
|  block                   | Get verified data for a the block at given height|
|  distribution             |Querying commands for the distribution module|
|  evidence                | Query for evidence by hash or for all (paginated) submitted evidence|
|  gov                     | Querying commands for the governance module|
|  ibc                     | Querying commands for the IBC module|
|  ibc-transfer            | IBC fungible token transfer query subcommands|
|  mint                    | Querying commands for the minting module|
|  params                  | Querying commands for the params module|
|  slashing                | Querying commands for the slashing module|
|  staking                 | Querying commands for the staking module|
|  tendermint-validator-set| Get the full tendermint validator set at given height|
|  tx                      | Query for a transaction by hash in a committed block|
|  txs                     | Query for paginated transactions that match a set of events|
|  upgrade                 | Querying commands for the upgrade module|

```bash
# 查询钱包的资金
gaiad query bank balances <钱包地址>
# - amount: "108000000"
#  denom: uatom
#  pagination:
#  next_key: null
```