exports.sub_str = function (val, len, prifix) {
    var newLength = 0; 
    var newStr = ""; 
    var chineseRegex = /[^\x00-\xff]/g; 
    var singleChar = ""; 
    var strLength = val.replace(chineseRegex,"**").length; 
    for(var i = 0;i < strLength;i++) 
    { 
        singleChar = val.charAt(i).toString(); 
        if(singleChar.match(chineseRegex) != null) 
        { 
            newLength += 2; 
        }     
        else 
        { 
            newLength++; 
        } 
        if(newLength > len) 
        { 
            break; 
        } 
        newStr += singleChar; 
    } 

    if(prifix && strLength > len) 
    { 
        newStr += prifix; 
    } 
    return newStr;
};