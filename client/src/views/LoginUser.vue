<template>
    <div>
    <form @submit.prevent="login">
        <label for="email">
        Email:
        </label>
        <input v-model="email" type="email" name="email" value>
        
        <label for="password">
        Password:
        </label>
        <input v-model="password" type="password" name="password" value>
    
        <button type="submit" name="button">
        Login
        </button>
        <p>{{ errors }}</p>
    </form>
    </div>
</template>

<script>

export default {
    name: 'LoginUser',

    data () {
        return {
            email: '',
            password: '',
            errors: []
        }
    },

    methods: {
        login() {
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            }).then((data) => {
                if (data) {
                    this.errors = data
                } else {
                    this.$router.push({ name: 'dashboard' })
                }
            }).catch(error => this.errors = error)
        }
    }
}
</script>