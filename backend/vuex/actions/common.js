import { 
	PAGE_CHANGE
} from '../mutation-types';

export const pageAction = function(store, module, page){	
	store.dispatch('PAGE_CHANGE', module, page);		
}

export const uploadAction = function(file, options = {url:'api/upload'}){
	let form = new FormData(),
	xhr = new XMLHttpRequest();
	try {
		form.append('Content-Type', file.type || 'application/octet-stream');
		form.append('file', file);
		if (options.params) {
			for (let param in options.params) {
				form.append(param, options.params[param]);
			}
		}
	} catch (e) {		
		return;
	}

	return new Promise(function(resolve, reject){
		xhr.onreadystatechange = function () {
            if (xhr.readyState < 4) {
                return;
            }
            if (xhr.readyState < 400) {
                let res = JSON.parse(xhr.responseText);               
                resolve(res);
            } else {
                let err = JSON.parse(xhr.responseText);
                err.status = xhr.status;
                err.statusText = xhr.statusText;               
                reject(err);
            }
        };
        xhr.onerror = function () {
            let err = JSON.parse(xhr.responseText);
            err.status = xhr.status;
            err.statusText = xhr.statusText;           
            reject(err);
        };
        xhr.open('POST', options.url, true);
        if (options.headers) {
            for (let header in options.headers) {
                xhr.setRequestHeader(header, options.headers[header])
            }
        }
        xhr.send(form);
	});
}