<template>
    <Navbar />
    <div>
        <h1>Examiner</h1>
        <p v-if="name">Welcome, {{ name }}</p>
        <div class="stats">
            <div class="stat"><strong>{{ stats.assigned }}</strong><span>Assigned exams</span></div>
            <div class="stat"><strong>{{ stats.slots }}</strong><span>Slots</span></div>
            <div class="stat"><strong>{{ stats.booked_students }}</strong><span>Booked students</span></div>
            <div class="stat"><strong>{{ stats.pending_evaluations }}</strong><span>Pending evaluations</span></div>
        </div>
        <p><a href="/view_booking">View Booking</a></p>
        <h2>{{ profile_id ? 'Edit Profile' : 'Create Profile' }}</h2>
    </div>
    {{ responce_frontend }}
    <form @submit.prevent="createProfile">
        <input type="text" v-model="address" placeholder="Address">
        <input type="text" v-model="phone" placeholder="Phone">
        <input type="text" v-model="department" placeholder="Department">
        <input type="text" v-model="past_experience" placeholder="Past Experience">
        <button type="submit">{{ profile_id ? 'Save Profile' : 'Create Profile' }}</button>
    </form>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const name = ref(localStorage.getItem('name') || '')
const address = ref('')
const phone = ref('')
const department = ref('')
const past_experience = ref('')
const profile_id = ref(null)
const responce_frontend = ref('')
const stats = ref({ assigned: 0, slots: 0, booked_students: 0, pending_evaluations: 0 })

const loadProfile = async () => {
    const response = await axios.post('http://127.0.0.1:5000/get_examinor_profile', {
        user_id: localStorage.getItem('user_id')
    })
    if (response.data.data) {
        profile_id.value = response.data.data.id
        address.value = response.data.data.address
        phone.value = response.data.data.phone
        department.value = response.data.data.department
        past_experience.value = response.data.data.past_experience
    }
}

const createProfile = async () => {
    const payload = {
        address: address.value,
        phone: phone.value,
        department: department.value,
        past_experience: past_experience.value,
        user_id: localStorage.getItem('user_id')
    }
    const response = profile_id.value
        ? await axios.post('http://127.0.0.1:5000/edit_examinor_profile', payload)
        : await axios.post('http://127.0.0.1:5000/create_examinor_profile', payload)
    responce_frontend.value = response.data.message
    loadProfile()
}

onMounted(async () => {
    loadProfile()
    const response = await axios.post('http://127.0.0.1:5000/examinor_stats', {
        examinor_id: localStorage.getItem('user_id')
    })
    stats.value = response.data.data
})
</script>
<style scoped>
.stats { display: flex; flex-wrap: wrap; gap: 12px; margin: 16px 24px; }
.stat { background: #fff; border: 1px solid #d1d5db; border-radius: 6px; padding: 16px 24px; min-width: 140px; }
.stat strong { display: block; font-size: 28px; }
</style>
