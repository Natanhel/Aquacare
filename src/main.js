
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'

import VueFire from 'vuefire'
import 'firebase/firestore'
// import '../node_modules/vuetify/dist/vuetify.min.css';

// import colors from 'vuetify/es5/util/colors'
import router from './router'
// import store from './store'
import firebase from 'firebase'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Vuetify);
// Vue.use(VueFire);

// export default new Vuetify({
//   primary: colors.light-green.base,
//   secondary: colors.green.base,
//   accent: colors.lime.base,
//   error: colors.deep-orange.base,
//   warning: colors.orange.base,
//   info: colors.blue.base,
//   success: colors.indigo.base
// })


require("firebase/firestore");

const store = new Vuex.Store({
  state: {
    aquariumsBuffer: []
  },
  getters: {
    aquariumsBuffer: (state) => {
      return state.aquariumsBuffer
    }
  },
  mutations: {
    aquariumsSave2Buffer (state,aquariums) {
      state.aquariumsBuffer = aquariums
    }
  }
})

let app = '';

firebase.initializeApp({
  apiKey: 'AIzaSyCg57nOXIAq0ELJxx5wTQBwZF-GgDVKpUc ',
  authDomain: 'aquacare-3cdce.firebaseapp.com',
  databaseURL: 'https//aquacare-3cdce.firebaseio.com',
  projectId: 'aquacare-3cdce',
  storageBucket: 'aquacare-3cdce.appspot.com',
  messagingSenderId: '794228416189'
});


var db = firebase.firestore();


firebase.auth().onAuthStateChanged(() => {
  if  (!app) {
    app = new Vue({
      router,
      store,
      firebase,
      vuetify,
      render: h => h(App),
      created() {

      },
    }).$mount('#app')
  }
});