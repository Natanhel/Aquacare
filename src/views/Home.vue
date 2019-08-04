<template>
  <div class="home">
    <v-container fill-height> 
    <v-layout row wrap align-center>
      <v-list
        v-for="(page, index) in pages"
        :key="index">
          <v-list-item router :to="page.router">
            <v-list-item-title>
              <v-flex>
                <v-img :src="page.imgSrc" height="140" width="140"/>
                <h4 color="green">{{ page.name }}</h4>
              </v-flex>
            </v-list-item-title>
          </v-list-item>
      </v-list>
    </v-layout>
    </v-container>
  </div>
</template>

<script>

import firebase from 'firebase';
export default {

  components: {
    firebase,
  },
  data: () => ({
    pages: [
      { name: 'Aquariums',      imgSrc: require('../assets/002-aquarium-1.svg'), router: '/AquariumSettings'},
      { name: 'Search Desease', imgSrc: require('../assets/015-healthcare-and-medical-1.svg'), router: '/Categorizer'},
      { name: 'Scheduler',      imgSrc: require('../assets/020-schedule.svg'), router: '/Scheduler'},
    ]
  }),
};
</script>
