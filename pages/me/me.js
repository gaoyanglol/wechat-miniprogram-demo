const db = wx.cloud.database()
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
      value: '个人信息'
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
    isLogin: ""
  },
  methods: {
    onLoad: function() {
     
      let isLogin = wx.getStorageSync('openid')
      if (isLogin) {
        this.setData({
          isLogin: 1
        })
      } else {
        this.setData({
          isLogin: 0
        })
      }
    },
    // 登录功能
    login: function() {
      let openid = getApp().globalData.openid

      db.collection('patient_list').add({
        data: {
          _id: openid,
        }
      }).then(res => {
        this.setData({
          registered: false
        })
        console.log(this.data.registered)
      }).catch(res => {
        this.setData({
          registered: true
        })
        console.log(this.data.registered)
      })

      if(this.data.registered) {
         wx.getUserProfile({
            desc: '仅获取您的公开信息用于资料显示', 
            success: (res) => {
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
              wx.setStorageSync('openid', openid)
              this.onLoad()
            }
          })
      } else {
        wx.navigateTo({
          url: '../me/register/register',
        })
      }
      
    },

    // 退出登录
    logout: function() {
      let that = this
      wx.showModal({
        title: '提示',
        content: '确定退出当前登录？',
        success (res) {
          if (res.confirm) {
            wx.clearStorageSync()
            that.onLoad()
          } else if (res.cancel) {
            
          }
        }
      })
    },

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
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        })
      }
    }
  }
})
