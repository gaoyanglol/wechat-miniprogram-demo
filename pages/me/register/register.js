const db = wx.cloud.database()
Page({
  data: {
    regName: "",
    regAge: "",
    type: ""
  },
  register: function() {
    let openid = getApp().globalData.openid
    wx.getUserProfile({
      desc: '仅获取您的公开信息用于资料显示', 
      success: (res) => {
        db.collection('patient_list').where({
          _id: openid
        }).update({
          data: {
            name: this.data.regName,
            age: this.data.regAge,
            type: this.data.type,
            gender: res.userInfo.gender,
            record: ""
          },
          success(res) {
            wx.setStorageSync('openid', openid)
            wx.showLoading({
              title: '加载中',
            })
            setTimeout(function () {
              wx.hideLoading()
              wx.switchTab({
                url: '../../me/me?isLogin='
              })
            }, 2000)
            
          }
        })
      
      }
    })

  },
  radioChange: function(e) {
     this.setData({
       type: parseInt(e.detail.value)
     })
  }
})