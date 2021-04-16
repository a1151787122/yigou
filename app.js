// app.js
App({
  onLaunch() {
    // 云端初始化
    wx.cloud.init({
      env: 'cloud-miniprograming-7bi974e03dc' //测试环境id
    })
  },
  globalData: {
    userInfo: null
  }
})
