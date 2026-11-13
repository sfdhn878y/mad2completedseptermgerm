<template>
    <Navbar />
    <h1>Edit Examination</h1>
    <p>{{ message }}</p>
    <form @submit.prevent="save">
        <input type="text" v-model="exam.exam_name" placeholder="Exam Name">
        <input type="text" v-model="exam.exam_description" placeholder="Exam Description">
        <input type="number" v-model="exam.duration" placeholder="Duration">
        <input type="number" v-model="exam.max_marks" placeholder="Maximum marks">
        <label>Slot start <input type="date" v-model="exam.examinor_slot_create_start_date"></label>
        <label>Slot end <input type="date" v-model="exam.examinor_slot_create_end_date"></label>
        <label>Booking start <input type="date" v-model="exam.booking_start_time"></label>
        <label>Booking end <input type="date" v-model="exam.booking_end_time"></label>
        <label>Exam start <input type="date" v-model="exam.exam_start_date"></label>
        <label>Exam end <input type="date" v-model="exam.exam_end_date"></label>
        <select v-model="exam.course_id">
            <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.name }}</option>
        </select>
        <select v-model="exam.examinor_id">
            <option v-for="examinor in examinors" :key="examinor.id" :value="examinor.id">{{ examinor.name }}</option>
        </select>
        <select v-model="exam.status">
            <option value="Draft">Draft</option>
            <option value="Slot Creation">Slot Creation</option>
            <option value="Booking Open">Booking Open</option>
            <option value="Closed">Closed</option>
            <option value="Completed">Completed</option>
        </select>
        <button type="submit">Update</button>
    </form>
</template>
<script setup>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const examId = useRoute().params.examination_id
const message = ref('')
const courses = ref([])
const examinors = ref([])
const exam = ref({
    exam_name: '',
    exam_description: '',
    exam_type: 'Viva',
    duration: 30,
    max_marks: 100,
    examinor_slot_create_start_date: '',
    examinor_slot_create_end_date: '',
    booking_start_time: '',
    booking_end_time: '',
    exam_start_date: '',
    exam_end_date: '',
    course_id: '',
    examinor_id: '',
    status: 'Draft'
})

const load = async () => {
    const exams = await axios.get('http://127.0.0.1:5000/provide_examination_details')
    const found = exams.data.data.find(item => String(item.id) === String(examId))
    exam.value = {
        exam_name: found.name,
        exam_description: found.description,
        exam_type: found.exam_type,
        duration: found.duration,
        max_marks: found.max_marks,
        examinor_slot_create_start_date: found.examinor_slot_create_start_date,
        examinor_slot_create_end_date: found.examinor_slot_create_end_date,
        booking_start_time: found.booking_start_time,
        booking_end_time: found.booking_end_time,
        exam_start_date: found.exam_start_date,
        exam_end_date: found.exam_end_date,
        course_id: found.course_id,
        examinor_id: found.examinor_id,
        status: found.status
    }
    const courseResponse = await axios.post('http://127.0.0.1:5000/provide_course_details')
    courses.value = courseResponse.data.data
    const examinorResponse = await axios.get('http://127.0.0.1:5000/provide_examinor_details')
    examinors.value = examinorResponse.data.data
}
const save = async () => {
    const response = await axios.post(`http://127.0.0.1:5000/edit_exam/${examId}`, exam.value)
    message.value = response.data.message
}
onMounted(load)
</script>
