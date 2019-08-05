<template>
  <div class="aquariumSettings">
    <h1>Aquarium Settings</h1>

    <v-btn fab @click="addAquarium">
      <v-icon dark>add</v-icon>
    </v-btn>
    <v-container grid-list-xl class="scrollable">
      <v-layout v-bind="binding">
        <v-flex v-for="i in aquariums" :key="i">
          <Aquarium class="aquarium"/>
        </v-flex>
      </v-layout>
    </v-container>
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
    aquariums: 1
  }),
  methods: {
    addAquarium: function (){
      this.aquariums = this.aquariums + 1
    },
  },
  computed: {
    binding () {
      const binding = {}

      if (this.$vuetify.breakpoint.mdAndUp) binding.column = false

      return binding
    },
  },
}
</script>

<style>

.aquariumSettings {
  overflow-x: scroll;

}

.scrollable{
       /* margin-top: 20px; */
       /* height: 700px; */
       width: 100%;
       overflow-y: disabled;
        
  }
</style>
