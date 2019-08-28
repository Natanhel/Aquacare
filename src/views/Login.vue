<template>
    <div class="login">
        <h2 style="color: green;">Sign In</h2>
          <v-form>
            <v-container grid-list-xl>
                <v-layout wrap justify-center>
                    <v-flex xs3/>
                    <v-flex xs6>
                        <div class="loginInput">
                        <v-text-field  v-model="email" 
                                maxlength="256" 
                                minlength="4"
                                title="Please enter your email"
                                autofocus
                                autocomplete="true"
                                required
                                @keypress.enter="login"
                                :rounded="rounded"
                                :outlined="outlined"
                                :clearable="clearable"
                                outlines
                                placeholder="E-mail"/>
                                </div>
                                </v-flex>                        
                    <v-flex xs3/>

                    <v-flex xs3/>
                    <v-flex xs6>

                    <div class="loginInput">
                    <v-text-field  v-model="password" 
                            maxlength="16" 
                            minlength="6"
                            title="Please enter your password"
                            autocomplete="true"
                            required
                            placeholder="Password"
                            :rounded="rounded"
                            :outlined="outlined"
                            :clearable="clearable"
                            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                            :type="showPassword ? 'text' : 'password'"                            
                            outlines
                            @click:append="showPassword = !showPassword"
                            @keypress.enter="login"/>
                    </div>
                    </v-flex>
                    <v-flex xs3/>

                    <v-flex xs4/>
                    <v-flex xs4>
                        <v-btn color="green lighten-2" @click="login"> Connect </v-btn>
                    </v-flex>
                    <v-flex xs4/>
                    <h4>Don't have an account? 
                        <router-link to="/signup">Create one now</router-link>
                    </h4>
                    <v-flex xs12>
                        <h4>
                            <router-link to="/pwdReset">Forgot passweord?</router-link>
                        </h4>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'login',

    data: () => ({
        rounded: true,
        outlined: true,
        clearable: false,
        password: 'Password',
        showPassword: false,
        email: '',
        password: '',
        userExistsInDB: false,
    }),
    methods: {
        confirmDBLogin: function() {
            var db = firebase.firestore();
            var usersCollection = db.collection("users");
            var currUserDoc = usersCollection.doc(this.email);

            currUserDoc.get().then((doc) => {
                if(doc.exists){
                    console.log("user data found, loading preferences");
                    // console.log("loaded user: " + doc.data().userID + "\n" +
                    //             "loaded theme: " + doc.data().userTheme);
                    ///TODO set these preferences
                } else {
                    console.log("user data not found, setting up first time preferences");
                    currUserDoc.set({
                        userID: this.email,
                        userTheme: 1,
                    });
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });;

        },
        login: function() {
            if  (this.email != '' && this.password != '')
            firebase.auth().signInWithEmailAndPassword(
                this.email,
                this.password
            ).then(
                (user) => {
                    // alert('Welcome back');
                    if(!user.user.emailVerified) {
                        firebase.auth().signOut()
                        alert('Please confirm your email!')
                        return
                    }

                    this.confirmDBLogin();

                    this.$router.push('home');
                    // console.log('Trying to change logged status...');
                    this.$root.$emit('updateVisibility', true);
                },
                (err) =>{
                    alert('Oops. ' + err.message)
                }
            );
            // this.$router.replace('home');
        }
    }
}
    
</script>

<style scoped>
    .login {
        margin-top: 4%;
    }
    input {
        margin: 1%;
        width: 20%;
        padding: 1%;
    }
    .button {
        margin-top: 15%;
        /* width: 2%;  */
        cursor: pointer;
        text-decoration-color: green;
    }
    p {
        margin-top: 4%;
        font-size: 80%;
    }
    p a {
        text-decoration: underline;
        cursor: pointer;
    }
  .loginInput {
    height: 50px;
  }

  .item {
    min-height: 50px;
    min-width: 80px;
    margin: 10px;
  }
</style>
