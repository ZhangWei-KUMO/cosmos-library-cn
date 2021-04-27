const baseConfig = {
  logo: "https://redux.js.org/img/redux.svg",
  projectName: "COSMOS区块链知识库",
  homeUrl: "/getting-started-cn.html",
  library: "https://tutorials.cosmos.network/blog/tutorial/03-starport-type.html",
  library2: "https://docs.tendermint.com/",
  library3: "https://hub.cosmos.network/"
};

const themeConfig = {
  categoryOrder: {
    简介: 1,
    "COSMOS SDK 教程": 2,
    "COSMO Hub": 3,
    补充内容: 3
  },
  typeOrder: {
    基础教程: 2,
    高级教程: 3
  }
};

module.exports = { themeConfig, baseConfig };
