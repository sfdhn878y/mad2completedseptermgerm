<template>
    <Navbar />
    <h1>All Bookings</h1>
    <input v-model="query" placeholder="Search student or exam">
    <p>{{ message }}</p>
    <table>
        <thead>
            <tr>
                <th>Student</th>
                <th>Exam</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Examiner</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="booking in filtered" :key="booking.id">
                <td>{{ booking.student_name }}</td>
                <td>{{ booking.exam_name }}</td>
                <td><input type="date" v-model="booking.slot_date" :min="booking.exam_start_date" :max="booking.exam_end_date"></td>
                <td><input type="time" v-model="booking.slot_time"></td>
                <td>{{ booking.status }}</td>
                <td>{{ booking.examinor_name }}</td>
                <td>
                    <button @click="reschedule(booking)">Reschedule</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'

const bookings = ref([])
const query = ref('')
const message = ref('')
const filtered = computed(() => {
    const text = query.value.toLowerCase()
    return bookings.value.filter(booking => booking.student_name.toLowerCase().includes(text) || booking.exam_name.toLowerCase().includes(text))
})

const load = async () => {
    const response = await axios.get('http://127.0.0.1:5000/all_bookings')
    bookings.value = response.data.data
}
const reschedule = async (booking) => {
    const response = await axios.post(`http://127.0.0.1:5000/reschedule_slot/${booking.slot_id}`, {
        slot_date: booking.slot_date,
        slot_time: booking.slot_time,
        end_time: booking.end_time
    })
    message.value = response.data.message
    load()
}
onMounted(load)
</script>
