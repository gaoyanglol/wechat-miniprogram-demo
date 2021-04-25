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

    let pfRS = (resInt[0] + resInt[1] + resInt[2] + resInt[3] + resInt[4]) / 5
    let rfRS = (resInt[5] + resInt[6]) / 2
    let efRS = (resInt[20] + resInt[21] + resInt[22] + resInt[23]) / 4
    let cfRS = (resInt[19] + resInt[24]) / 2
    let sfRS = (resInt[25] + resInt[26]) / 2
    let qlRS = (resInt[28] + resInt[29]) / 2
    let faRS = (resInt[9] + resInt[11] + resInt[17]) / 3
    let nvRS = (resInt[13] + resInt[14]) / 2
    let paRS = (resInt[8] + resInt[18]) / 2
    let dyRS = resInt[7]
    let slRS = resInt[10]
    let apRS = resInt[12]
    let coRS = resInt[15]
    let diRS = resInt[16]
    let fiRS = resInt[27]

    this.setData({
      pf: this.standardScoreFunc(pfRS, 3).toFixed(2).toString(),
      rf: this.standardScoreFunc(rfRS, 3).toFixed(2).toString(),
      ef: this.standardScoreFunc(efRS, 3).toFixed(2).toString(),
      cf: this.standardScoreFunc(cfRS, 3).toFixed(2).toString(),
      sf: this.standardScoreFunc(sfRS, 3).toFixed(2).toString(),
      ql: this.standardScoreSymp(qlRS, 6).toFixed(2).toString(),
      fa: this.standardScoreSymp(faRS, 3).toFixed(2).toString(),
      nv: this.standardScoreSymp(nvRS, 3).toFixed(2).toString(),
      pa: this.standardScoreSymp(paRS, 3).toFixed(2).toString(),
      dy: this.standardScoreSymp(dyRS, 3).toFixed(2).toString(),
      sl: this.standardScoreSymp(slRS, 3).toFixed(2).toString(),
      ap: this.standardScoreSymp(apRS, 3).toFixed(2).toString(),
      co: this.standardScoreSymp(coRS, 3).toFixed(2).toString(),
      di: this.standardScoreSymp(diRS, 3).toFixed(2).toString(),
      fi: this.standardScoreSymp(fiRS, 3).toFixed(2).toString(),
      res: result
    })

    console.log(this.data)
  },
  standardScoreFunc: function(rawScore, range) {
    return (1 - (rawScore - 1) / range ) * 100
  },
  standardScoreSymp: function(rawScore, range) {
    return ((rawScore - 1) / range ) * 100
  }

})