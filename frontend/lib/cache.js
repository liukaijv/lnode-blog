import _ from 'lodash';

function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}

export function each(obj, iterator) {

    var i, key;

    if (obj && typeof obj.length == 'number') {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

export function when(value, fulfilled, rejected) {

    var promise = Promise.resolve(value);

    if (arguments.length < 2) {
        return promise;
    }

    return promise.then(fulfilled, rejected);
}

export default function (Vue){
    Vue.http.interceptors.push((request, next) => {

        let cached, key, lifetime; 

        if(request.cache !== undefined && /^(GET|JSONP)$/i.test(request.method)) {

            if (_.isObject(request.cache)) {
                lifetime = request.cache.lifetime;
                key = '_resource.' + request.cache.key;
            } else {
                lifetime = request.cache;
                key = request.url;
            }

            cached = Vue.cache.get(key);  

            if (cached) {                
                // 重写返回数据
                request.client = function (request) {
                    return request.respondWith(cached.body, {ok: true, status:200});
                };
            }
        }

        next((response) => {   
            if (!cached && response.ok) {
                Vue.cache.set(key, response, lifetime);
            }

        });
    });
}