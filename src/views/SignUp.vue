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
                v-validate="'required|confirmed:password'"
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
            if (this.password == this.confirm_password) {
                firebase.auth().createUserWithEmailAndPassword(
                    this.email, this.password
                ).then(
                    (user) => {
                    // alert('Your account has been created!')

                        this.$router.replace('confirmEmail' + this.randomKey())
                        // this.$emit('update-visibility', true);
                    },
                    (err) => {
                        alert('Oops. ' + err.message)
                    }
                )
            } else {               
                alert('Passwords most match!');
            }   
        },

        randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },

        randomKey() {
            var i;
            var key;
            key = "" + this.randomNumber(1,9);
            for (i = 0; i < 5; i++) {
                key += this.randomNumber(0,9);  
            };
            return key;
        }
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
