Page({
  data: {
    items: [
      {value: '1', name: '1'},
      {value: '2', name: '2', selected: 'selected'},
      {value: '3', name: '3'},
      {value: '4', name: '4'},
      {value: '5', name: '5'},
      {value: '6', name: '6'},
      {value: '7', name: '7'},
      {value: '8', name: '8'},
      {value: '9', name: '9'},
      {value: '10', name: '10'},
    ]
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
    console.log(event)
  }

})