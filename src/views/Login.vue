<template>
    <div class="login">
        <h3 style="color: green;">Sign In</h3>
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
                            error
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
                    <p>Don't have an account? 
                        <router-link to="/signup">Create one now</router-link>
                    </p>
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
        }),
        methods: {
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
                        this.$router.push('home');
                        console.log('Trying to change logged status...');
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
