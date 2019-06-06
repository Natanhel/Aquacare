<template>
    <div class="confirmEmail">
        <h3>Please check your email: '{{ email }}' for code confirmation:</h3>
        <input  v-model="keyUser" 
                maxlength="6" 
                minlength="6"
                title="Please enter your confirmation code"
                autofocus
                autocomplete="true"
                required
                @keypress.enter="login"
                placeholder="Confirmation Code"><br>
        <button @click="confirm"> Confirm </button>
    </div>
</template>

<script>
    import firebase from 'firebase'
    export default {
        name: 'confirmEmail',
        props: {
            genKey: '',
            // email: ''
        },
        data: () => ({
            keyUser: '',
            email: 'wat'
        }),
        methods: {
            confirm: function() {

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
