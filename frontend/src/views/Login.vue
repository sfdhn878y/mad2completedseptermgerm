<template>
    <Navbar />
    <div>
        <h1>Login</h1>
    </div>
    <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email">
        <input type="password" v-model="password" placeholder="Password">
        <button type="submit">Login</button>
    </form>
  <p v-if="error">{{ error }}</p>
  <p v-if="response_data">{{ response_data }}</p>
  <p v-if="token">Token saved. {{ token }}</p>
</template>

<script setup>

import Navbar from './components/Navbar.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const response_data = ref('')
const token = ref('')
const login = async () =>{
    error.value = ''
    response_data.value = ''
    token.value = ''
    try{
        const response = await axios.post(
            "http://127.0.0.1:5000/login",
            {
                email:email.value,
                password:password.value
            }
        )
        response_data.value = response.data.message
        if (response.data.token) {
            token.value = response.data.token
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('role', response.data.role)
            localStorage.setItem('name', response.data.name)
            localStorage.setItem('user_id', response.data.user_id)
            if (response.data.role === 'admin') {
                router.push('/admin')
            } else if (response.data.role === 'examinor') {
                router.push('/examinor')
            } else if (response.data.role === 'user') {
                router.push('/user')
            }
        }
    }catch(err){
        error.value = err.response && err.response.data ? err.response.data.message : 'Login failed'
    }
}

</script>

