const db = wx.cloud.database()
const { formatTime } = require('../../../utils/utils.js');

Page({
  data: {
    hide_left: false
  },

  onShow: function (event) {
    let that = this
    db.collection('patient_list').where({
      type: 0
    }).get({
      success: res => {
        let _record = res.data
        for (let i = 0; i < _record.length; i++) {
          let ind = _record[i]
          for (let j = 0; j <ind.record.length; j++) {
            ind.record[j].time = formatTime(ind.record[j].time)
          }
        }
        that.setData({
          record: _record
        })
      }
    })
  },
  goDetail: function(e) {
    let index = e.currentTarget.dataset.index
    let _record = this.data.record
    _record[index].detail = true
    this.setData({
      record: _record,
      hide_left: true
    })
  },
  goList: function(event) {
    let _record = this.data.record
    for(let i = 0; i < _record.length; i++) {
      _record[i].detail = false
      for(let j = 0; j < _record[i].record.length; j++) {
        _record[i].record[j].show = false
      }
    }
    this.setData({
      record: _record,
      hide_left: false
    })
  },
  catchToggle: function(e) {
   let _record = this.data.record
   let upIndex = e.currentTarget.dataset.index
   let lowIndex = e.target.dataset.index
   _record[upIndex].record[lowIndex].show = !_record[upIndex].record[lowIndex].show || false
   this.setData({
     record: _record
   })
  }
})