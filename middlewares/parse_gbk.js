// 处理url为gbk
// app.use(parser())
exports.parser = function(){
  var iconv = require('iconv-lite');
  var convertUrl = function(url){
    var reg = /(\%\S\S)+/gi;
    var decodeStr = function(str){
      var arr = str.split('%');
      arr.shift();
      var buf = new Buffer(arr.length);
      arr.forEach(function(hex, i){
        var v = parseInt(hex, 16);
        buf[i] = v;
      });
      return iconv.decode(buf, 'gbk');
    };
    var result = url.match(reg).sort().reverse();
    result.forEach(function(str){
      url = url.replace(str, decodeStr(str));
    });
    return url
  }

  return function(req, res, next){
    var url = req.originalUrl;
    try{
      decodeURIComponent(url)
    }catch(e){
      req.url = req.originalUrl = encodeURI(convertUrl(url));
    }
    next();
  };
}