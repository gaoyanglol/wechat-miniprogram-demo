Page({
  data: {
    _num : 1
  },
  onLoad(options) {
    console.log("接收的id",options)
  },
  changeTab: function(event) {
    console.log(event)
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
    }
  }
})