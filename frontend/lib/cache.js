import _ from 'lodash';

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

            let no_cache = request.params.no_cache;
            
            cached = Vue.cache.get(key); 

            if (cached && !no_cache) {                
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