const db = wx.cloud.database()

Component({
  data: {

  },
  methods: {
    onShow: function(e) {
      let that = this
      db.collection('article_list').get({
        success: res => {
          that.setData({
            articleList: res.data
          })
        }
      })
    },
    goToArticle: function(e) {
      let id = e.currentTarget.id
      wx.navigateTo({
        url: '../knowledge/article/article?id=' + id,
      })
    }
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  }
})
