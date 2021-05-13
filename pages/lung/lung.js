Page({
  data: {
    _num : 1
  },

  changeTab: function(event) {
    this.setData({
      _num: event.target.dataset.num
    })
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