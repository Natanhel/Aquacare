import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import firebase from 'firebase'


Vue.config.productionTip = false

let app = '';

firebase.initializeApp({
  apiKey: 'AIzaSyCg57nOXIAq0ELJxx5wTQBwZF-GgDVKpUc ',
  authDomain: 'aquacare-3cdce.firebaseapp.com',
  databaseURL: 'https//aquacare-3cdce.firebaseio.com',
  projectId: 'aquacare-3cdce',
  storageBucket: 'aquacare-3cdce.appspot.com',
  messagingSenderId: '794228416189'
});

firebase.auth().onAuthStateChanged(() => {
  if  (!app) {
    app = new Vue({
      router,
      store,
      
      render: h => h(App)
    }).$mount('#app')
  }
});

var user = firebase.auth().currentUser;

if (user) {
  // User is signed in.
  this.$router.replace('home')
} else {
  // No user is signed in.
  this.$router.replace('login')
}
