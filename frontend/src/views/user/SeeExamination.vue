<template>
    <Navbar />
    <div>
        <h1>See Examination</h1>
        <input v-model="query" placeholder="Search examination">
        <select v-model="examType">
            <option value="">All types</option>
            <option value="Viva">Viva</option>
            <option value="Practical">Practical</option>
            <option value="Project Demo">Project Demo</option>
            <option value="Assessment">Assessment</option>
        </select>
        <table border="1">
            <thead>
                <tr>
                    <th>Exam</th>
                    <th>Type</th>
                    <th>Course</th>
                    <th>Slot date</th>
                    <th>Slot time</th>
                    <th>Seats</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="examination in filtered" :key="examination.id">
                    <td>{{ examination.name }}</td>
                    <td>{{ examination.exam_type }}</td>
                    <td>{{ examination.course_name }}</td>
                    <td>{{ examination.slot_date }}</td>
                    <td>{{ examination.slot_time }}</td>
                    <td>{{ examination.available }}</td>
                    <td>
                        <a :href="'/exam_detail/' + examination.exam_id">View Detail</a>
                        <button @click="bookSlot(examination.id)">Book Slot</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <p>{{ message }}</p>
    </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

const examinations = ref([])
const message = ref('')
const query = ref('')
const examType = ref('')
const filtered = computed(() => examinations.value.filter(exam => {
    const matchesText = exam.name.toLowerCase().includes(query.value.toLowerCase()) || (exam.course_name || '').toLowerCase().includes(query.value.toLowerCase())
    const matchesType = !examType.value || exam.exam_type === examType.value
    return matchesText && matchesType
}))

const getExaminations = async () => {
    const response = await axios.get('http://127.0.0.1:5000/user/getExaminations')
    examinations.value = response.data.data1
}

const bookSlot = async (slot_id) => {
    const response = await axios.post(`http://127.0.0.1:5000/book_slot/${slot_id}`, {
        user_id: localStorage.getItem('user_id')
    })
    message.value = response.data.message
}

onMounted(() => {
    getExaminations()
})
</script>
