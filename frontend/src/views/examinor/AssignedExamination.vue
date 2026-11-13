<template>
    <Navbar />
    <div>
        <h1>Assigned Examination</h1>

        <div class="table-wrap">
        <table border="1">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Course</th>
                    <th>Slot Start</th>
                    <th>Slot End</th>
                    <th>Booking Start</th>
                    <th>Booking End</th>
                    <th>Exam Start</th>
                    <th>Exam End</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="examinations.length === 0">
                    <td colspan="9">No examination assigned</td>
                </tr>
                <tr v-for="examination in examinations" :key="examination.id">
                    <td>{{ examination.name }}</td>
                    <td>{{ examination.exam_type }}</td>
                    <td>{{ examination.status }}</td>
                    <td>{{ examination.course_name }}</td>
                    <td>{{ examination.examinor_slot_create_start_date }}</td>
                    <td>{{ examination.examinor_slot_create_end_date }}</td>
                    <td>{{ examination.booking_start_time }}</td>
                    <td>{{ examination.booking_end_time }}</td>
                    <td>{{ examination.exam_start_date }}</td>
                    <td>{{ examination.exam_end_date }}</td>
                    <td>
                        <a v-if="can_create_slot(examination)" :href="'/create_slot/' + examination.id">Create Slot</a>
                        <span v-else>Outside slot dates</span>
                        <br>
                        <a :href="'/view_slot/' + examination.id">View Slot</a>
                        <br>
                        <button v-if="examination.status !== 'Completed'" @click="markCompleted(examination.id)">Mark completed</button>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const examinations = ref([])

const today = () => {
    const now = new Date()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${now.getFullYear()}-${month}-${day}`
}

const can_create_slot = (examination) => {
    if (examination.slot_open || examination.status === 'Slot Creation') {
        return true
    }
    const current = today()
    return current >= examination.examinor_slot_create_start_date && current <= examination.examinor_slot_create_end_date
}

const fetchAssignedExaminations = async () => {
    const response = await axios.post('http://127.0.0.1:5000/assigned_examination', {
        examinor_id: localStorage.getItem('user_id')
    })
    examinations.value = response.data.data
}

const markCompleted = async (id) => {
    await axios.post(`http://127.0.0.1:5000/mark_exam_completed/${id}`)
    fetchAssignedExaminations()
}

onMounted(() => {
    fetchAssignedExaminations()
})
</script>

<style scoped>
.table-wrap {
    overflow-x: auto;
    margin-top: 12px;
}
table {
    border-collapse: collapse;
}
th, td {
    padding: 6px 10px;
    white-space: nowrap;
}
</style>
