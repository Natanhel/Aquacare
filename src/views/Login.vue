<template>
    <div class="login">
        <h3>Sign In:</h3>
        <input  v-model="email" 
                maxlength="256" 
                minlength="4"
                title="Please enter your email"
                autofocus
                autocomplete="true"
                required
                @keypress.enter="login"
                placeholder="E-mail"><br>
        <input  v-model="password" 
                maxlength="16" 
                minlength="6"
                type="password"
                title="Please enter your password"
                autocomplete="true"
                required
                placeholder="Password"
                @keypress.enter="login"><br>
        <button @click="login"> Connect </button>
        <p>Don't have an account? 
            <router-link to="/signup">Create one now
            </router-link></p>
    </div>
</template>

<script>
    import firebase from 'firebase'
    export default {
        name: 'login',
        props: {
            email: '',
            password: ''
        },
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
                        this.$router.replace('home');
                        console.log('Trying to change logged status...');
                        this.$emit('update-visibility', true);
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
