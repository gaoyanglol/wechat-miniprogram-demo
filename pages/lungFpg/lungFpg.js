const db = wx.cloud.database()
const _ = db.command
const openid = wx.getStorageSync('openid')
var debounce = require('../../utils/debounce.js')

Page({
  data: {
    fpg_data: "",
    breakfast_data: "",
    lunch_data: "",
    dinner_data: ""
  },

  onShow: function(event) {
    this.setData({
      fpg_data: wx.getStorageSync('fpg_temp'),
      breakfast_data: wx.getStorageSync('breakfast_temp'),
      lunch_data: wx.getStorageSync('lunch_temp'),
      dinner_data: wx.getStorageSync('dinner_temp')
    })
  },

  fpgStorage: debounce.debounce(function (e){
    wx.setStorageSync('fpg_temp', e[0].detail.value)
  }, 1000),
  breakfastStorage: debounce.debounce(function (e){
    wx.setStorageSync('breakfast_temp', e[0].detail.value)
  }, 1000),
  lunchStorage: debounce.debounce(function (e){
    wx.setStorageSync('lunch_temp', e[0].detail.value)
  }, 1000),
  dinnerStorage: debounce.debounce(function (e){
    wx.setStorageSync('dinner_temp', e[0].detail.value)
  }, 1000)
})