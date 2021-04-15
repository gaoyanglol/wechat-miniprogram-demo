Page({
  onLoad(options) {
    console.log("接收的id",options)
  },
  data: {
    _num : 1
  },
  changeTab: function(event) {
    this.setData({
      _num: event.target.dataset.num
    })
  }
})