<template>
  <div class="deseases">
    <h1 class="header">Deseases Index</h1>
    <div>
        <v-flex xs8 offset-xs2>
        <!-- <v-simple-table dense class="table">
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
        <div v-if="!isMobile">
        <v-data-table 
            :headers="headers"
            :items="deseasesWeb">
            <template v-slot:item.Image="{ item }">
                <img :src="item.Image"/>
            </template>
        </v-data-table>
        </div>
        <div v-else>
        <v-list v-for="(desease, propertyName, indexDesease) in deseases" :key="indexDesease">
            
            <v-card class="mx-auto">
                <h1>{{ propertyName }}</h1>
                <v-img class="mx-auto" v-bind:src="desease.Image" height="200px" width="200px"/>
                <h4>Physical Symptoms</h4>
                <v-list v-for="(symptom, indexSymptom) in  desease.PhysicalSymptoms" :key="indexSymptom">
                    
                    <v-list-item-action>
                        <td>
                            {{symptom}}
                        </td>
                    </v-list-item-action>
                    
                </v-list>
                <h4>Behavioral Signs</h4>
                <v-list class="mx-auto" v-for="(symptom, index) in  desease.BehavioralSigns" :key="index">
                    
                    <v-list-item-action>
                        <td>
                            {{symptom}}
                        </td>
                    </v-list-item-action>
                </v-list>
                <h4>Cause</h4>

                <v-list-item-action>
                    <td>{{ desease.Cause }}</td>
                </v-list-item-action>
                <h4>Treatment</h4>

                <v-list-item-action>
                    <td>{{ desease.Treatment }}</td>
                </v-list-item-action>
            </v-card>
        </v-list>
        </div>
        </v-flex>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

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
    deseases: require('../assets/deseases.json')
    }),
    methods: {
        
    },
    computed: {
        isMobile() {
            if( screen.width <= 760 ) {
                return true;
            }
            else {
                return false;
            }
        },
        PhysicalSymptoms(item) {
        //   var deseases = require('../assets/deseases.json')
            console.log(item)
            return item["PhysicalSymptoms"]
        },
        deseasesWeb(){
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
</style>