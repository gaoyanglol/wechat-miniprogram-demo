const db = wx.cloud.database()
var util = require('../../utils/utils.js');
const { formatTime } = require('../../utils/utils.js');

Component({
  properties: {
    background: {
      type: String,
      value: 'rgba(255, 255, 255, 0)'
    },
    color: {
      type: String,
      value: 'rgba(255, 255, 255, 1)'
    },
    titleText: {
      type: String,
      value: '常州一院胸外科随访助手'
    },
    titleImg: {
      type: String,
      value: '/image/logo.png'
    },
    backIcon: {
      type: String,
      value: ''
    },
    homeIcon: {
      type: String,
      value: ''
    },
    fontSize: {
      type: Number,
      value: 36.23
    },
    iconHeight: {
      type: Number,
      value: 50.72
    },
    iconWidth: {
      type: Number,
      value: 50.72
    }
  },
  attached: function () {
    var that = this;
    that.setNavSize();
    that.setStyle();
  },
  data: {
    imgUrl: ['/image/swiper1.png', '/image/swiper2.png'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indicatorColor: "rgba(255,255,255, .5)",
    indicatorActiveColor: "rgba(255,255,255, 1)",
    record: "",
    type: ""
  },
  methods: {
    // 通过获取系统信息计算导航栏高度        
    setNavSize: function () {
      var that = this
        , sysinfo = wx.getSystemInfoSync()
        , statusHeight = sysinfo.statusBarHeight
        , isiOS = sysinfo.system.indexOf('iOS') > -1
        , navHeight;
      if (!isiOS) {
        navHeight = 48;
      } else {
        navHeight = 44;
      }
      that.setData({
        status: statusHeight,
        navHeight: navHeight
      })
    },
    setStyle: function () {
      var that = this
        , containerStyle
        , textStyle
        , iconStyle;
      containerStyle = [
        'background:' + that.data.background
      ].join(';');
      textStyle = [
        'color:' + that.data.color,
        'font-size:' + that.data.fontSize + 'rpx'
      ].join(';');
      iconStyle = [
        'width: ' + that.data.iconWidth + 'rpx',
        'height: ' + that.data.iconHeight + 'rpx'
      ].join(';');
      that.setData({
        containerStyle: containerStyle,
        textStyle: textStyle,
        iconStyle: iconStyle
      })
    },
    // 返回事件        
    back: function () {
      wx.navigateBack({
        delta: 1
      })
      this.triggerEvent('back', { back: 1 })
    },
    home: function () {
      this.triggerEvent('home', {});
    },
    goBlood(event) {
      if(wx.getStorageSync('openid')) {
        if (this.data.type === 1) {
          wx.navigateTo({
            url: '/pages/blood/blood'
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '您参与的不是该随访项目，您可进行该项目的检测，但检测数据无法上传！',
            success (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/blood/blood'
                })
              } else if (res.cancel) {}
            }
          })
        }
        
      } else {
        wx.showModal({
          title: '提示',
          content: '您还未登录，您可进行该项目的检测，但检测数据无法上传！',
          success (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/blood/blood'
              })
            } else if (res.cancel) {}
          }
        })
      }
      
    },
    goLung(event) {
      if(wx.getStorageSync('openid')) {
        if(this.data.type === 0) {
          wx.navigateTo({
            url: '/pages/lung/lung'
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '您参与的不是该随访项目，您可进行该项目的检测，但检测数据无法上传！',
            success (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/lung/lung'
                })
              } else if (res.cancel) {}
            }
          })
        }
        
      } else {
        wx.showModal({
          title: '提示',
          content: '您还未登录，您可进行该项目的检测，但检测数据无法上传！',
          success (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/lung/lung'
              })
            } else if (res.cancel) {
              
            }
          }
        })
      }
      
    },
    onShow: function(options) {
      let openid = wx.getStorageSync('openid')
      let that = this
      if (openid) {
        db.collection('patient_list').where({
          _openid: openid,
        }).get({
           success: function(res) {
            let _time = res.data[0].record.map((arr)=> formatTime(arr.time))
            let record_obj = []
            for(let i = 0; i < _time.length; i++) {
              record_obj.push( {"time":  _time[i]} )
            }
            that.setData({
              type: res.data[0].type,
              record: record_obj
            })

             let today =  new Date().setHours(0,0,0,0)
             let last_record = res.data[0].record[res.data[0].record.length - 1]
             
             if (today === last_record.time.setHours(0,0,0,0)) {
               let index = that.data.record.length - 1
               that.setData({
                [`record[${index}].time`] : '今天'
               })
             }
           }
         })
      } else {
        this.setData({
          type: "",
          record: ""
        })
      }
    },
    checkRecord: function() {
      if(this.data.type === 0) {
        wx.navigateTo({
          url: '../lung/lung?display=' + false,
        })
      } else if(this.data.type === 1) {
        wx.navigateTo({
          url: '../blood/blood?display=' + false,
        })
      }
    }
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
});