const db = wx.cloud.database()
const { formatTime } = require('../../utils/utils.js');

Page({
  data: {
    _num : 1,
    display: true
  },

  changeTab: function(event) {
    this.setData({
      _num: event.target.dataset.num
    })
    switch (this.data._num) {
      case "1":
        this.setData({
          display: true
        })
        break
      case "2":
        this.setData({
          display: false
        })
        
    }
  },
  goForm: function(event) {
    switch (event.currentTarget.dataset.form) {
      case "1":
        wx.redirectTo({
          url: '/pages/bloodVas/bloodVas',
        })
        break
      case "2":
        wx.redirectTo({
          url: '/pages/bloodLcq/bloodLcq',
        })
        break
      case "3":
        wx.redirectTo({
          url: '/pages/bloodEortc/bloodEortc',
        })
        break
    }
  }
})