<template>
  <div class="aquariumSettings">
    <h1>Aquarium Settings</h1>

    <v-container grid-list-xl class="scrollable">
      <v-layout v-bind="binding" fill-height="">
        <v-flex v-for="i in aquariums" :key="i">
          <Aquarium class="aquarium"/>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- <v-btn @click="addAquarium">Add Aquarium {{ this.aquariums }}</v-btn> -->
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
    aquariums: 5
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
       /* height: 80%; */
       width: 100%;
  }
</style>
