<template>
  <div id="app">
     <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0">  -->
    <div id="nav">
      <a v-if="logged"><router-link to="/home">Home</router-link> | </a>     
      <a v-else><router-link to="/login">Login</router-link> | </a>
      <router-link to="/about">About</router-link>
    </div>
    <transition name="moveInUp">
      <router-view @update-visibility="updateVisibility"/>
    </transition>
  </div>
</template>


<script>
import firebase from 'firebase';
export default {
  data: function() {
    return {
      logged: firebase.auth().currentUser != null
    }
  },
  methods: {
    updateVisibility(value) {
      this.logged = firebase.auth().currentUser != null;
      if  (value){
        console.log('user has logged in');
      } else {
        console.log('user has logged out');
      }
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.moveInUp-enter-active{
  animation: fadeIn 0.5s ease-in;
}
@keyframes fadeIn{
  0%{
    opacity: 0;
  }
  50%{
    opacity: 0.5;
  }
  100%{
    opacity: 1;
  }
}
</style>
