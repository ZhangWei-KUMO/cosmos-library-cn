const APP_ID = "wxe290fb2c147e1302";

async function executeSdk(currentUrl) {
  const server = await fetch("/remote/api/getJsSdkTicket", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ currentUrl })
  });
  const sign = await server.json();
  wx.config({
    debug: false,
    appId: APP_ID,
    timestamp: sign.timestamp,
    nonceStr: sign.nonceStr,
    signature: sign.signature,
    jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"]
  });
  wx.getLocation({
    type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    success(res) {
      const { latitude } = res; // 纬度，浮点数，范围为90 ~ -90
      const { longitude } = res; // 经度，浮点数，范围为180 ~ -180。
      const { speed } = res; // 速度，以米/每秒计
      const { accuracy } = res; // 位置精度
    }
  });
}

export default executeSdk;
