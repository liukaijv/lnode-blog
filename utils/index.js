
// str_slug js版
exports.str_slug = function(str) {

  str = str.replace(/^\s+|\s+$/g, ''); // 两边空格
  str = str.toLowerCase();

  str = str.replace(/[^\u4e00-\u9fa5a-z0-9 -]/g, '') // 去掉其它的
    .replace(/\s+/g, '-') // 空格替换为-
    .replace(/-+/g, '-'); // 去除重复的-

  return str;
}