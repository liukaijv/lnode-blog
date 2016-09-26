// routes

export default function routeConfig(router) {
  router.map({       
   '/login': {
    name: 'login',
    component: (resolve)=>{require(['./views/login'],resolve)}
  },
  '/main': {
    name: 'main',
    component: (resolve)=>{require(['./views/layout'],resolve)},
    subRoutes: {
      '/dashboard': {
        name: 'dashboard',
        component: (resolve)=>{require(['./views/dashboard'],resolve)}
      },
      // category
      '/category/index': {
        name: 'category_index',
        component: (resolve)=>{require(['./views/category/index'],resolve)}
      },
      '/category/create': {
        name: 'category_create',
        component: (resolve)=>{require(['./views/category/create'],resolve)}
      },
      '/category/:category_id/edit': {
        name: 'category_edit',
        component: (resolve)=>{require(['./views/category/edit'],resolve)}
      },
      // tag
      '/tag/index': {
        name: 'tag_index',
        component: (resolve)=>{require(['./views/tag/index'],resolve)}
      },
      '/tag/create': {
        name: 'tag_create',
        component: (resolve)=>{require(['./views/tag/create'],resolve)}
      },
      '/tag/:tag_id/edit': {
        name: 'tag_edit',
        component: (resolve)=>{require(['./views/tag/edit'],resolve)}
      },
      // post
      '/post/index': {
        name: 'post_index',
        component: (resolve)=>{require(['./views/post/index'],resolve)}
      },
      '/post/create': {
        name: 'post_create',
        component: (resolve)=>{require(['./views/post/create'],resolve)}
      },
      '/post/:post_id/edit': {
        name: 'post_edit',
        component: (resolve)=>{require(['./views/post/edit'],resolve)}
      }
    }
  },
});

  router.redirect({
    '*': '/login',       
    '/main': '/main/dashboard',       
  });

}