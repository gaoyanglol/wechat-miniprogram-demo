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
            
          }
        })
        wx.setStorageSync('openid', openid)
        
        // wx.navigateTo({
        //   url: '../../me/me',
        // })

        console.log(this.data)

      }
    })

  },
  radioChange: function(e) {
     this.setData({
       type: e.detail.value
     })
  }
})