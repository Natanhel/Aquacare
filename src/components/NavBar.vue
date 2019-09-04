<template>
  <div class="NavBar">

    <v-toolbar light >
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon color="green" right>menu</v-icon>
      </v-app-bar-nav-icon>
      
      <v-spacer></v-spacer>
      
      <v-toolbar-title class="green--text">
        <span class="font-weight-light">Aquacare</span>
      </v-toolbar-title>
      

      <v-spacer></v-spacer>
      <a v-if="logged">
        <v-btn text color="green" v-on:click="log" router to="/login">        
          <span>{{ status_logged }}</span>
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
      </a>
    </v-toolbar>

    <a v-if="logged">
      <v-navigation-drawer app v-model="drawer" enable-resize-watcher absolute
      class="green lighten-5">

       <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            router :to="item.route">
            <div>
              <v-list-item-title class="green--text">
                <v-icon color="green">{{ item.icon }}</v-icon> {{ item.title }}
              </v-list-item-title>
            </div>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </a>

  </div>
</template>


<script>
import firebase from 'firebase';
export default {

  components: {
    firebase
  },
  name: 'NavBar',
  data: () => ({
    drawer: null,
    drawerWasClosed: false,
    logged: firebase.auth().currentUser != null,
    items: [
      { title: 'Home', icon: 'dashboard', route: '/login', action: '' },
      { title: 'Account', icon: 'account_box', route: '/account', action: '' },
      // { title: 'My Aquarium', icon: 'bubble_chart', route: '/aquariumSettings', action: '' },
      // { title: 'Find Desease', icon: 'find_in_page', route: '/categorizer', action: '' },
      // { title: 'Scheduler', icon: 'schedule', route: '/scheduler', action: '' },
      { title: 'Settings', icon: 'settings', route: '/settings', action: '' },
      { title: 'About', icon: 'gavel', route: '/aboutAuth', action: '' },
    ],
    color: 'primary',
    colors: [
      'primary',
        'blue',
        'success',
        'red',
        'teal',
    ],
    right: false,
    miniVariant: false,
    expandOnHover: true,
    background: true,
    status_logged: 'Log Out',
  }),
  methods: {
    log: function(){
      if  (firebase.auth().currentUser != null){        
        firebase.auth().signOut();
        this.$root.$emit('updateVisibility', false);
      } else {
        this.$root.$emit('updateVisibility', true);
      }
    },
  },
  mounted() {
    this.$root.$on('updateVisibility', (value) => {
      this.logged = value
      if  (value){
        console.log('user has logged in');
        this.$router.replace('home');
        this.status_logged = 'Log Out'
      } else {
        console.log('user has logged out');
        firebase.auth().signOut().then(() => {
          this.$router.replace('login');
        })
        //Delete all the data in $store
        this.$store.commit('destroyStore')
      }
    })
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

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>