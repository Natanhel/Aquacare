<template>
  <div class="aquarium">
    <v-app>
      <v-card color="#F9F9F9" width="400px">

          <v-flex>            
              <v-btn @click="deleteAquarium">  
                  <v-icon dark >delete</v-icon>Delete
              </v-btn>
              <!-- <v-spacer></v-spacer> -->
              <!-- <v-btn @click="saveAquarium">
                  <v-icon>save</v-icon>Save
              </v-btn> -->
          </v-flex>
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
          <!-- <v-container fluid grid-list-sm> -->
          <v-layout wrap>
            <v-flex v-for="(param, index) in params" :key="index" xs6>
              <v-text-field :label="param.name" v-model="param.value"></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
          </v-layout>
          <!-- </v-container> -->
        </v-flex>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: "aquarium",
  computed: {
    params: function() {
      this.onAquariumTypeChanged();
      if (this.aquariumType === "Freshwater") {
        return this.FreshwaterParams;
      } else if (this.aquariumType === "Marine") {
        return this.MarineParams;
      }
    }
  },
  props: {
    aquariumTypeProp: {
      type: String,
      required: true
    },
    Freshwater: {
      type: Array,
      required: true
    },
    Marine: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  // created: function() {
  //   console.log('Creating a new aquarium')
  //   aquariumType = this.aquariumTypeProp;
  //   FreshwaterParams = this.Freshwater;
  //   MarineParams = this.Marine;
    
  // },
  data () {
    return{
      hieght: 0,
      width: 0,
      length: 0,
      email: '',
      // showAquarium: true,
      aquariumID: this.index,
      aquariumTypes: ["Freshwater", "Marine"],
      aquariumType: this.aquariumTypeProp,
      //These exist during run time because we have a shallow copy on the component
      //instance from the JSON file called initAquariumParams
      // FreshwaterParams: [
      //   { name: "Temperature", value: 0 },
      //   { name: "pH", value: 0 },
      //   { name: "Ammonia (NH3)", value: 0 },
      //   { name: "Nitrite (NO2)", value: 0 },
      //   { name: "Nitrate (NO3)", value: 0 },
      //   { name: "Alkalinity", value: 0 },
      //   { name: "General Hardness", value: 0 }
      // ],
      // MarineParams: [
      //   { name: "Specific Gravity", value: 0 },
      //   { name: "Temperature", value: 0 },
      //   { name: "pH", value: 0 },
      //   { name: "Alkalinity", value: 0 },
      //   { name: "Ammonia (NH3)", value: 0 },
      //   { name: "Nitrite (NO2)", value: 0 },
      //   { name: "Nitrate (NO3)", value: 0 },
      //   { name: "Phosphate (PO4)", value: 0 },
      //   { name: "Calcium", value: 0 },
      //   { name: "Magnesium", value: 0 },
      //   { name: "Iodine", value: 0 },
      //   { name: "Strontium", value: 0 }
      // ]
    }
  },
  methods: {
      saveAquarium: function(){

        var db = firebase.firestore();
        var usersCollection = db.collection("aquariums");
        // var currUserDoc = usersCollection.doc();
        var params = this.params;
        var email = firebase.auth().currentUser.email;

        var jsObj = {
          userID: email,
          aquariumType: this.aquariumType,
        };

        params.forEach(function(param) {
            jsObj[param.name] = param.value;
        });


        console.log(jsObj);
        // Update DB with the new aquarium
        usersCollection.add(jsObj)
        .then(function(doc){
          console.log('Aquarium id is:' + doc.id);
          this.$root.emit('updateID',doc.id)
        });
      },
      deleteAquarium: function () {
        this.$emit('deleteCurrentAquarium',this.aquariumID);
      },
      onAquariumTypeChanged: function() {
        this.$emit('changeType',this.aquariumType,this.aquariumID);
      },
  },
  mounted() {
    this.$root.$on('setUserEmail', (value) => {
      this.email = value
    })
    console.log('Creating a new aquarium')
    this.aquariumType = this.aquariumTypeProp;
    this.FreshwaterParams = this.Freshwater;
    this.MarineParams = this.Marine;
  }
};
</script>

<style>
.aquarium {
  overflow: hidden;
  height: 78vh;
  width: 100%;
}
</style>
