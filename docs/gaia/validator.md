---
category: Gaia
order: 7
title: 在主网上运行一个验证节点
---

> 英文原版名称《Run a Validator on the Cosmos Hub Mainnet》

在确认您的gaiad一切准备就绪后，首先查看您的公钥（pubkey），输入命令行如下:

```bash
# 输出节点公钥
gaiad tendermint show-validator
yvq03e4sghwyweg85dp05lctyr5dgssejgq3wq9jduepq3pskfsdaeg85dp05lct
```

```bash
gaiad tx staking create-validator \
  --amount="1uatom" \
  --pubkey=yvq03e4sghwyweg85dp05lctyr5dgssejgq3wq9jduepq3pskfsdaeg85dp05lct \
  --moniker="hypatiad" \
  --chain-id=cosmoshub-4 \
  --commission-rate="0.10" \
  --commission-max-rate="0.20" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="1" \
  --gas="auto" \
  --gas-prices="0.025uatom" \
  --from=cosmos1g7z36hwyywrunnm0fh3pa260cq7a6skdt9pgl3 \
  --details="Elon Mask's stuff of software developing center" \
  --website="https://cloud-wave.cn"
```

