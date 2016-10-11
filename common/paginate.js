exports.paginate = function(page,total_page,url){
	var html = '',
	url = url || '';
	if (total_page > 1) {
		html +='<div id="pagenavi">';  
		if (page > 1) {
			html +='<a class="page-numbers" href="'+url+'/?page=1">&laquo;</a>';
		} 
		var i = 1; 
		if (page > 5) {
			i = +page - 4; 
		} 
		if (i !== 1) {
			html += '<span class="page-numbers">...</span>';
		} 
		for (i; i<=total_page; i++) {
			if (page == i) { 
				html += '<span class="page-numbers current">'+i+'</span>';
			}else {
				html += '<a class="page-numbers" href="'+url+'/?page='+i+'">'+i+'</a>';
			} 
			if (i == (+page + 4)) {
				html += '<span class="page-numbers">...</span>';
				break 
			} 
		} 
		if (page != total_page){ 
			html += '<a class="page-numbers" href="'+url+'/?page='+total_page+'">&raquo;</a>';
		} 
		html += '</div>';
	}  
	return html;
}