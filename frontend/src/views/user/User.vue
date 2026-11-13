<template>
    <Navbar />
    <div>
        <h1>Student</h1>
        <div class="stats">
            <div class="stat"><strong>{{ stats.available_exams }}</strong><span>Available exams</span></div>
            <div class="stat"><strong>{{ stats.available_slots }}</strong><span>Available slots</span></div>
            <div class="stat"><strong>{{ stats.upcoming }}</strong><span>Upcoming</span></div>
            <div class="stat"><strong>{{ stats.booked }}</strong><span>Booked</span></div>
            <div class="stat"><strong>{{ stats.results }}</strong><span>Published results</span></div>
        </div>
        <p><a href="/see_examination">Examinations</a> <a href="/my_booking">Bookings</a> <a
                href="/my_results">Results</a></p>
        <h2>My examinations</h2>
        <table border="1">
            <thead>
                <tr>
                    <th>Exam</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Meet link</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="examinations.length === 0">
                    <td colspan="4">No booked examination</td>
                </tr>
                <tr v-for="exam in examinations" :key="exam.id">
                    <td>{{ exam.name }}</td>
                    <td>{{ exam.slot_date }}</td>
                    <td>{{ exam.slot_time }}</td>
                    <td><a v-if="exam.meeting_link" :href="exam.meeting_link" target="_blank">Join</a></td>
                </tr>
            </tbody>
        </table>
        <h2>{{ profile_id ? 'Edit Profile' : 'Create Profile' }}</h2>
    </div>
    {{ message }}
    <form @submit.prevent="submitForm">
        <input v-model="address" placeholder="Address" />
        <input v-model="phone" placeholder="Phone" />
        <input v-model="past_experience" placeholder="Past Experience" />
        <button type="submit">{{ profile_id ? 'Edit Profile' : 'Create Profile' }}</button>
    </form>
    <h2>Examination history</h2>
    <button type="button" @click="exportHistory" :disabled="exporting">Export examination history</button>
    <p>{{ exportMessage }}</p>
    <p v-if="downloadUrl"><a :href="downloadUrl">Download CSV</a></p>
    <h3>Alerts</h3>
    <p v-if="alerts.length === 0">No alerts</p>
    <ul>
        <li v-for="alert in alerts" :key="alert.id">{{ alert.created_at }} — {{ alert.message }}</li>
    </ul>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const address = ref('')
const phone = ref('')
const past_experience = ref('')
const message = ref('')
const profile_id = ref(null)
const stats = ref({ available_exams: 0, available_slots: 0, upcoming: 0, booked: 0, results: 0 })
const examinations = ref([])
const alerts = ref([])
const exportMessage = ref('')
const downloadUrl = ref('')
const exporting = ref(false)




const loadAlerts = async () => {
    const response = await axios.post('http://127.0.0.1:5000/my_alerts', {
        user_id: localStorage.getItem('user_id')
    })
    alerts.value = response.data.data || []
}
const exportHistory = async () => {
    exporting.value = true
    downloadUrl.value = ''
    exportMessage.value = 'Export started. You will get an alert when the CSV is ready.'
    const userId = localStorage.getItem('user_id')
    const response = await axios.post('http://127.0.0.1:5000/export_examination_history', {
        user_id: userId
    })
    exportMessage.value = response.data.message
    const jobId = response.data.job_id
    const timer = setInterval(async () => {
        const status = await axios.post('http://127.0.0.1:5000/export_job_status', {
            user_id: userId,
            job_id: jobId
        })
        if (status.data.status === 'completed') {
            clearInterval(timer)
            exporting.value = false
            exportMessage.value = status.data.message
            downloadUrl.value = 'http://127.0.0.1:5000/download_examination_history/' + jobId + '?user_id=' + userId
            loadAlerts()
        }
        if (status.data.status === 'failed') {
            clearInterval(timer)
            exporting.value = false
            exportMessage.value = status.data.message
            loadAlerts()
        }
    }, 1000)
}


const getProfile = async () => {
    const response = await axios.post('http://127.0.0.1:5000/get_user_profile', {
        user_id: localStorage.getItem('user_id')
    })
    if (response.data.data) {
        profile_id.value = response.data.data.id
        address.value = response.data.data.address
        phone.value = response.data.data.phone
        past_experience.value = response.data.data.past_experience
    }
}

const submitForm = async () => {
    const payload = {
        address: address.value,
        phone: phone.value,
        past_experience: past_experience.value,
        user_id: localStorage.getItem('user_id')
    }
    const response = profile_id.value
        ? await axios.post('http://127.0.0.1:5000/edit_user_profile', payload)
        : await axios.post('http://127.0.0.1:5000/user/submitForm', payload)
    message.value = response.data.message
    getProfile()
}

onMounted(async () => {
    getProfile()
    loadAlerts()
    const response = await axios.post('http://127.0.0.1:5000/student_dashboard', {
        user_id: localStorage.getItem('user_id')
    })
    stats.value = response.data.data
    examinations.value = response.data.data.examinations || []
})
</script>
<style scoped>
.stats {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 16px 24px;
}

.stat {
    background: #fff;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 16px 24px;
    min-width: 140px;
}

.stat strong {
    display: block;
    font-size: 28px;
}
</style>
