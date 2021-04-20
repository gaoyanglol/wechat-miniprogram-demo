Page({
  data: {
    physical: "7",
    psycho: "7",
    social: "7",
    total: "7",
    res: []
  },
  onLoad: function (options) {
    let result = JSON.parse(options.res)
    let resInt = []
    let physicalInt
    let psychoInt
    let socialInt
    let totalInt

    result.forEach(function(item) {
      resInt.push(parseInt(item))
    })

    physicalInt = (resInt[0] + resInt[1] + resInt[2] + resInt[8] + resInt[9] + resInt[10] + resInt[13] + resInt[14]) / 8;

    psychoInt = (resInt[3] + resInt[4] + resInt[5] + resInt[11] + resInt[12] + resInt[15] + resInt[16]) / 7;

    socialInt = (resInt[6] + resInt[7] + resInt[17] + resInt[18]) / 4;

    totalInt = physicalInt + psychoInt + socialInt;

    this.setData({
      physical: physicalInt.toFixed(2).toString(),
      psycho: psychoInt.toFixed(2).toString(),
      social: socialInt.toFixed(2).toString(),
      total: totalInt.toFixed(2).toString(),
      res: result
    })
  },

})