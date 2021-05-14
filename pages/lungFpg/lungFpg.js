const db = wx.cloud.database()
const _ = db.command
const openid = wx.getStorageSync('openid')
var debounce = require('../../utils/debounce.js')

Page({
  data: {

  },

  fpgStorage: debounce.debounce(function (e){
    console.log(e[0].detail.value)
  }, 1000)
})