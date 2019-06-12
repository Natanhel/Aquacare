<template>
    <div class="signup">
        <h3>Let's create a new account!</h3>
        <input  v-model="email" 
                maxlength="64" 
                minlength="4"
                title="Please enter your email"
                autofocus
                autocomplete="true"
                required
                placeholder="E-mail"><br>
        <input  v-model="password" 
                maxlength="16" 
                minlength="6"
                type="password"
                title="Please enter your password"
                autocomplete="true"
                required
                placeholder="Password"><br>
        <input  v-model="confirm_password" 
                
                maxlength="16" 
                minlength="6"
                type="password"
                title="Please enter your password"
                autocomplete="true"
                required
                placeholder="Confirm Password"><br>
        <a v-bind:style="{color: 'red'}" v-if="confirm_password!='' && password!=confirm_password">Passwords most match!</a>
        <br>
        <button @click="signup"> Sign Up </button>
        <span> go back to <router-link to="login">login</router-link></span>
    </div>
</template>

<script>
import firebase from 'firebase'
// import func from '../../vue-temp/vue-editor-bridge';
export default {
    name: 'signup',
    data: () => ({
        email: '',
        password: '',
        confirm_password: '' 
    }),
    methods: {
        signup: function() {
            if (this.password.localeCompare(this.confirm_password) == 0) {
                // firebase.auth().sendSignInLinkToEmail

                var actionCodeSettings = {
                    // URL you want to redirect back to. The domain (www.example.com) for this
                    // URL must be whitelisted in the Firebase Console.
                    // url: window.location.host + '/confirmEmail',
                    url: 'https://aquacare-3cdce.firebaseapp.com/confirmEmail',
                    
                    // This must be true.
                    handleCodeInApp: true,
                    // iOS: {
                    //     bundleId: 'com.example.ios'
                    // },
                    // android: {
                    //     packageName: 'com.example.android',
                    //     installApp: true,
                    //     minimumVersion: '12'
                    // },
                    // dynamicLinkDomain: 'example.page.link'
                };


                // Create the email onto the firebase server
                firebase.auth().createUserWithEmailAndPassword(
                    this.email, this.password
                ).then(
                    (user) => {
                        console.log('Account created') 

                        var user2 = firebase.auth().currentUser;
                        if  (user2 && !user){
                            user = user2
                        } else if (!user && !user2){
                            return
                        }
                        user.user.sendEmailVerification().then(
                            function() {
                            console.log('Email sent.')
                        }).catch(function(error) {
                            console.log('Oops. ' + error.message)
                        });
                        },
                    (err) => {
                        alert('Oops. ' + err.message)
                    }
                )



                // firebase.auth().currentUser.sendEmailVerification().then(
                //     function() {
                //     console.log('Email sent.')
                // }).catch(function(error) {
                //     console.log('Oops. ' + error.message)
                // });

                firebase.auth().signOut()
                
                // this.$router.replace('confirmEmail')
            }   
        },
    },
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
    button {
        margin-top: 2%;
        /* width: 10%; */
        cursor: pointer;
    }
    p {
        margin-top: 4%;
        font-size: 80%;
    }
    p a {
        text-decoration: underline;
        cursor: pointer;
    }
</style>
