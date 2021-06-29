const db = wx.cloud.database()
const app = getApp()
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
    isLogin: "",
  },
  methods: {
    onShow: function() {
      let _openid = wx.getStorageSync('openid')
      if (_openid) {
        this.setData({
          isLogin: 1,
          openid: _openid
        })
        if (_openid === 'olx8h5DhyOfOLvvt8KqmexPgokVk' || _openid === 'olx8h5KKDp0djr9Su4xm42QbxfDw') {
          this.setData({
            isDoc: true
          })
        } else {
          this.setData({
            isDoc: false
          })
        }
      } else {
        this.setData({
          isLogin: 0
        })
      }
    },
    lungData: function() {
      wx.navigateTo({
        url: '../me/lungData/lungData',
      })
    },
    bloodData: function() {
      wx.navigateTo({
        url: '../me/bloodData/bloodData',
      })
    },
    // 登录功能
    login: function() {
      let that = this
      let openid = getApp().globalData.openid
        if ( wx.getStorageSync('isRegistered') === 0) {
          wx.navigateTo({
           url: '../me/register/register',
          })
        } else {
          wx.getUserProfile({
            desc: '仅获取您的公开信息用于资料显示', 
            success: (res) => {
              wx.showLoading({
                title: '加载中',
              })
              setTimeout(function () {
                wx.hideLoading()
                wx.setStorageSync('openid', openid)
                that.onShow()
              }, 1000)              
            }
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
            wx.removeStorageSync('openid')
            wx.removeStorageSync('fpg_temp')
            wx.removeStorageSync('breakfast_temp')
            wx.removeStorageSync('lunch_temp')
            wx.removeStorageSync('dinner_temp')
            wx.removeStorageSync('glu_temp')
            wx.removeStorageSync('tc_temp')
            wx.removeStorageSync('tg_temp')
            wx.removeStorageSync('hdlc_temp')
            wx.removeStorageSync('ldlc_temp')
            that.onShow()
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
          selected: 2
        })
      }
    }
  }
})
