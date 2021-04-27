const express = require("express");
const fetch = require("isomorphic-unfetch");

// 下面ACCESS_TOKEN需要从 https://cloud-wave.cn/remote/api/relay/access_token 动态获取
const ACCESS_TOKEN = "44_WmLLHF_EKwWa63KeuauZyoXAhd9k-77bVlUhSoQJYTeTCQ-D0E2ZTDDg4q819Ty6cY-xYbtU2PjtpyOmwJ7VPt5eS2uLGULiUv2wuuG8bYjXKOeIK8p8ZOrLB2_THkiYVR2zYBDe9fRUJwdoOZXbAEASDB";

const server = express();
// 自定义菜单接口
async function Get() {
  try {
    const obj = {
      button: [
        {
          type: "view",
          name: "Cosmos中文",
          url: "https://cosmos.cloud-wave.cn",
          key: "V1001_TODAY_COSMOS"
        },
        {
          type: "miniprogram",
          name: "科普视频",
          pagepath: "pages/index/index",
          url: "https://cloud-wave.cn",
          appid: "wx9014a851767a3d44",
          key: "V1001_TODAY_MINI"
        },
        {
          name: "技术沙龙",
          sub_button: [
            {
              type: "view",
              name: "日常博客",
              url: "https://cloud-wave.cn/agora"
            },
            {
              type: "view",
              name: "Redux中文文档",
              url: "https://cloud-wave.cn/redux/docs/introduction/getting_started"
            },
            {
              type: "view",
              name: "React源码解析",
              url: "https://cloud-wave.cn/react-source/docs/introduction/getting_started"
            }
          ]
        }]
    };

    const URL = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${ACCESS_TOKEN}`;
    const wechatServer = await fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });
    const back = await wechatServer.json();
    console.log(back);
  } catch (e) {
    throw new Error(e.toString());
  }
}

Get();
process.on("uncaughtException", (err) => {
  console.log(err);
});

module.exports = server;
