const db = wx.cloud.database()
const _ = db.command
var util = require('../../../utils/utils.js')

Page({
  data: {
    physical: "",
    psycho: "",
    social: "",
    total: "",
    res: [],
    display: "none"
  },
  onLoad: function (options) {
    let that = this
    let result = JSON.parse(options.res)
    let resInt = []
    
    db.collection('patient_list').doc(wx.getStorageSync('openid')).get({
      success: res => {
        that.setData({
          type: res.data.type,
          record: res.data.record
        })

        if (wx.getStorageSync('openid')) {
          if(that.data.type === 0) {
            that.setData({
              display: 'block'
            })
          } else {
            that.setData({
              display: 'none'
            })
          }
        } else {
          that.setData({
            display: 'none'
          })
        }
      },
      fail: res => {
        console.log(res)
      }
    })

    result.forEach(function(item) {
      resInt.push(parseInt(item))
    })

    let physicalInt = (resInt[0] + resInt[1] + resInt[2] + resInt[8] + resInt[9] + resInt[10] + resInt[13] + resInt[14]) / 8;
    let psychoInt = (resInt[3] + resInt[4] + resInt[5] + resInt[11] + resInt[12] + resInt[15] + resInt[16]) / 7;
    let socialInt = (resInt[6] + resInt[7] + resInt[17] + resInt[18]) / 4;
    let totalInt = physicalInt + psychoInt + socialInt;

    this.setData({
      physical: physicalInt.toFixed(2),
      psycho: psychoInt.toFixed(2),
      social: socialInt.toFixed(2),
      total: totalInt.toFixed(2),
      res: result,
    })

  },
  submitData: function(event) {
    const openid = wx.getStorageSync('openid')
    let that = this
    let last_record = this.data.record[this.data.record.length - 1]
    
    db.collection('patient_list').doc(openid).get({
      success: res => {
        let last_record_temp = res.data.record[res.data.record.length - 1]
        let today = new Date().setHours(0,0,0,0)
        let last_record_day = last_record_temp.time.setHours(0,0,0,0)

        if (today === last_record_day) {
          //今天已填
          if (last_record_temp.lcq_data) {
            wx.showModal({
              title: '提示',
              content: '您今天已经上传过结果，要覆盖当前记录吗？',
              success (res) {
                if (res.confirm) {
                  wx.showLoading({
                    title: '正在上传',
                  })
                  db.collection('patient_list').where({
                    _id: openid,
                    'record.time': last_record.time
                  }).update({
                    data: {
                      'record.$.lcq_data': {
                        answer: that.data.res,
                        score: [that.data.physical, that.data.psycho, that.data.social, that.data.total]
                      },
                      'record.$.time': new Date()
                    },
                    success: res => {
                      setTimeout(() => {
                        wx.hideLoading({
                          success: (res) => {
                            wx.showToast({
                              title: '上传成功！',
                              duration: 1000,
                              icon: 'success',
                              success: res => {
                                setTimeout(() => {
                                  wx.redirectTo({
                                    url: '../../lung/lung',
                                  })
                                }, 1000);
                                
                              }
                            })
                          },
                        })
                      }, 1000)
                      
                    }
                  })
                } else if (res.cancel) {
                  
                }
              }
            })
          } else {
            // 今天未填
            wx.showLoading({
              title: '正在上传',
            })
            db.collection('patient_list').where({
              _id: openid,
              'record.time': last_record.time
            }).update({
              data: {
                'record.$.lcq_data': {
                  answer: that.data.res,
                  score: [that.data.physical, that.data.psycho, that.data.social, that.data.total]
                },
                'record.$.time': new Date()
              },
              success: res => {
                setTimeout(() => {
                  wx.hideLoading({
                    success: (res) => {
                      wx.showToast({
                        title: '上传成功！',
                        duration: 1000,
                        icon: 'success',
                        success: res => {
                          setTimeout(() => {
                            wx.redirectTo({
                              url: '../../lung/lung',
                            })
                          }, 1000);
                          
                        }
                      })
                    },
                  })
                }, 1000)
              }
            })
          }
        } else {
          //新一天
          wx.showLoading({
            title: '正在上传',
          })
          db.collection('patient_list').doc(openid).update({
            data: {
              record: _.push({
                lcq_data: {
                  answer: that.data.res,
                  score: [that.data.physical, that.data.psycho, that.data.social, that.data.total]
                },
                time: new Date()
              })
            },
            success: res => {
              setTimeout(() => {
                wx.hideLoading({
                  success: (res) => {
                    wx.showToast({
                      title: '上传成功！',
                      duration: 1000,
                      icon: 'success',
                      success: res => {
                        setTimeout(() => {
                          wx.redirectTo({
                            url: '../../lung/lung',
                          })
                        }, 1000);
                        
                      }
                    })
                  },
                })
              }, 1000)
            }
          })
        }

      },
      fail: res => {
      }
    })
  }
})