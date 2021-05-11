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
        db.collection('patient_list').add({
          data: {
            _id: openid,
            name: this.data.regName,
            age: this.data.regAge,
            type: this.data.type,
            gender: res.userInfo.gender,
            record: [
              {
                lcq_data: {},
                eortc_data: {},
                vas_data: {},
                time: new Date()
              }
            ]
          },
          success(res) {
            wx.setStorageSync('isRegistered', 1)
            wx.setStorageSync('openid', openid)
            wx.showLoading({
              title: '加载中',
            })
            setTimeout(function () {
              wx.hideLoading()
              wx.switchTab({
                url: '../../me/me'
              })
            }, 1000)
            
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