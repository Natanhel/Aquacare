import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';



Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    // {
    //   path: '*',
    //   name: 'Login',
    //   component: Login,
    //   // component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      // component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      },
      // component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/aboutAuth',
      name: 'about',
      meta: {
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      // component: () => import(/* webpackChunkName: "about" */ './views/SignUp.vue')
    },
    {
      path: '/*',
      name: 'Login',
      component: Login,
      // component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },

  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if  (requiresAuth && !currentUser) next('/login');
  else if (!requiresAuth && currentUser) next('/home')
  else next();
});



export default router;