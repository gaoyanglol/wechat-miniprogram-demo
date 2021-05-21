const db = wx.cloud.database()

Page({

  data: {

  },

  onLoad: function (options) {
    let that = this
    let _id = options.id
    db.collection('article_content').where({
      id: _id
    }).get({
      success: res => {
        let _res = res.data[0].content.replace(/\\n/g, '\n')
        that.setData({
          article: res.data[0],
          content: _res
        })
      }
    })
  }

})