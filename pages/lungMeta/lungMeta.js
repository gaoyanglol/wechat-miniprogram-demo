const db = wx.cloud.database()
const _ = db.command
var debounce = require('../../utils/debounce.js')

Page({
  data: {
    glu_data: "",
    tc_data: "",
    tg_data: "",
    hdlc_data: "",
    ldlc_data: "",
    gluStatus: "",
    tcStatus: "",
    tgStatus:"",
    hdlcStatus:"",
    ldlcStatus:"",
    display: "none"
  },
  onLoad: function(options) {
    let that = this
    db.collection('patient_list').doc(wx.getStorageSync('openid')).get({
      success: res => {
        that.setData({
          type: res.data.type,
          record: res.data.record
        })

        if (wx.getStorageSync('openid')) {
          if(that.data.type === 1) {
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
  },
  onShow: function(event) {
    let glu = wx.getStorageSync('glu_temp') && wx.getStorageSync('glu_temp') !== ""  ? '../../image/check.svg' : ''
    let tc = wx.getStorageSync('tc_temp') && wx.getStorageSync('tc_temp') !== ""  ? '../../image/check.svg' : ''
    let tg = wx.getStorageSync('tg_temp') && wx.getStorageSync('tg_temp') !== ""  ? '../../image/check.svg' : ''
    let hdlc = wx.getStorageSync('hdlc_temp') && wx.getStorageSync('hdlc_temp') !== "" ? '../../image/check.svg' : ''
    let ldlc = wx.getStorageSync('ldlc_temp') && wx.getStorageSync('ldlc_temp') !== "" ? '../../image/check.svg' : ''
    this.setData({
      glu_data: wx.getStorageSync('glu_temp'),
      tc_data: wx.getStorageSync('tc_temp'),
      tg_data: wx.getStorageSync('tg_temp'),
      hdlc_data: wx.getStorageSync('hdlc_temp'),
      ldlc_data: wx.getStorageSync('ldlc_temp'),
      gluStatus: glu,
      tcStatus: tc,
      tgStatus: tg,
      hdlcStatus: hdlc,
      ldlcStatus: ldlc
    })
  },
  statusIcon: function(event) {
    this.setData({
      [event]: "../../image/loading.gif"
    })
    setTimeout(()=>{
      this.setData({
        [event]: "../../image/check.svg"
      })
    }, 500)

  },

  gluStorage: debounce.debounce(function (e){
    wx.setStorageSync('glu_temp', e[0].detail.value)
    if (e[0].detail.value !== "") {
      this.statusIcon('gluStatus')
      this.setData({
        glu_data: e[0].detail.value
      })
    } else {
      this.setData({
        glu_data: "",
        gluStatus: ""
      })
    }
  }, 300),
  tcStorage: debounce.debounce(function (e){
    wx.setStorageSync('tc_temp', e[0].detail.value)
    if (e[0].detail.value !== "") {
      this.statusIcon('tcStatus')
      this.setData({
        tc_data: e[0].detail.value
      })
    } else {
      this.setData({
        tc_data: "",
        tcStatus: ""
      })
    }
   
  }, 300),
  tgStorage: debounce.debounce(function (e){
    wx.setStorageSync('tg_temp', e[0].detail.value)
    if (e[0].detail.value !== "") {
      this.statusIcon('tgStatus')
      this.setData({
        tg_data: e[0].detail.value
      })
    } else {
      this.setData({
        tg_data: "",
        tgStatus: ""
      })
    }
    
  }, 300),
  hdlcStorage: debounce.debounce(function (e){
    wx.setStorageSync('hdlc_temp', e[0].detail.value)
    if (e[0].detail.value !== "") {
      this.statusIcon('hdlcStatus')
      this.setData({
        hdlc_data: e[0].detail.value
      })
    } else {
      this.setData({
        hdlc_data: "",
        hdlcStatus: ""
      })
    }
    
  }, 300),
  ldlcStorage: debounce.debounce(function (e){
    wx.setStorageSync('ldlc_temp', e[0].detail.value)
    if (e[0].detail.value !== "") {
      this.statusIcon('ldlcStatus')
      this.setData({
        ldlc_data: e[0].detail.value
      })
    } else {
      this.setData({
        ldlc_data: "",
        ldlcStatus: ""
      })
    }
    
  }, 300),

  submitData: function(event) {
    const openid = wx.getStorageSync('openid')
    let gluIsEmpty = this.data.glu_data !== "" ? true : false
    let tcIsEmpty = this.data.tc_data !== "" ? true : false
    let tgIsEmpty = this.data.tg_data !== "" ? true : false
    let hdlcIsEmpty = this.data.hdlc_data !== "" ? true : false
    let ldlcIsEmpty = this.data.ldlc_data !== "" ? true : false
    
    if (gluIsEmpty && tcIsEmpty && tgIsEmpty && hdlcIsEmpty && ldlcIsEmpty) {
      
      let that = this
      let last_record = this.data.record[this.data.record.length - 1]

      db.collection('patient_list').doc(openid).get({
        success: res => {
          let last_record_temp = res.data.record[res.data.record.length - 1]
          let today = new Date().setHours(0,0,0,0)
          let last_record_day = last_record_temp.time.setHours(0,0,0,0)

          if (today === last_record_day) {
            //今天已填
            if (last_record_temp.gly_data) {
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
                        'record.$.gly_data': {
                          'glu': that.data.glu_data,
                          'tc': that.data.tc_data,
                          'tg': that.data.tg_data,
                          'hdlc': that.data.hdlc_data,
                          'ldlc': that.data.ldlc_data,
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
                                      url: '../blood/blood',
                                    })
                                    wx.removeStorageSync('glu_temp')
                                    wx.removeStorageSync('tc_temp')
                                    wx.removeStorageSync('tg_temp')
                                    wx.removeStorageSync('hdlc_temp')
                                    wx.removeStorageSync('ldlc_temp')
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
                  'record.$.gly_data': {
                    'glu': that.data.glu_data,
                    'tc': that.data.tc_data,
                    'tg': that.data.tg_data,
                    'hdlc': that.data.hdlc_data,
                    'ldlc': that.data.ldlc_data,
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
                                url: '../blood/blood',
                              })
                              wx.removeStorageSync('glu_temp')
                              wx.removeStorageSync('tc_temp')
                              wx.removeStorageSync('tg_temp')
                              wx.removeStorageSync('hdlc_temp')
                              wx.removeStorageSync('ldlc_temp')
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
                  gly_data: {
                    'glu': that.data.glu_data,
                    'tc': that.data.tc_data,
                    'tg': that.data.tg_data,
                    'hdlc': that.data.hdlc_data,
                    'ldlc': that.data.ldlc_data,
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
                              url: '../blood/blood',
                            })
                            wx.removeStorageSync('glu_temp')
                            wx.removeStorageSync('tc_temp')
                            wx.removeStorageSync('tg_temp')
                            wx.removeStorageSync('hdlc_temp')
                            wx.removeStorageSync('ldlc_temp')
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
          console.log(res)
        }
      })
      
    } else {
      let that = this

      wx.showModal({
        title: '提示',
        content: '您还有未填项目，确认上传吗？',
        success (res) {
          if (res.confirm) {
            let last_record = that.data.record[that.data.record.length - 1]

            db.collection('patient_list').doc(openid).get({
              success: res => {
                let last_record_temp = res.data.record[res.data.record.length - 1]
                let today = new Date().setHours(0,0,0,0)
                let last_record_day = last_record_temp.time.setHours(0,0,0,0)

                if (today === last_record_day) {
                  //今天已填
                  if (last_record_temp.gly_data) {
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
                              'record.$.gly_data': {
                                'glu': that.data.glu_data,
                                'tc': that.data.tc_data,
                                'tg': that.data.tg_data,
                                'hdlc': that.data.hdlc_data,
                                'ldlc': that.data.ldlc_data,
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
                                            url: '../blood/blood',
                                          })
                                          wx.removeStorageSync('glu_temp')
                                          wx.removeStorageSync('tc_temp')
                                          wx.removeStorageSync('tg_temp')
                                          wx.removeStorageSync('hdlc_temp')
                                          wx.removeStorageSync('ldlc_temp')
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
                        'record.$.gly_data': {
                          'glu': that.data.glu_data,
                          'tc': that.data.tc_data,
                          'tg': that.data.tg_data,
                          'hdlc': that.data.hdlc_data,
                          'ldlc': that.data.ldlc_data,
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
                                      url: '../blood/blood',
                                    })
                                    wx.removeStorageSync('glu_temp')
                                    wx.removeStorageSync('tc_temp')
                                    wx.removeStorageSync('tg_temp')
                                    wx.removeStorageSync('hdlc_temp')
                                    wx.removeStorageSync('ldlc_temp')
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
                        gly_data: {
                          'glu': that.data.glu_data,
                          'tc': that.data.tc_data,
                          'tg': that.data.tg_data,
                          'hdlc': that.data.hdlc_data,
                          'ldlc': that.data.ldlc_data,
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
                                    url: '../blood/blood',
                                  })
                                  wx.removeStorageSync('glu_temp')
                                  wx.removeStorageSync('tc_temp')
                                  wx.removeStorageSync('tg_temp')
                                  wx.removeStorageSync('hdlc_temp')
                                  wx.removeStorageSync('ldlc_temp')
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
                console.log(res)
              }
            })
          } else if (res.cancel) {}
        }
      })
    }
  }

})