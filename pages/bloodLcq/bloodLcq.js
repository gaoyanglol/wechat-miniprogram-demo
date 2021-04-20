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
        question: "近两周来，咳嗽会让您胸痛或肚子痛吗？", 
        answer: [
          {value: "1", title: "A", name: "一直都会"},
          {value: "2", title: "B", name: "大多数时间会"},
          {value: "3", title: "C", name: "时常会"},
          {value: "4", title: "D", name: "有时会"},
          {value: "5", title: "E", name: "很少会"},
          {value: "6", title: "F", name: "几乎不会"},
          {value: "7", title: "G", name: "一点也不会"}
        ],
        chosen: ""
      },
      { 
        value: "2", 
        question: "近两周来，您会因咳嗽有痰而烦恼吗？", 
        answer: [
          {value: "1", title: "A", name: "每次都会"},
          {value: "2", title: "B", name: "多数时间会"},
          {value: "3", title: "C", name: "不时会"},
          {value: "4", title: "D", name: "有时会"},
          {value: "5", title: "E", name: "偶尔会"},
          {value: "6", title: "F", name: "极少会"},
          {value: "7", title: "G", name: "从来不会"}
        ],
        chosen: ""
      },
      { 
        value: "3", 
        question: "近两周来，咳嗽会让您感到疲倦吗？", 
        answer: [
          {value: "1", title: "A", name: "一直都会"},
          {value: "2", title: "B", name: "大多数时间会"},
          {value: "3", title: "C", name: "时常会"},
          {value: "4", title: "D", name: "有时会"},
          {value: "5", title: "E", name: "很少会"},
          {value: "6", title: "F", name: "几乎不会"},
          {value: "7", title: "G", name: "一点也不会"}
        ],
        chosen: ""
      },
      { 
        value: "4", 
        question: "近两周来，您觉得能控制咳嗽吗？", 
        answer: [
          {value: "1", title: "A", name: "一点也不能"},
          {value: "2", title: "B", name: "几乎不能"},
          {value: "3", title: "C", name: "很少能"},
          {value: "4", title: "D", name: "有时能"},
          {value: "5", title: "E", name: "常常能"},
          {value: "6", title: "F", name: "多数时间能"},
          {value: "7", title: "G", name: "一直都能"}
        ],
        chosen: ""
      },
      { 
        value: "5", 
        question: "近两周来，咳嗽会让您觉得尴尬吗？", 
        answer: [
          {value: "1", title: "A", name: "一直都会"},
          {value: "2", title: "B", name: "大多数时间会"},
          {value: "3", title: "C", name: "时常会"},
          {value: "4", title: "D", name: "有时会"},
          {value: "5", title: "E", name: "很少会"},
          {value: "6", title: "F", name: "几乎不会"},
          {value: "7", title: "G", name: "一点也不会"}
        ],
        chosen: ""
      },
      { 
        value: "6", 
        question: "近两周来，咳嗽会让您焦虑不安吗？", 
        answer: [
          {value: "1", title: "A", name: "一直都会"},
          {value: "2", title: "B", name: "大多数时间会"},
          {value: "3", title: "C", name: "时常会"},
          {value: "4", title: "D", name: "有时会"},
          {value: "5", title: "E", name: "很少会"},
          {value: "6", title: "F", name: "几乎不会"},
          {value: "7", title: "G", name: "一点也不会"}
        ],
        chosen: ""
      },
      { 
        value: "7", 
        question: "近两周来，咳嗽会影响您的工作或其他日常事务吗？", 
        answer: [
          {value: "1", title: "A", name: "一直都会"},
          {value: "2", title: "B", name: "大多数时间会"},
          {value: "3", title: "C", name: "时常会"},
          {value: "4", title: "D", name: "有时会"},
          {value: "5", title: "E", name: "很少会"},
          {value: "6", title: "F", name: "几乎不会"},
          {value: "7", title: "G", name: "一点也不会"}
        ],
        chosen: ""
      },
      { 
        value: "8", 
        question: "近两周来，咳嗽会影响您的整个娱乐生活吗？", 
        answer: [
          {value: "1", title: "A", name: "一直都会"},
          {value: "2", title: "B", name: "大多数时间会"},
          {value: "3", title: "C", name: "时常会"},
          {value: "4", title: "D", name: "有时会"},
          {value: "5", title: "E", name: "很少会"},
          {value: "6", title: "F", name: "几乎不会"},
          {value: "7", title: "G", name: "一点也不会"}
        ],
        chosen: ""
      },
      { 
        value: "9", 
        question: "近两周来，接触油漆油烟会让您咳嗽吗？", 
        answer: [
          {value: "1", title: "A", name: "一直都会"},
          {value: "2", title: "B", name: "大多数时间会"},
          {value: "3", title: "C", name: "时常会"},
          {value: "4", title: "D", name: "有时会"},
          {value: "5", title: "E", name: "很少会"},
          {value: "6", title: "F", name: "几乎不会"},
          {value: "7", title: "G", name: "一点也不会"}
        ],
        chosen: ""
      },
      { 
        value: "10", 
        question: "近两周来，咳嗽会影响您的睡眠吗？", 
        answer: [
          {value: "1", title: "A", name: "一直都会"},
          {value: "2", title: "B", name: "大多数时间会"},
          {value: "3", title: "C", name: "常常会"},
          {value: "4", title: "D", name: "有时会"},
          {value: "5", title: "E", name: "很少会"},
          {value: "6", title: "F", name: "几乎不会"},
          {value: "7", title: "G", name: "一点也不会"}
        ],
        chosen: ""
      },
      {
        value: "11", 
        question: "近两周来，您每天阵发性咳嗽发作多吗？", 
        answer: [ 
          {value: "1", title: "A", name: "持续有"},
          {value: "2", title: "B", name: "次数多"},
          {value: "3", title: "C", name: "时时有"},
          {value: "4", title: "D", name: "有一些"},
          {value: "5", title: "E", name: "偶尔有"},
          {value: "6", title: "F", name: "极少有"},
          {value: "7", title: "G", name: "一点也没有"}
        ],
        chosen: ""
      },
      {
        value: "12", 
        question: "近两周来，您会因咳嗽而情绪低落吗？", 
        answer: [ 
          {value: "1", title: "A", name: "一直都会"},
          {value: "2", title: "B", name: "大多数时间会"},
          {value: "3", title: "C", name: "时常会"},
          {value: "4", title: "D", name: "有时会"},
          {value: "5", title: "E", name: "很少会"},
          {value: "6", title: "F", name: "几乎不会"},
          {value: "7", title: "G", name: "一点也不会"}
        ],
        chosen: ""
      },
      {
        value: "13", 
        question: "近两周来，咳嗽会让您厌烦吗？", 
        answer: [ 
          {value: "1", title: "A", name: "一直都会"},
          {value: "2", title: "B", name: "大多数时间会"},
          {value: "3", title: "C", name: "时常会"},
          {value: "4", title: "D", name: "有时会"},
          {value: "5", title: "E", name: "很少会"},
          {value: "6", title: "F", name: "几乎不会"},
          {value: "7", title: "G", name: "一点也不会"}
        ],
        chosen: ""
      },
      {
        value: "14", 
        question: "近两周来，咳嗽会让您声音嘶哑吗？", 
        answer: [ 
          {value: "1", title: "A", name: "一直都会"},
          {value: "2", title: "B", name: "大多数时间会"},
          {value: "3", title: "C", name: "时常会"},
          {value: "4", title: "D", name: "有时会"},
          {value: "5", title: "E", name: "很少会"},
          {value: "6", title: "F", name: "几乎不会"},
          {value: "7", title: "G", name: "一点也不会"}
        ],
        chosen: ""
      },
      {
        value: "15", 
        question: "近两周来，您会觉得精力充沛吗？", 
        answer: [ 
          {value: "1", title: "A", name: "一点也不会"},
          {value: "2", title: "B", name: "几乎不会"},
          {value: "3", title: "C", name: "很少会"},
          {value: "4", title: "D", name: "有时会"},
          {value: "5", title: "E", name: "常常会"},
          {value: "6", title: "F", name: "多数时间会"},
          {value: "7", title: "G", name: "一直都会"}
        ],
        chosen: ""
      },
      {
        value: "16", 
        question: "近两周来，咳嗽会让您担心有可能得了重病吗？", 
        answer: [ 
          {value: "1", title: "A", name: "一直都会"},
          {value: "2", title: "B", name: "大多数时间会"},
          {value: "3", title: "C", name: "时常会"},
          {value: "4", title: "D", name: "有时会"},
          {value: "5", title: "E", name: "很少会"},
          {value: "6", title: "F", name: "几乎不会"},
          {value: "7", title: "G", name: "一点也不会"}
        ],
        chosen: ""
      },
      {
        value: "17", 
        question: "近两周来，咳嗽会让您担心别人觉得您身体不对劲吗？", 
        answer: [ 
          {value: "1", title: "A", name: "一直都会"},
          {value: "2", title: "B", name: "大多数时间会"},
          {value: "3", title: "C", name: "时常会"},
          {value: "4", title: "D", name: "有时会"},
          {value: "5", title: "E", name: "很少会"},
          {value: "6", title: "F", name: "几乎不会"},
          {value: "7", title: "G", name: "一点也不会"}
        ],
        chosen: ""
      },
      {
        value: "18", 
        question: "近两周来，您会因咳嗽中断谈话或接听电话吗？", 
        answer: [ 
          {value: "1", title: "A", name: "每次都会"},
          {value: "2", title: "B", name: "大多数时间会"},
          {value: "3", title: "C", name: "时常会"},
          {value: "4", title: "D", name: "有时会"},
          {value: "5", title: "E", name: "很少会"},
          {value: "6", title: "F", name: "几乎不会"},
          {value: "7", title: "G", name: "一点也不会"}
        ],
        chosen: ""
      },
      {
        value: "19", 
        question: "近两周来，您会觉得咳嗽惹恼了同伴﹑家人或朋友？", 
        answer: [ 
          {value: "1", title: "A", name: "每次都会"},
          {value: "2", title: "B", name: "多数时间会"},
          {value: "3", title: "C", name: "不时会"},
          {value: "4", title: "D", name: "有时会"},
          {value: "5", title: "E", name: "偶尔会"},
          {value: "6", title: "F", name: "极少会"},
          {value: "7", title: "G", name: "从来不会"}
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

    if (this.data.current === 18) {
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
      current: this.data.current < 18 ? this.data.current+1 : 18
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
      url: '/pages/bloodLcq/lcqResult/lcqResult?res=' + res,
    })
  }
})