const db = wx.cloud.database()
const _ = db.command
const openid = wx.getStorageSync('openid')
var debounce = require('../../utils/debounce.js')

Page({
  data: {
    fpg_data: "",
    breakfast_data: "",
    lunch_data: "",
    dinner_data: "",
    fpgStatus: "",
    breakfastStatus: "",
    lunchStatus:"",
    dinnerStatus:"",
    display: "none"
  },
  onLoad: function(options) {
    let that = this
    db.collection('patient_list').doc(openid).get({
      success: res => {
        that.setData({
          type: res.data.type,
          record: res.data.record
        })
        console.log(this.data)
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
    let fpg = wx.getStorageSync('fpg_temp') && wx.getStorageSync('fpg_temp') !== ""  ? '../../image/check.svg' : ''
    let breakfast = wx.getStorageSync('breakfast_temp') && wx.getStorageSync('breakfast_temp') !== ""  ? '../../image/check.svg' : ''
    let lunch = wx.getStorageSync('lunch_temp') && wx.getStorageSync('lunch_temp') !== ""  ? '../../image/check.svg' : ''
    let dinner = wx.getStorageSync('dinner_temp') && wx.getStorageSync('dinner_temp') !== "" ? '../../image/check.svg' : ''
    this.setData({
      fpg_data: wx.getStorageSync('fpg_temp'),
      breakfast_data: wx.getStorageSync('breakfast_temp'),
      lunch_data: wx.getStorageSync('lunch_temp'),
      dinner_data: wx.getStorageSync('dinner_temp'),
      fpgStatus: fpg,
      breakfastStatus: breakfast,
      lunchStatus: lunch,
      dinnerStatus: dinner
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

  fpgStorage: debounce.debounce(function (e){
    wx.setStorageSync('fpg_temp', e[0].detail.value)
    if (e[0].detail.value !== "") {
      this.statusIcon('fpgStatus')
      this.setData({
        fpg_data: e[0].detail.value
      })
    } else {
      this.setData({
        fpg_data: "",
        fpgStatus: ""
      })
    }
  }, 300),
  breakfastStorage: debounce.debounce(function (e){
    wx.setStorageSync('breakfast_temp', e[0].detail.value)
    if (e[0].detail.value !== "") {
      this.statusIcon('breakfastStatus')
      this.setData({
        breakfast_data: e[0].detail.value
      })
    } else {
      this.setData({
        breakfast_data: "",
        breakfastStatus: ""
      })
    }
   
  }, 300),
  lunchStorage: debounce.debounce(function (e){
    wx.setStorageSync('lunch_temp', e[0].detail.value)
    if (e[0].detail.value !== "") {
      this.statusIcon('lunchStatus')
      this.setData({
        lunch_data: e[0].detail.value
      })
    } else {
      this.setData({
        lunch_data: "",
        lunchStatus: ""
      })
    }
    
  }, 300),
  dinnerStorage: debounce.debounce(function (e){
    wx.setStorageSync('dinner_temp', e[0].detail.value)
    if (e[0].detail.value !== "") {
      this.statusIcon('dinnerStatus')
      this.setData({
        dinner_data: e[0].detail.value
      })
    } else {
      this.setData({
        dinner_data: "",
        dinnerStatus: ""
      })
    }
    
  }, 300),

  submitData: function(event) {
    let fpgIsEmpty = this.data.fpg_data !== "" ? true : false
    let breakfastIsEmpty = this.data.breakfast_data !== "" ? true : false
    let lunchIsEmpty = this.data.lunch_data !== "" ? true : false
    let dinnerIsEmpty = this.data.dinner_data !== "" ? true : false
    
    if (fpgIsEmpty && breakfastIsEmpty && lunchIsEmpty && dinnerIsEmpty) {
      
      let that = this
      let last_record = this.data.record[this.data.record.length - 1]

      db.collection('patient_list').doc(openid).get({
        success: res => {
          let last_record_temp = res.data.record[res.data.record.length - 1]
          let today = new Date().setHours(0,0,0,0)
          let last_record_day = last_record_temp.time.setHours(0,0,0,0)

          if (today === last_record_day) {
            //今天已填
            if (last_record_temp.glu_data) {
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
                        'record.$.glu_data': {
                          'fpg': that.data.fpg_data,
                          'breakfast': that.data.breakfast_data,
                          'lunch': that.data.lunch_data,
                          'dinner': that.data.dinner_data
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
                                    wx.removeStorageSync('fpg_temp')
                                    wx.removeStorageSync('breakfast_temp')
                                    wx.removeStorageSync('lunch_temp')
                                    wx.removeStorageSync('dinner_temp')
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
                  'record.$.glu_data': {
                    'fpg': that.data.fpg_data,
                    'breakfast': that.data.breakfast_data,
                    'lunch': that.data.lunch_data,
                    'dinner': that.data.dinner_data
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
                              wx.removeStorageSync('fpg_temp')
                              wx.removeStorageSync('breakfast_temp')
                              wx.removeStorageSync('lunch_temp')
                              wx.removeStorageSync('dinner_temp')
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
                  glu_data: {
                    'fpg': that.data.fpg_data,
                    'breakfast': that.data.breakfast_data,
                    'lunch': that.data.lunch_data,
                    'dinner': that.data.dinner_data
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
                            wx.removeStorageSync('fpg_temp')
                            wx.removeStorageSync('breakfast_temp')
                            wx.removeStorageSync('lunch_temp')
                            wx.removeStorageSync('dinner_temp')
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
        fail: res => { }
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
                  if (last_record_temp.glu_data) {
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
                              'record.$.glu_data': {
                                'fpg': that.data.fpg_data,
                                'breakfast': that.data.breakfast_data,
                                'lunch': that.data.lunch_data,
                                'dinner': that.data.dinner_data
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
                                          wx.removeStorageSync('fpg_temp')
                                          wx.removeStorageSync('breakfast_temp')
                                          wx.removeStorageSync('lunch_temp')
                                          wx.removeStorageSync('dinner_temp')
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
                        'record.$.glu_data': {
                          'fpg': that.data.fpg_data,
                          'breakfast': that.data.breakfast_data,
                          'lunch': that.data.lunch_data,
                          'dinner': that.data.dinner_data
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
                                    wx.removeStorageSync('fpg_temp')
                                    wx.removeStorageSync('breakfast_temp')
                                    wx.removeStorageSync('lunch_temp')
                                    wx.removeStorageSync('dinner_temp')
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
                        glu_data: {
                          'fpg': that.data.fpg_data,
                          'breakfast': that.data.breakfast_data,
                          'lunch': that.data.lunch_data,
                          'dinner': that.data.dinner_data
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
                                  wx.removeStorageSync('fpg_temp')
                                  wx.removeStorageSync('breakfast_temp')
                                  wx.removeStorageSync('lunch_temp')
                                  wx.removeStorageSync('dinner_temp')
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
              fail: res => { }
            })
          } else if (res.cancel) {}
        }
      })
    }
  }

})