<template>
  <div class="aquariumSettings">
    <h1>Aquarium Settings</h1>
    <v-layout>
      <Aquarium id="aquarium">#</Aquarium>
    </v-layout>
    <!-- <v-layout>
      <v-list-tile two-line
        v-for="option in options"
        :key="option.title"
        router :to="option.routingTo">


      <v-list-item-content >
        <v-list-item-avatar>          
          <v-img :src="option.source" height="120" width="120"/>
        </v-list-item-avatar>
        <v-list-item-subtitle><h4 class="primary">{{ option.title }}</h4></v-list-item-subtitle>
      </v-list-item-content>
          
      </v-list-tile>
    </v-layout> -->

  </div>
</template>

<script>
// @ is an alias to /src
import Aquarium from '@/components/Aquarium.vue'
export default {
  name: 'aquariumSettings',
  components: {
    Aquarium,
  },
  data: () => ({
    hieght: 0,
    width: 0,
    length: 0,
    aquariumTypes: ['Freshwater','Marine'],
    aquariumType: aquariumTypes,
    
  }),
}
</script>