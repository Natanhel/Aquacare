<template>
  <div class="aquarium">
    <v-app>
      <v-card color="#F9F9F9" width="400px">
        <v-container fluid class="green lighten-5">
          <v-layout wrap align-center>
            <v-flex xs6>
              <v-subheader class="green--text">Aquarium type</v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-select v-model="aquariumType" :items="aquariumTypes" label="Select" single-line />
            </v-flex>
          </v-layout>
        </v-container>
        <v-flex class="card">
          <v-container fluid grid-list-sm>
            <v-layout wrap>
              <v-flex v-for="(param, index) in params" :key="index" xs6>
                <v-text-field :label="param.name">{{ param.value }}</v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
            </v-layout>
          </v-container>
        </v-flex>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "aquarium",
  computed: {
    params: function() {
      if (this.aquariumType === "Freshwater") {
        return this.FreshwaterParams;
      } else if (this.aquariumType === "Marine") {
        return this.MarineParams;
      }
    }
  },
  data: () => ({
    hieght: 0,
    width: 0,
    length: 0,
    aquariumTypes: ["Freshwater", "Marine"],
    aquariumType: "",
    FreshwaterParams: [
      { name: "Temperature", value: Number },
      { name: "pH", value: Number },
      { name: "Ammonia", value: Number },
      { name: "Nitrite", value: Number },
      { name: "Nitrate", value: Number },
      { name: "Alkalinity", value: Number },
      { name: "General Hardness", value: Number }
    ],
    MarineParams: [
      { name: "Specific Gravity", value: Number },
      { name: "Temperature", value: Number },
      { name: "pH", value: Number },
      { name: "Alkalinity", value: Number },
      { name: "Ammonia (NH3)", value: Number },
      { name: "Nitrite (NO2)", value: Number },
      { name: "Nitrate", value: Number },
      { name: "Phosphate (PO4)", value: Number },
      { name: "Calcium", value: Number },
      { name: "Magnesium", value: Number },
      { name: "Iodine", value: Number },
      { name: "Strontium", value: Number }
    ]
  })
};
</script>

<style>
</style>
