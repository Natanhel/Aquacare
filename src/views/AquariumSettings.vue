<template>
  <div class="aquariumSettins">
  <loader v-show="!loaded"/>
    
  <div v-show="loaded">
    <h1>Aquarium Settings</h1>

    <!-- <v-card  flat>
    <button @click="aquariumNum--">
      <v-icon x-large>arrow_left</v-icon>
    </button> -->

    <v-btn @click="saveAquariums">
      <v-icon dark>save</v-icon>save
    </v-btn>

    <v-btn  bottom
            right @click="addAquarium">
      <v-icon>add</v-icon>add
    </v-btn>

    <v-btn  bottom
            right @click="deleteAll">
      <v-icon>delete</v-icon>delete all
    </v-btn>

    <!-- <button @click="aquariumNum++">
      <v-icon x-large>arrow_right</v-icon>
    </button>
    </v-card> -->

    <v-spacer/>
    <br/>


    <v-sheet
        class="mx-auto"
        elevation="8"
        max-width="1000">

        <v-slide-group
        v-model="model"        
          class="pa-4"
          prev-icon="arrow_left"
          next-icon="arrow_right"
          center-active
          show-arrows>

          <v-slide-item
            v-for="(value, index) in aquariums" :key="index"
            v-slot:default="{ active }">

            <v-card
              class="ma-4"
              height="100%"
              width="400">

              <Aquarium class="aquarium"
                        :aquariumTypeProp="value.aquariumType"
                        :Freshwater="value.Freshwater"
                        :Marine="value.Marine"
                        :index="index"
                        @deleteCurrentAquarium="deleteAquarium"
                        @changedCurrentParams="changedParams"
                        @changeType="changeType"/>

            </v-card>

          </v-slide-item>

        </v-slide-group>

      </v-sheet>

  </div>


  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase';
import Aquarium from '@/components/Aquarium.vue'
import Loader from '@/components/Loader.vue'

export default {
  name: 'aquariumSettings',
  components: {
    Aquarium,
    Loader,
  },
  created() {
    this.loaded = false;
    fetch('/aquariums').then(() => {
      // We fetch the user aquariums from the DB in order to initialize
      // user aquariums :)
      // var userAquariums = [];
      var db = firebase.firestore();
      var usersCollection = db.collection("aquariums");
      var userDocIDAndEmail = firebase.auth().currentUser.email;
      var currUserDoc = usersCollection.doc(userDocIDAndEmail);
      var userAquariums = [];

      //Data should be collected from DB, now we only need to orgenize the data
      //in our standard form of displaying.
      currUserDoc.get().then((doc) => {
        if  (doc.exists){          

          // console.log("Document data:", doc.data());
          var userData = JSON.parse(JSON.stringify(doc.data()))
          console.log(Object.keys(userData).length)

          for (var i = 0; i < Object.keys(userData).length; i++) {
            var aquariumTypeData = userData[i]['aquariumType'];

            var dataJSON = JSON.parse(JSON.stringify(userData[i]));
            delete dataJSON['aquariumType']
            if  (aquariumTypeData == 'Freshwater'){
              userAquariums.push({
                aquariumType: aquariumTypeData,
                Freshwater: dataJSON,
                Marine: JSON.parse(JSON.stringify(require("../assets/initAquariumParams.json").MarineParams)),
              });
            } else if (aquariumTypeData == 'Marine') {
              userAquariums.push({
                aquariumType: aquariumTypeData,
                Freshwater: JSON.parse(JSON.stringify(require("../assets/initAquariumParams.json").FreshwaterParams)),
                Marine: dataJSON,
              });
            } else {
              userAquariums.push({
                aquariumType: aquariumTypeData,
                Freshwater: JSON.parse(JSON.stringify(require("../assets/initAquariumParams.json").FreshwaterParams)),
                Marine: JSON.parse(JSON.stringify(require("../assets/initAquariumParams.json").MarineParams)),
              });
            }
          }
          userAquariums.forEach(el => {
            this.aquariums.push(el);
          })
          this.loaded = true;
        }
      })
    })
  },
  data: () => ({
    model: null,
    aquariums: [],
    aquariumNum: 0,
  }),
  mounted: {
    
  },
  methods: {
    deleteAquarium (index){      
      this.$delete(this.aquariums,index);
      // alert('Deleted aquarium succesfully, to confirm changes save your changes')
    },
    changeType (type, index){
      this.aquariums[index].aquariumType = type;
    },
    changedParams(propertyName,aquariumType,event,index){
      this.aquariums[index][aquariumType][propertyName] = event
    },
    deleteAll(){
      // this.aquariums.forEach((aquarium,index)=>{
      //   this.deleteAquarium(index)
      // })
      for (let index = this.aquariums.length-1; 
            index >= 0; index--) {
        this.deleteAquarium(index);
        
      }
    },
    saveAquariums: function(){
      var db = firebase.firestore();
      var usersCollection = db.collection("aquariums");
      // var currUserDoc = usersCollection.doc();
      var params = this.params;
      var email = firebase.auth().currentUser.email;

      var mainJSObj = {
        // userID: email,
        // aquariumType: this.aquariumType,
      };
      this.aquariums.forEach(function(value,index){
        var jsObj = {};

        if (value.aquariumType == "Freshwater"){
          jsObj = JSON.parse(JSON.stringify(value.Freshwater)); 
        } else {
          jsObj = JSON.parse(JSON.stringify(value.Marine));
        }
        
        jsObj['aquariumType'] = value.aquariumType

        mainJSObj[index] = jsObj
      })

      if(this.aquariums.length == 0){
        mainJSObj[0] = {}
      }


      console.log(mainJSObj);
      // Update DB with the new aquarium
      //TODO Check that all aquariums have aquarium types
      usersCollection.doc(email).set(mainJSObj)
      .then(function(){
        alert("Saved your Aquariums :)")
      });
    },
    addAquarium: function (){
      this.aquariums.push({
        aquariumType: "",
        Freshwater: JSON.parse(JSON.stringify(require("../assets/initAquariumParams.json").FreshwaterParams)),
        Marine: JSON.parse(JSON.stringify(require("../assets/initAquariumParams.json").MarineParams)),
      });
    },

    // userAquariums: function (){
      
    //   return [{
    //     aquariumType: "",
    //     Freshwater: JSON.parse(JSON.stringify(require("../assets/initAquariumParams.json").FreshwaterParams)),
    //     Marine: JSON.parse(JSON.stringify(require("../assets/initAquariumParams.json").MarineParams)),
    //   }]
    // },

    scroll_left() {
      let content = document.querySelector(".scrollable");
      content.scrollLeft -= 50;
    },
    scroll_right() {
      let content = document.querySelector(".scrollable");
      content.scrollLeft += 50;
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

.action_bar{
  padding: 20px;
  justify-content: center;
  align-content: center;
  align-items: center;    
}

.scrollable{
  overflow-x: scroll;
  /* margin-top: 20px; */
  /* height: 700px; */
  /* width: 100%; */
  overflow-y: disabled;
  animation: fadeIn 1s ease-in;
  max-width: 1000px;
  overflow: auto;
  /* min-height: 100%; */
  max-height: 100%;

  /* height: 640px;
  width: 300px; */
}


@keyframes fadeIn{
  0%{
    opacity: 0;
  }
  50%{
    opacity: 0.5;
  }
  100%{
    opacity: 1;
  }
}
</style>
