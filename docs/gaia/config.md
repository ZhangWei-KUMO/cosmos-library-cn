---
category: Gaia
order: 4
title: app.toml配置文件
---

通过app.toml配置文件的了解，我们可以清楚地知道gaia内部的配置。

```bash
# This is a TOML config file.
# For more information, see https://github.com/toml-lang/toml

###############################################################################
###                           Base Configuration  基础配置                   ###
###############################################################################

# The minimum gas prices a validator is willing to accept for processing a
# transaction. A transaction's fees must meet the minimum of any denomination
# specified in this config (e.g. 0.25token1;0.0001token2).
minimum-gas-prices = ""

# default: the last 100 states are kept in addition to every 500th state;每10个区块修剪一次
# nothing: 所有的state都会被存储且不会被删除 (i.e. archiving node)
# everything: 所有的历史state都会被删除，只留最新的state; 每10个区块修剪一次
# custom: 开启自定义后下面三个选项可以自行配置
pruning = "default"

# custom自定义配置
pruning-keep-recent = "0"
pruning-keep-every = "0"
pruning-interval = "0"

# HaltHeight contains a non-zero block height at which a node will gracefully
# halt and shutdown that can be used to assist upgrades and testing.
#
# Note: Commitment of state will be attempted on the corresponding block.
halt-height = 0

# HaltTime contains a non-zero minimum block time (in Unix seconds) at which
# a node will gracefully halt and shutdown that can be used to assist upgrades
# and testing.
#
# Note: Commitment of state will be attempted on the corresponding block.
halt-time = 0

# MinRetainBlocks defines the minimum block height offset from the current
# block being committed, such that all blocks past this offset are pruned
# from Tendermint. It is used as part of the process of determining the
# ResponseCommit.RetainHeight value during ABCI Commit. A value of 0 indicates
# that no blocks should be pruned.
#
# This configuration value is only responsible for pruning Tendermint blocks.
# It has no bearing on application state pruning which is determined by the
# "pruning-*" configurations.
#
# Note: Tendermint block pruning is dependant on this parameter in conunction
# with the unbonding (safety threshold) period, state pruning and state sync
# snapshot parameters to determine the correct minimum value of
# ResponseCommit.RetainHeight.
min-retain-blocks = 0

# InterBlockCache enables inter-block caching.
inter-block-cache = true

# IndexEvents defines the set of events in the form {eventType}.{attributeKey},
# which informs Tendermint what to index. If empty, all events will be indexed.
#
# Example:
# ["message.sender", "message.recipient"]
index-events = []

###############################################################################
###                         Telemetry Configuration                         ###
###############################################################################

[telemetry]

# Prefixed with keys to separate services.
service-name = ""

# Enabled enables the application telemetry functionality. When enabled,
# an in-memory sink is also enabled by default. Operators may also enabled
# other sinks such as Prometheus.
enabled = false

# Enable prefixing gauge values with hostname.
enable-hostname = false

# Enable adding hostname to labels.
enable-hostname-label = false

# Enable adding service to labels.
enable-service-label = false

# PrometheusRetentionTime, when positive, enables a Prometheus metrics sink.
prometheus-retention-time = 0

# GlobalLabels defines a global set of name/value label tuples applied to all
# metrics emitted using the wrapper functions defined in telemetry package.
#
# Example:
# [["chain_id", "cosmoshub-1"]]
global-labels = [
]

###############################################################################
###                           API Configuration                             ###
###############################################################################

[api]

# Enable defines if the API server should be enabled.
enable = false

# Swagger defines if swagger documentation should automatically be registered.
swagger = false

# Address defines the API server to listen on.
address = "tcp://0.0.0.0:1317"

# 最大连接数
max-open-connections = 1000

# tendermint远程调接口的读取超时时长（单位为秒）
rpc-read-timeout = 10

# tendermint远程调接口的写入超时时长（单位为秒）
rpc-write-timeout = 0

#  tendermint远程调接口body最大尺寸(单位：bytes)
rpc-max-body-bytes = 1000000

# EnableUnsafeCORS defines if CORS should be enabled (unsafe - use it at your own risk).
enabled-unsafe-cors = false

###############################################################################
###                           gRPC Configuration                            ###
###############################################################################

[grpc]

# Enable defines if the gRPC server should be enabled.
enable = true

# Address defines the gRPC server address to bind to.
address = "0.0.0.0:9090"

###############################################################################
###                        State Sync Configuration                         ###
###############################################################################

# State sync snapshots allow other nodes to rapidly join the network without replaying historical
# blocks, instead downloading and applying a snapshot of the application state at a given height.
[state-sync]

# snapshot-interval specifies the block interval at which local state sync snapshots are
# taken (0 to disable). Must be a multiple of pruning-keep-every.
snapshot-interval = 0

# snapshot-keep-recent specifies the number of recent snapshots to keep and serve (0 to keep all).
snapshot-keep-recent = 2