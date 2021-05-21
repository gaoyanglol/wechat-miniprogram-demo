const db = wx.cloud.database()

Page({

  data: {

  },

  onLoad: function (options) {
    let _id = options.id
    db.collection('article_content').where({
      id: _id
    }).get({
      success: res => {
        res.data[0].content.raplace('\\n','\n')
        
        console.log(res.data[0].content.raplace('\\n','\n'))
        
      }
    })
  }

})