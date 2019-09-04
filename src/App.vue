<template>
  <div id="app">

    <v-app >
      <NavBar app/>
      <!-- <v-flex fill-height="true"> -->
        <transition name="moveInUp">
          <v-layout row wrap align-center justify-center>
            <router-view/>
          </v-layout>
        </transition>
      <!-- </v-flex> -->
    </v-app>

  </div>
</template>


<script>
import firebase from 'firebase';
import NavBar from './components/NavBar.vue'
export default {
  components: {
    NavBar,
    firebase
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