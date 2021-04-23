Page({
  data: {
    pf: "7",
    rf: "7",
    ef: "7",
    cf: "7",
    sf: "7",
    ql: "7",
    fa: "7",
    nv: "7",
    pa: "7",
    dy: "7",
    sl: "7",
    ap: "7",
    co: "7",
    di: "7",
    fi: "7",
    res: []
  },
  onLoad: function (options) {
    let result = JSON.parse(options.res)
    let resInt = []

    result.forEach(function(item) {
      resInt.push(parseInt(item))
    })

    this.setData({
      // physical: physicalInt.toFixed(2).toString(),
      res: result
    })
    console.log(resInt)
    console.log(this.data.res)
  },

})