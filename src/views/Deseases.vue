<template>
  <div class="deseases">
    <h1 class="header">Deseases Index</h1>
    <div>
        <v-flex xs8 offset-xs2>
        <!-- <v-simple-table dense>
            <thead>
                <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Physical Symptoms</th>
                    <th class="text-left">Behavioral Signs</th>
                    <th class="text-left">Image</th>
                    <th class="text-left">Cause</th>
                    <th class="text-left">Treatment</th>
                    <th class="text-left">Note</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item, propertyName, index) in deseases" :key="index">
                <td>{{ propertyName }}</td>
                <td>{{ item.PhysicalSymptoms }}</td>
                <td>{{ item.BehavioralSigns }}</td>
                <td><v-img v-bind:src="item.Image" height="250px" width="250px"/></td>
                <td>{{ item.Cause }}</td>
                <td>{{ item.Treatment }}</td>                    
                <td>{{ item.Note }}</td>
                </tr>
            </tbody>
        </v-simple-table> -->

        <v-data-table
            :headers="headers"
            :items="deseases">
            <template v-slot:item.Image="{ item }">
                <v-img :src="item.Image"></v-img>
            </template>
            <template v-slot:item.PhysicalSymptoms="{ item }">
                <v-text-field :value="item.PhysicalSymptoms"></v-text-field>
            </template>
        </v-data-table>
            
        </v-flex>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Question from '@/components/Question.vue'
export default {
  name: 'deseases',
  components:{
    
  },
  data: () => ({
      headers: [
        { text: "Name", value: "Name" },
        { text: "Physical Symptoms", value: "Physical Symptoms"  },
        { text: "Behavioral Signs", value: "Behavioral Signs"  },
        { text: "Image", value: "Image" },
        { text: "Cause", value: "Cause" },
        { text: "Treatment", value: "Treatment" },
        { text: "Note", value: "Note" },
      ],
  }),
  computed: {
      PhysicalSymptoms(item) {
        //   var deseases = require('../assets/deseases.json')
          console.log(item)
          return item["PhysicalSymptoms"]
      },
      deseases(){
          var deseasesArr = []
          var jsonFile = require('../assets/deseases.json')
          Object.keys(jsonFile).forEach(element => {
              var currentEl = jsonFile[element]
              deseasesArr.push({
                Name: element,
                "Physical Symptoms": currentEl.PhysicalSymptoms,
                "Behavioral Signs": currentEl.BehavioralSigns,
                "Image": currentEl.Image,
                "Cause": currentEl.Cause,
                "Treatment": currentEl.Treatment,
                "Note": currentEl.Note,
              })
            //   deseasesArr[element].push(jsonFile[element]);
          });
          return deseasesArr
      }
  },
}
</script>

<style>
.header{
  align-content: center;
  align-self: center;
  
}
</style>