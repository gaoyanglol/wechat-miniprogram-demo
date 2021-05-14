module.exports={
  debounce: function debounce(fn, interval) {
    var timer;
    var time = interval || 1000;//延迟时间，如果interval不传默认1000ms
    return function () {
      clearTimeout(timer);
      var context = this;
      var args = arguments;//保存arguments，因为setTimeout是全局的
      timer = setTimeout(function () {
        fn.call(context, args);  //call方法是改变this的指向，第二个参数可以传递任意值
      }, time);
    };
  }
}
