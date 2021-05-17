const db = wx.cloud.database()
const _ = db.command
const openid = wx.getStorageSync('openid')

Page({
  data: {
    items: [
      {value: '1', name: '1'},
      {value: '2', name: '2'},
      {value: '3', name: '3'},
      {value: '4', name: '4'},
      {value: '5', name: '5'},
      {value: '6', name: '6'},
      {value: '7', name: '7'},
      {value: '8', name: '8'},
      {value: '9', name: '9'},
      {value: '10', name: '10'},
    ],
    chosenNum : "",
    disabled: true,
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
  },
  preview: function(event) {
    console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: ["https://first-aid-man.gitbooks.io/pocket-book-abc/content/assets/vas-tengtong.png"] // 需要预览的图片http链接列表
    })
  },
  changeTab: function(event) {
    let arr = this.data.items
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i].value === event.currentTarget.dataset.value) {
        arr[i].selected = "selected"
        this.data.chosenNum = arr[i].value
      } else {
        arr[i].selected = ""
      }
    }
    this.data.disabled = false
    this.setData({
      items: arr,
      chosenNum: this.data.chosenNum,
      disabled: this.data.disabled
    })
  },
  submitData: function(event) {

    let that = this
    let last_record = this.data.record[this.data.record.length - 1]
    
    db.collection('patient_list').doc(wx.getStorageSync('openid')).get({
      success: res => {
        let last_record_temp = res.data.record[res.data.record.length - 1]
        let today = new Date().setHours(0,0,0,0)
        let last_record_day = last_record_temp.time.setHours(0,0,0,0)

        if (today === last_record_day) {
          //今天已填
          if (last_record_temp.vas_data) {
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
                      'record.$.vas_data': that.data.chosenNum,
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
                                    url: '../lung/lung',
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
                'record.$.vas_data': that.data.chosenNum,
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
                              url: '../lung/lung',
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
          db.collection('patient_list').doc(wx.getStorageSync('openid')).update({
            data: {
              record: _.push({
                vas_data: that.data.chosenNum,
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
                            url: '../lung/lung',
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