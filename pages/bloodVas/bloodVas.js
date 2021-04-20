Page({
  data: {
    items: [
      {value: '1', name: '1'},
      {value: '2', name: '2'},
      {value: '3', name: '3'},
      {value: '4', name: '4'},
      {value: '5', name: '5'},
      {value: '6', name: '6'},
      {value: '7', name: '7'},
      {value: '8', name: '8'},
      {value: '9', name: '9'},
      {value: '10', name: '10'},
    ],
    chosenNum : "",
    disabled: true
  },
  preview: function(event) {
    console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: ["https://first-aid-man.gitbooks.io/pocket-book-abc/content/assets/vas-tengtong.png"] // 需要预览的图片http链接列表
    })
  },
  changeTab: function(event) {
    let arr = this.data.items
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i].value === event.currentTarget.dataset.value) {
        arr[i].selected = "selected"
        this.data.chosenNum = arr[i].value
      } else {
        arr[i].selected = ""
      }
    }
    this.data.disabled = false
    this.setData({
      items: arr,
      chosenNum: this.data.chosenNum,
      disabled: this.data.disabled
    })
  }
})