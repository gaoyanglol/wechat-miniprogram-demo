Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#000000",
    list: [{
      pagePath: "/pages/home/home",
      iconPath: "/image/data.png",
      selectedIconPath: "/image/data_HL.png",
      text: "数据监测"
    }, {
      pagePath: "/pages/knowledge/knowledge",
      iconPath: "/image/knowledge.png",
      selectedIconPath: "/image/knowledge_HL.png",
      text: "疾病知识"
    }, {
      pagePath: "/pages/communicate/communicate",
      iconPath: "/image/communicate.png",
      selectedIconPath: "/image/communicate_HL.png",
      text: "医患沟通"
    }, {
      pagePath: "/pages/me/me",
      iconPath: "/image/my.png",
      selectedIconPath: "/image/my_HL.png",
      text: "个人信息"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})