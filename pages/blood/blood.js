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
          url: '/pages/lungFpg/lungFpg',
        })
        break
      case "2":
        wx.redirectTo({
          url: '/pages/lungMeta/lungMeta',
        })
        break
    }
  }
})