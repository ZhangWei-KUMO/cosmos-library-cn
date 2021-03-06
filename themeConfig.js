const baseConfig = {
  logo: "https://self-1253763202.cos.ap-chengdu.myqcloud.com/app/cosmos-icon.png",
  projectName: "COSMOS区块链知识库",
  homeUrl: "/getting-started-cn.html",
  library: "https://tutorials.cosmos.network/blog/tutorial/03-starport-type.html",
  library2: "https://docs.tendermint.com/",
  library3: "https://hub.cosmos.network/"
};

const themeConfig = {
  categoryOrder: {
    StarPort: 0,
    Gaia: 1,
    "COSMOS SDK 教程": 2,
    IBC: 3,
    补充内容: 4,
    架构: 5,
    Tendermint: 6,
    faq: 7
  },
  typeOrder: {
    基础教程: 2,
    高级教程: 3
  }
};

module.exports = { themeConfig, baseConfig };
