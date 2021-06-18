---
category: StarPort
order: 3
title: 如何使用您的自定义命令行
---

在上一章的时候我们创建了一个`hypatiad` 的区块链deamon，那么我们如何将其运用的得心应手呢.

```bash
# 指定一个新的配置文件，这种情况往往是在同一台机器上跑两条区块链时使用
starport serve --config xxxx.yml
# 重置您的区块链
starport serve --reset-once
# 文件一更改区块链立即重置
starport serve --force-reset
# 自定义存储文件夹
starport serve --home ~/.xxxx
```

## 生产环境中启动区块链节点

`starport serve`是开发环境中所使用的命令行，它用于帮我们快速生成一个区块链。但是在生产环境中我们并不使用它。在生产环境我们使用原生区块链命令行,在本教程中为`hypatiad start`运行全节点区块链，

如果我们使用后台启动的话为`nohup hypatiad start &`,`ps -ef`查看后台运行，使用`kill [PID]`关闭后台。

若使用systemctl方式运行，请点击[查看](https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units)