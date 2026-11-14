<template>
    <Navbar />
    <h1>All Examiner Slots</h1>
    <input v-model="query" placeholder="Search examiner or exam">
    <p v-if="filtered.length === 0">No slots</p>
    <table v-else>
        <thead>
            <tr>
                <th>Examiner</th>
                <th>Exam</th>
                <th>Date</th>
                <th>Start</th>
                <th>End</th>
                <th>Capacity</th>
                <th>Available</th>
                <th>Status</th>
                <th>Booked by</th>
                <th>Meeting link</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="slot in filtered" :key="slot.id">
                <td>{{ slot.examinor_name }}</td>
                <td>{{ slot.exam_name }}</td>
                <td>{{ slot.slot_date }}</td>
                <td>{{ slot.slot_time }}</td>
                <td>{{ slot.end_time }}</td>
                <td>{{ slot.capacity }}</td>
                <td>{{ slot.available }}</td>
                <td>{{ slot.status }}</td>
                <td>{{ slot.booked_by }}</td>
                <td>{{ slot.meeting_link }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'

const slots = ref([])
const query = ref('')
const filtered = computed(() => {
    const text = query.value.toLowerCase()
    return slots.value.filter(slot => slot.examinor_name.toLowerCase().includes(text) || slot.exam_name.toLowerCase().includes(text))
})

const load = async () => {
    const response = await axios.get('http://127.0.0.1:5000/all_examiner_slots')
    slots.value = response.data.data
}
onMounted(load)
</script>
