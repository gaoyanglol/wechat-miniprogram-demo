App({
  onLaunch: function () {
    wx.cloud.init({
      env: "yiyuansuifang-1giyjnmga2b444cb",
      traceUser: true
    })
    this.getOpenId()
  },
  getOpenId: function () {
    let that = this
    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        that.globalData.openid = res.result.openid
      }
    })
  },
  globalData: {
    openid: ""
  }
});