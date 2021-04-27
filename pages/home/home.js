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
    record: []
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
      wx.navigateTo({
        url: '/pages/blood/blood'
      })
    },
    goLung(event) {
      wx.navigateTo({
        url: '/pages/lung/lung'
      })
    },
    onLoad: function(options) {
      let that = this
     db.collection('list').where({
       name: "张三",
     }).get({
        success: function(res) {
          that.setData({
            record: res.data
          })
        }
      })
      console.log(this.data)
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

  //查询数据
  // getData() {
  //   DB.get({
  //     success(res) {
  //       console.log("查询数据成功", res)
  //     }
  //   })
  // }
});