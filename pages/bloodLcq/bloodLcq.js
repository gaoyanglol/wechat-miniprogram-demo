Page({
  data: {
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 0,
    current: 1,
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
        ]
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
        ]
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
        ]
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
        ]
      },
    ]
  },
  changeQuest: function(event) {
    this.setData({
      current : event.detail.current + 1
    })
  },
  changeTab: function(event) {
    const arr = this.data.items
    
    for (let i = 0; i < arr.length; ++i) {
      const answer = arr[i].answer
      for (let j = 0; j < answer.length; ++j) {
        if (answer[j].value === event.currentTarget.dataset.value) {
          answer[j].selected = "selected"
          // this.data.chosenNum = arr[i].value
        } else {
          answer[j].selected = ""
        }
      }
      
    }
    // this.data.disabled = false
    console.log(this.data.items)
    this.setData({
      items: arr,
      // chosenNum: this.data.chosenNum,
      // disabled: this.data.disabled
    })
  }
})