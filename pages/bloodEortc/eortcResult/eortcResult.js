const db = wx.cloud.database()
const _ = db.command
const openid = wx.getStorageSync('openid')

Page({
  data: {
    pf: "",
    rf: "",
    ef: "",
    cf: "",
    sf: "",
    ql: "",
    fa: "",
    nv: "",
    pa: "",
    dy: "",
    sl: "",
    ap: "",
    co: "",
    di: "",
    fi: "",
    res: [],
    display: ""
  },
  onLoad: function (options) {
    let that = this
    let result = JSON.parse(options.res)
    let resInt = []

    db.collection('patient_list').doc(openid).get({
      success: res => {
        that.setData({
          type: res.data.type,
          record: res.data.record
        })
        if (wx.getStorageSync('openid') && that.data.type === 0) {
          that.setData({
            display: 'block'
          })
        } else {
          that.setData({
            display: 'none'
          })
        }
      }
    })

    result.forEach(function(item) {
      resInt.push(parseInt(item))
    })

    let pfRS = (resInt[0] + resInt[1] + resInt[2] + resInt[3] + resInt[4]) / 5
    let rfRS = (resInt[5] + resInt[6]) / 2
    let efRS = (resInt[20] + resInt[21] + resInt[22] + resInt[23]) / 4
    let cfRS = (resInt[19] + resInt[24]) / 2
    let sfRS = (resInt[25] + resInt[26]) / 2
    let qlRS = (resInt[28] + resInt[29]) / 2
    let faRS = (resInt[9] + resInt[11] + resInt[17]) / 3
    let nvRS = (resInt[13] + resInt[14]) / 2
    let paRS = (resInt[8] + resInt[18]) / 2
    let dyRS = resInt[7]
    let slRS = resInt[10]
    let apRS = resInt[12]
    let coRS = resInt[15]
    let diRS = resInt[16]
    let fiRS = resInt[27]

    this.setData({
      pf: this.standardScoreFunc(pfRS, 3).toFixed(2).toString(),
      rf: this.standardScoreFunc(rfRS, 3).toFixed(2).toString(),
      ef: this.standardScoreFunc(efRS, 3).toFixed(2).toString(),
      cf: this.standardScoreFunc(cfRS, 3).toFixed(2).toString(),
      sf: this.standardScoreFunc(sfRS, 3).toFixed(2).toString(),
      ql: this.standardScoreSymp(qlRS, 6).toFixed(2).toString(),
      fa: this.standardScoreSymp(faRS, 3).toFixed(2).toString(),
      nv: this.standardScoreSymp(nvRS, 3).toFixed(2).toString(),
      pa: this.standardScoreSymp(paRS, 3).toFixed(2).toString(),
      dy: this.standardScoreSymp(dyRS, 3).toFixed(2).toString(),
      sl: this.standardScoreSymp(slRS, 3).toFixed(2).toString(),
      ap: this.standardScoreSymp(apRS, 3).toFixed(2).toString(),
      co: this.standardScoreSymp(coRS, 3).toFixed(2).toString(),
      di: this.standardScoreSymp(diRS, 3).toFixed(2).toString(),
      fi: this.standardScoreSymp(fiRS, 3).toFixed(2).toString(),
      res: result
    })

  },
  standardScoreFunc: function(rawScore, range) {
    return (1 - (rawScore - 1) / range ) * 100
  },
  standardScoreSymp: function(rawScore, range) {
    return ((rawScore - 1) / range ) * 100
  },
  submitData: function(event) {

    let that = this
    let last_record = this.data.record[this.data.record.length - 1]
    
    db.collection('patient_list').doc(openid).get({
      success: res => {
        let last_record_temp = res.data.record[res.data.record.length - 1]
        let today = new Date().setHours(0,0,0,0)
        let last_record_day = last_record_temp.time.setHours(0,0,0,0)

        if (today === last_record_day) {
          //今天已填
          if (last_record_temp.eortc_data) {
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
                      'record.$.eortc_data': {
                        answer: that.data.res,
                        score: [that.data.pf, that.data.rf, that.data.ef, that.data.cf, that.data.sf, that.data.ql, that.data.fa, that.data.nv, that.data.pa, that.data.dy,that.data.sl, that.data.ap, that.data.co, that.data.di, that.data.fi]
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
                'record.$.eortc_data': {
                  answer: that.data.res,
                  score: [that.data.pf, that.data.rf, that.data.ef, that.data.cf, that.data.sf, that.data.ql, that.data.fa, that.data.nv, that.data.pa, that.data.dy,that.data.sl, that.data.ap, that.data.co, that.data.di, that.data.fi]
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
                eortc_data: {
                  answer: that.data.res,
                  score: [that.data.pf, that.data.rf, that.data.ef, that.data.cf, that.data.sf, that.data.ql, that.data.fa, that.data.nv, that.data.pa, that.data.dy,that.data.sl, that.data.ap, that.data.co, that.data.di, that.data.fi]
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