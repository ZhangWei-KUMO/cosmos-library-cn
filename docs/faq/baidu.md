---
category: faq
order: 1
title: SEO搜索引擎优化的几点
---

1. 企业网站避免使用动态DOM，因为国产搜索引擎只爬取HTML，并不处理JavaScript；
2. 搜索引擎排名优先级的HTTP协议优先级：HTTP2>HTTPS>HTTP；
3. 网站需要在根目录中安装各家搜索引擎的私钥证书；
4. 主动向搜索引擎提交url的几种方式
   
## 动态网站针对搜索引擎的改造解决方案

如今大部分的前端框架由于出于性能和负载均衡的考量，一般会在`CLI generator`这样的命令行工具中优先集成`virtual DOM`选项，但是这种技术栈的缺陷主要有两个问题:大型项目的首屏渲染速度慢，国内搜索引擎爬虫无法抓取内容。一般有以下几种解决方案：

1. 在静态服务器上添加site proxy，引导爬虫爬取代理信息；
2. 重构现有网站架构；
3. 首页与新闻页面另立`static page`项目挂载到子路由上；

因为考虑到`site proxy`后续维护成本和重构现有网站架构的开发成本。针对搜索引擎优化做`static page`是一个较为敏捷且节省成本的方案。目前业界比较流行的技术栈有：[vuePress](https://vuepress.vuejs.org/),[react-static](https://github.com/react-static/react-static)。

考虑到我司的前端技术栈为Vue，这里我以vuePress为例，它内部集成了blog，medium，google analytics等专门针对新闻类搜索引擎的页面优化插件。对于我司新闻类页面的优化有着较强的针对性，也减少了开发成本。

## 搜索引擎的提交

考虑到百度搜索占我国搜索引擎80%的市场份额，这里以百度搜索资源平台为例。首先在百度搜索框输入：site:bianjie.ai。反馈结果只有两个域名和一个页面。说明百度爬虫忽视了我司绝大部分内容，其余页面对于搜索引擎来说均为无效页面。

### 找到问题点

第一步：打开[百度控制台](https://ziyuan.baidu.com/dashboard/index?site=https://console.cloud-wave.cn/)；
第二步：HTTPS验证，提高网站在搜索引擎中安全性权重；
第三步：URL提交

### URL提交的三种方式

1. 脚本API提交；
2. sitemap提交；
3. 手动提交

### 优化检查

基于google和百度工具挨个玩一遍。