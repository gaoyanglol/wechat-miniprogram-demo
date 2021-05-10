App({
  onLaunch: function () {
    wx.cloud.init({
      env: "yiyuansuifang-1giyjnmga2b444cb",
      traceUser: true
    })
    this.getOpenId()
  },
  getOpenId: function () {
    const db = wx.cloud.database()
    let that = this
    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        that.globalData.openid = res.result.openid
        db.collection('patient_list').where({
          _id: res.result.openid
        }).get({
          success: res => {
            that.globalData.isRegistered = res.data.length
            wx.setStorageSync('isRegistered', res.data.length)
          }
        })
      }
    })
  },
  globalData: {
    openid: ""
  }
});