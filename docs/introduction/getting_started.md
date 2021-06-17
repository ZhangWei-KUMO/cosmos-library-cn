---
category: StarPort
order: 1
title: 开始
---

![](https://img.shields.io/badge/go-v1.16.5-blue)
![](https://img.shields.io/badge/starpot-v0.15.1-green)

很多开源框架为了开发者拥有更好的开发效率都会提供一键启动的脚手架工具，cosmos也不例外。Cosmos的脚手架名为Starport，开发者可以通过它生成空项目、转账、启动IBC协议等功能，下面就是它的功能列表

|命令行|功能|解释|
|---:|---:|---:|
|`starport app [APP_ADDRESS]`|生成一个空应用|starport自身集成了一些简单的应用模板，如：starport app github.com/alice/blog|
|`starport build`|构建和安装一个应用以及相关依赖||
|`starport faucet`|生成一个空应用||
|`starport message`|生成一个空消息||
|`starport module`|为当前应用管理cosmos||
|`starport packet`|创建一个IBC数据包||
|`starport relayer configure`|为中继服务配置目标链和源链||
|`starport relayer connect`|为中继服务配置目标链和源链||
|`starport relayer rly`|非常底层的命令配置，一般不用。详情：github.com/cosmos/relayer||
|`starport type`|生成一个CRUD类型||
|`starport version`|查看starport版本号||
|`starport help`|查看帮助列表||

## 安装 Starport

```bash
curl https://get.starport.network/starport! | bash
```