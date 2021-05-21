const db = wx.cloud.database()
const { formatTime } = require('../../utils/utils.js');

Page({

  data: {
    _num : 1
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
  recordToggle: function(e) {
    let that = this
    var index = e.currentTarget.dataset.index
    var _record = this.data.record
    _record[index].show = !_record[index].show || false
    this.setData({
      record: _record
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
            if(res.data.type === 1) {
              for (let i = 0 ; i < _record.length; i++) {
                _record[i].time = formatTime(_record[i].time)
              }
              that.setData({
                record: _record
              })
            }
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