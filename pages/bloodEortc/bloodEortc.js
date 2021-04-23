Page({
  data: {
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 200,
    current: 0,
    items: [
      { 
        value: "1", 
        question: "当您做一些费力的动作，如提沉重的购物袋或行李箱时，您是否感到困难？", 
        answer: [
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      { 
        value: "2", 
        question: "长距离步行时，您是否感到困难？", 
        answer: [
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      { 
        value: "3", 
        question: "在户外短距离散步时，您是否感到困难？", 
        answer: [
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      { 
        value: "4", 
        question: "在白天，您是否必须卧床或坐在椅子上？", 
        answer: [
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      { 
        value: "5", 
        question: "您是否需要别人协助进食、穿衣、洗漱或上厕所？", 
        answer: [
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      { 
        value: "6", 
        question: "在过去的一周中：\n您的工作或者日常活动是否受到体能限制？", 
        answer: [
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      { 
        value: "7", 
        question: "在过去的一周中：\n您的业余爱好和休闲活动是否受到体能限制？", 
        answer: [
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      { 
        value: "8", 
        question: "在过去的一周中：\n您曾感到气短吗？", 
        answer: [
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      { 
        value: "9", 
        question: "在过去的一周中：\n您有过疼痛吗？", 
        answer: [
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      { 
        value: "10", 
        question: "在过去的一周中：\n您曾需要休息吗？", 
        answer: [
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "11", 
        question: "在过去的一周中：\n您曾感到睡眠不好吗？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "12", 
        question: "在过去的一周中：\n您曾感到虚弱吗？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "13", 
        question: "在过去的一周中：\n您曾感到没有胃口吗？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "14", 
        question: "在过去的一周中：\n您曾感受到恶心想吐吗？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "15", 
        question: "在过去的一周中：\n您曾呕吐过吗？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "16", 
        question: "在过去的一周中：\n您曾有便秘吗？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "17", 
        question: "在过去的一周中：\n您曾有过腹泻？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "18", 
        question: "在过去的一周中：\n您曾感觉疲乏吗？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "19", 
        question: "在过去的一周中：\n疼痛妨碍您的日常活动吗？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "20", 
        question: "在过去的一周中：\n您是否很难集中注意力做事，例如读报或看电视？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "21", 
        question: "在过去的一周中：\n您曾感到紧张吗？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "22", 
        question: "在过去的一周中：\n您曾感到担心吗？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "23", 
        question: "在过去的一周中：\n您曾感到容易动怒吗？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "24", 
        question: "在过去的一周中：\n您曾感到情绪低落吗？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "25", 
        question: "在过去的一周中：\n您曾经感到记事困难吗？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "26", 
        question: "在过去的一周中：\n您的身体状况或治疗过程，妨碍了您的家庭生活吗？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "27", 
        question: "在过去的一周中：\n您的身体状况或治疗过程，妨碍了您的社交活动吗？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "28", 
        question: "在过去的一周中：\n您的身体状况或治疗过程，造成了您的经济困难吗？", 
        answer: [ 
          {value: "1", title: "A", name: "没有"},
          {value: "2", title: "B", name: "有一点"},
          {value: "3", title: "C", name: "有一些"},
          {value: "4", title: "D", name: "非常多"},
        ],
        chosen: ""
      },
      {
        value: "29", 
        question: "以下问题，数字1-7代表从“很差”到“很好”的等级，请在1至7之间圈出对您最合适的答案。\n\n您如何评定过去一周中您的整体健康状况？", 
        answer: [ 
          {value: "1", title: "1", name: "1（很差）"},
          {value: "2", title: "2", name: "2"},
          {value: "3", title: "3", name: "3"},
          {value: "4", title: "4", name: "4"},
          {value: "5", title: "5", name: "5"},
          {value: "6", title: "6", name: "6"},
          {value: "7", title: "7", name: "7（很好）"},
        ],
        chosen: ""
      },
      {
        value: "30", 
        question: "以下问题，数字1-7代表从“很差”到“很好”的等级，请在1至7之间圈出对您最合适的答案。\n\n您如何评定过去一周中您的整体生活质量？", 
        answer: [ 
          {value: "1", title: "1", name: "1（很差）"},
          {value: "2", title: "2", name: "2"},
          {value: "3", title: "3", name: "3"},
          {value: "4", title: "4", name: "4"},
          {value: "5", title: "5", name: "5"},
          {value: "6", title: "6", name: "6"},
          {value: "7", title: "7", name: "7（很好）"},
        ],
        chosen: ""
      },
    ],
    previous: "none",
    submit: "none",
    disabled: true,
    sum: []
  },
  stopTouchMove: function() {
    return false;
  },
  changeQuest: function(event) {

    if (this.data.current === 29) {
      this.setData({
        submit: "block"
      })
    } else {
      this.setData({
        submit: "none"
      })
    }
    if (this.data.current === 0) {
      this.setData({
        previous: "none"
      })
    } else {
      this.setData({
        previous: "block"
      })
    }
  },
  changeTab: function(event) {
    let currentItem = this.data.items[this.data.current]
    let answers = currentItem.answer
    let items = this.data.items
    let chosen = []

    for(let i = 0; i < answers.length; i++) {
      if (answers[i].value === event.currentTarget.dataset.value) {
        answers[i].selected = "selected"
        currentItem.chosen = event.currentTarget.dataset.value
      } else {
        answers[i].selected = ""
      }
    }
    this.setData({
      items: this.data.items,
      current: this.data.current < 29 ? this.data.current+1 : 29
    })

    // 判断答题是否完成改变提交按键状态
    for(let i = 0; i < items.length; i++) {
      chosen.push(items[i].chosen)
    }
    if(!chosen.includes("")) {
      this.setData({
        disabled: false,
        sum: chosen
      })
    }
    
  },
  goBack: function(event) {
    this.setData({
      current: this.data.current - 1,
      items: this.data.items
    })
  },
  submitData: function(event) {
    let res = JSON.stringify(this.data.sum)
    wx.redirectTo({
      url: '/pages/bloodEortc/eortcResult/eortcResult?res=' + res,
    })
  }
})