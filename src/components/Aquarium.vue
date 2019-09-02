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
            <v-flex v-for="(param, propertyName, index) in params" :key="index" xs6>
              <v-text-field @change="onChangedParams(propertyName,$event)" :label="propertyName" :value="param"></v-text-field>
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
        return this.Freshwater;
      } else if (this.aquariumType === "Marine") {
        return this.Marine;
      }
    }
  },
  props: {
    aquariumTypeProp: {
      type: String,
      required: true
    },
    Freshwater: {
      type: Object,
      required: true
    },
    Marine: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  created: function() {
    console.log('Creating a new aquarium')
    // aquariumType = this.aquariumTypeProp;
    // FreshwaterParams = this.Freshwater;
    // MarineParams = this.Marine;    
  },
  data () {
    return{
      hieght: 0,
      width: 0,
      length: 0,
      email: '',
      aquariumID: this.index,
      aquariumTypes: ["Freshwater", "Marine"],
      aquariumType: this.aquariumTypeProp,     
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
      onChangedParams: function (propertyName,event) {
        // this.params[propertyName] = event;
        this.$emit('changedCurrentParams',propertyName,this.aquariumType,event,this.aquariumID)
      }
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
