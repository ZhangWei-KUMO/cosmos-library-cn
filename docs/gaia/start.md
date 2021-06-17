---
category: Gaia
order: 0
title: 开始
---

![](https://img.shields.io/badge/Gaia-v4.2.1-yellowgreen)
![](https://img.shields.io/badge/go-v1.16.5-blue)
![](https://img.shields.io/badge/ubuntu-v16.4-blue)


Gaia是首个Cosmos Hub的实例，也是Cosmos主网。在加入Cosmos主网前您可能需要知道几个基础知识：

1. Cosmos的代币为ATOM，俗称阿童木；
2. 在目前的Cosmos的主网中有125个验证者节点，持币者可以委托这些节点在PoS机制中赚取利润。
3. 支持Cosmos的钱包有很多，在中国的话建议使用Rainbow
4. 支持Cosmos的区块链浏览器web应用也很多，本文推荐[mintscan](https://www.mintscan.io/iris/validators)
5. cosmos全功能命令行工具为`gaiad`

## 环境部署

一般我们建议使用香港服务器ubuntu16.4系统，首先我们安装go语言包：

```bash
# 下载压缩包
wget https://golang.org/dl/go1.16.5.linux-amd64.tar.gz
# 清除旧有go包
sudo rm -rf /usr/local/go
# 安装到/usr/local文件夹
sudo tar -C /usr/local -xzf go1.16.5.linux-amd64.tar.gz
```

将环境变量暴露在`$HOME/.bash_profile`:

```bash
export PATH=$PATH:$HOME/go/bin
```
保存

```bash
source ~/.bash_profile
```

退出bash，输入`go version`即可。

## 安装Gaia

```bash
# 墙外
git clone -b v4.2.1 https://github.com/cosmos/gaia
# 墙外
git clone -b v4.2.1 git@git.zhlh6.cn:cosmos/gaia.git
cd gaia && make install
```

## Quickstart

初始化gaiad, 此时节点会有一个节目名称，并完成自动配置。

```bash
gaiad init <MONIKER_NAME>
```

```go
{"app_message":{
    "auth":{
        "accounts":[],
        "params":{
            "max_memo_characters":"256",
            "sig_verify_cost_ed25519":"590",
            "sig_verify_cost_secp256k1":"1000",
            "tx_sig_limit":"7",
            "tx_size_cost_per_byte":"10"
            }
        },
        "bank":{
            "balances":[],
            "denom_metadata":[],
            "params":{
                "default_send_enabled":true,
                "send_enabled":[]
                },
                "supply":[]
                },
                "capability":{
                    "index":"1",
                    "owners":[]
                    },
                "crisis":{
                    "constant_fee":{
                        "amount":"1000",
                        "denom":"stake"
                        }
                    },
                    "distribution":{
                        "delegator_starting_infos":[],
                        "delegator_withdraw_infos":[],
                        "fee_pool":{
                            "community_pool":[]
                        },
                        "outstanding_rewards":[],
                        "params":{
                            "base_proposer_reward":"0.010000000000000000",
                            "bonus_proposer_reward":"0.040000000000000000",
                            "community_tax":"0.020000000000000000",
                            "withdraw_addr_enabled":true
                        },
                        "previous_proposer":"",
                        "validator_accumulated_commissions":[],
                        "validator_current_rewards":[],
                        "validator_historical_rewards":[],
                        "validator_slash_events":[]
                        },
                        "evidence":{
                            "evidence":[]
                        },
                        "genutil":{
                            "gen_txs":[]
                        },
                        "gov":{
                            "deposit_params":{
                                "max_deposit_period":"172800s",
                                "min_deposit":[
                                    {"amount":"10000000","denom":"stake"}
                                ]
                            },
                            "deposits":[],
                            "proposals":[],
                            "starting_proposal_id":"1",
                            "tally_params":{
                                "quorum":"0.334000000000000000",
                                "threshold":"0.500000000000000000",
                                "veto_threshold":"0.334000000000000000"
                            },
                                "votes":[],
                                "voting_params":{
                                    "voting_period":"172800s"
                                }
                            },"ibc":{
                                "channel_genesis":{
                                    "ack_sequences":[],
                                    "acknowledgements":[],
                                    "channels":[],
                                    "commitments":[],
                                    "next_channel_sequence":"0",
                                    "receipts":[],
                                    "recv_sequences":[],
                                    "send_sequences":[]
                                },
                                "client_genesis":{
                                    "clients":[],
                                    "clients_consensus":[],
                                    "clients_metadata":[],
                                    "create_localhost":false,
                                    "next_client_sequence":"0",
                                    "params":{
                                        "allowed_clients":["06-solomachine","07-tendermint"]}},"connection_genesis":{
                                            "client_connection_paths":[],
                                            "connections":[],
                                            "next_connection_sequence":"0"
                                            }
                                        },
                                        "mint":{
                                            "minter":{
                                                "annual_provisions":"0.000000000000000000",
                                                "inflation":"0.130000000000000000"
                                            },"params":{
                                                "blocks_per_year":"6311520",
                                                "goal_bonded":"0.670000000000000000",
                                                "inflation_max":"0.200000000000000000",
                                                "inflation_min":"0.070000000000000000","inflation_rate_change":"0.130000000000000000","mint_denom":"stake"
                                                }
                                            },
                                            "params":null,
                                            "slashing":{
                                                "missed_blocks":[],
                                                "params":{
                                                    "downtime_jail_duration":"600s",
                                                    "min_signed_per_window":"0.500000000000000000","signed_blocks_window":"100","slash_fraction_double_sign":"0.050000000000000000","slash_fraction_downtime":"0.010000000000000000"
                                                },
                                                "signing_infos":[]
                                            },
                                            "staking":{
                                                "delegations":[],
                                                "exported":false,
                                                "last_total_power":"0",
                                                "last_validator_powers":[],
                                                "params":{
                                                    "bond_denom":"stake",
                                                    "historical_entries":10000,
                                                    "max_entries":7,
                                                    "max_validators":100,
                                                    "unbonding_time":"1814400s"
                                                },
                                                "redelegations":[],
                                                "unbonding_delegations":[],
                                                "validators":[]
                                            },
                                            "transfer":{
                                                "denom_traces":[],
                                                "params":{
                                                    "receive_enabled":true,
                                                    "send_enabled":true
                                               },
                                               "port_id":"transfer"
                                               },"upgrade":{},
                                               "vesting":{}
                                            },
                                            "chain_id":"test-chain-TzenhQ",
                                            "gentxs_dir":"",
                                            "moniker":"chooseanicehandle","node_id":"21cf7dad8855c15d00623ed0dadfffd764ee4e2e"
}
```

成功后，会生成`genesis.json`,相关配置文件位于`$HOME/.gaia/config/`。对于`gaia init`命令行其实还有flags帮助开发者更加灵活的配置节点。比如：

```bash
# 比如我们将区块链的id取名hefei-chain
gaiad init first --chain-id hefei-chain
# 对于已有的genesis.json我们也可以复写
gaiad init second --overwrite
# 更多flags请输入
gaiad init -h
```

启动gaia主网连接

```bash
gaiad start
## 当然您可能会遇到以下报错
## Error: error during handshake: error on replay: validator set is nil in genesis and still empty after InitChain
# 清除历史记录
gaiad unsafe-reset-all
rm /home/ubuntu/.gaia/config/genesis.json
```

## Gas&Fees

在

## state修剪

对于`pruning`参数的调整，