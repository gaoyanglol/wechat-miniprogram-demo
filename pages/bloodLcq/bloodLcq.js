Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    items: [
      { value: "1", question: "近两周来，咳嗽会让您胸痛或肚子痛吗？", answers: ["一直都会", "大多数时间会", "时常会", "有时会", "很少会", "几乎不会", "一点也不会"] },
      { value: "2", question: "近两周来，您会因咳嗽有痰而烦恼吗？",  answers: ["每次都会", "多数时间会", "不时会", "有时会", "偶尔会", "极少会", "从来不会"] },
      { value: "3", question: "近两周来，您会因咳嗽有痰而烦恼吗？",  answers: ["每次都会", "多数时间会", "不时会", "有时会", "偶尔会", "极少会", "从来不会"] }
    ]
  },
  onLoad: function() {
    console.log(this.data.items)
  }
})