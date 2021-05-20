const db = wx.cloud.database()
const { formatTime } = require('../../utils/utils.js');

Page({
  data: {
    _num : 1,
    toggle: false
  },

  onLoad: function(e) {
    if(e.display === 'false') {
      const openid = wx.getStorageSync('openid')
      let that = this
      this.setData({
        display: false,
        _num: 2
      })
      db.collection('patient_list').doc(openid).get({
        success: res => {
          let _record = res.data.record
          for (let i = 0 ; i < _record.length; i++) {
            _record[i].time = formatTime(_record[i].time)
          }
          that.setData({
            record: _record
          })
        },
        fail: res => {
          console.log(res)
        }
      })
    } else {
      this.setData({
        display: true
      })
    }
  },
  recordFold: function(e) {
  },
  recordToggle: function(e) {
    this.setData({
      toggle: !this.data.toggle
    })
  },
  changeTab: function(event) {
    const openid = wx.getStorageSync('openid')
    let that = this
    this.setData({
      _num: event.target.dataset.num
    })
    switch (this.data._num) {
      case "1":
        this.setData({
          display: true
        })
        break
      case "2":
        this.setData({
          display: false
        })
        db.collection('patient_list').doc(openid).get({
          success: res => {
            let _record = res.data.record
            for (let i = 0 ; i < _record.length; i++) {
              _record[i].time = formatTime(_record[i].time)
            }
            that.setData({
              record: _record
            })
          },
          fail: res => {
            console.log(res)
          }
        })
    }
    
  },
  goForm: function(event) {
    switch (event.currentTarget.dataset.form) {
      case "1":
        wx.redirectTo({
          url: '/pages/bloodVas/bloodVas',
        })
        break
      case "2":
        wx.redirectTo({
          url: '/pages/bloodLcq/bloodLcq',
        })
        break
      case "3":
        wx.redirectTo({
          url: '/pages/bloodEortc/bloodEortc',
        })
        break
    }
  }
})