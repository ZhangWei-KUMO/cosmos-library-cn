// 分享给微信和QQ好友或群
export function updateAppMessageShareData(link, title, imgUrl, desc = "") {
  wx.ready(() => {
    wx.updateAppMessageShareData({
      title: `${title}- COSMOS区块链知识库`,
      desc,
      link,
      imgUrl: "https://self-1253763202.cos.ap-chengdu.myqcloud.com/app/cosmos-icon.png",
      success() {
        console.log("分享成功");
      }
    });
  });
}

// 分享朋友圈
export function updateTimelineShareData(link, title, imgUrl) {
  wx.ready(() => {
    wx.updateTimelineShareData({
      title: `${title} - COSMOS区块链知识库`,
      link,
      imgUrl: "https://self-1253763202.cos.ap-chengdu.myqcloud.com/app/cosmos-icon.png",
      success() {
        console.log("分享成功");
      }
    });
  });
}
