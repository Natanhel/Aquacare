import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';
import Account from './views/Account.vue';
import AquariumSettings from './views/AquariumSettings.vue';
import Categorizer from './views/Categorizer.vue';
import Scheduler from './views/Scheduler.vue';
import Settings from './views/Settings.vue';
import Deseases from './views/Deseases.vue';



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
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      },
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
      path: '/account',
      name: 'Account',
      component: Account,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/aquariumSettings',
      name: 'AquariumSettings',
      component: AquariumSettings,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/deseases',
      name: 'Deseases',
      component: Deseases,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/categorizer',
      name: 'Categorizer',
      component: Categorizer,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/scheduler',
      name: 'Scheduler',
      component: Scheduler,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        requiresAuth: true
      },
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