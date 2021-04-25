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
        wx.navigateTo({
          url: '/pages/bloodVas/bloodVas',
        })
        break
      case "2":
        wx.navigateTo({
          url: '/pages/bloodLcq/bloodLcq',
        })
        break
      case "3":
        wx.navigateTo({
          url: '/pages/bloodEortc/bloodEortc',
        })
        break
    }
  }
})