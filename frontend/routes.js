// routes

export default function routeConfig(router) {
  router.map({  
    '/': {
      name: 'main',
      component: (resolve)=>{require(['./views/layout'],resolve)},
      subRoutes: {       
        '/index': {
          name: 'index',
          component: (resolve)=>{require(['./views/index'],resolve)}
        }, 
        '/post/:slug': {
          name: 'post_show',
          component: (resolve)=>{require(['./views/post_show'],resolve)}
        },
        '/category/:slug': {
          name: 'category_post',
          component: (resolve)=>{require(['./views/category_post'],resolve)}
        },
        '/tag/:slug': {
          name: 'tag_post',
          component: (resolve)=>{require(['./views/tag_post'],resolve)}
        },
        '/archives': {
          name: 'archives',
          component: (resolve)=>{require(['./views/archives'],resolve)}
        },
        '/404': {
          name: '404',
          component: (resolve)=>{require(['./views/404'],resolve)}
        }          
    }
  }  
}); 

  router.redirect({   
    '*': '/404',   
    '/': '/index'
  });

}