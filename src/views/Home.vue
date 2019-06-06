<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Schedule msg="Welcome to Your AquaCare schedule"/>
    <button @click="logut">Log Out</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Schedule from '@/components/Schedule.vue';
import firebase from 'firebase';
// import login from '@/views/Login.vue'

export default {
  name: 'home',
  components: {
    Schedule
    // login
  },
  methods: {
    logut: function(){
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
        // firebase.auth().currentUser.email = ""
        this.$emit('update-visibility', false)
      })
    }
  }
}
</script>
