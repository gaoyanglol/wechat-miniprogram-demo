const db = wx.cloud.database()

Page({
  data: {
  
  },

  onShow: function () {
    db.collection('patient_list').where({
      type: 1
    }).get({
      success: res => {
        this.setData({
          record: res.data
        })
      }
    })
  },
}) 