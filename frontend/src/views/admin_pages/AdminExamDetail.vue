<template>
    <Navbar />
    <div>
        <h1>Exam Detail</h1>
        <p>Name: {{ exam.name }}</p>
        <p>Description: {{ exam.description }}</p>
        <p>Course: {{ exam.course_name }}</p>
        <p>Type: {{ exam.exam_type }}</p>
        <p>Status: {{ exam.status }}</p>
        <p>Duration: {{ exam.duration }}</p>
        <p>Maximum marks: {{ exam.max_marks }}</p>
        <p>Examiner: {{ exam.examinor_name }}</p>
        <p>Results: {{ exam.results_published ? 'Published' : 'Hidden' }}</p>
        <form @submit.prevent="changeExaminer">
            <select v-model="examinor_id">
                <option v-for="examinor in examinors" :key="examinor.id" :value="examinor.id">{{ examinor.name }}</option>
            </select>
            <button type="submit">Change examiner</button>
        </form>
        <p>{{ message }}</p>
        <p>Slot creation start: {{ exam.examinor_slot_create_start_date }}</p>
        <p>Slot creation end: {{ exam.examinor_slot_create_end_date }}</p>
        <p>Booking start: {{ exam.booking_start_time }}</p>
        <p>Booking end: {{ exam.booking_end_time }}</p>
        <p>Exam start: {{ exam.exam_start_date }}</p>
        <p>Exam end: {{ exam.exam_end_date }}</p>
        <p>Slot open: {{ exam.slot_open }}</p>

        <h2>Slots</h2>
        <table border="1">
            <thead>
                <tr>
                    <th>Slot date</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Capacity</th>
                    <th>Status</th>
                    <th>Booked by</th>
                    <th>Reschedule</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="slot in exam.slots" :key="slot.id">
                    <td>{{ slot.slot_date }}</td>
                    <td>{{ slot.slot_time }}</td>
                    <td>{{ slot.end_time }}</td>
                    <td>{{ slot.capacity }}</td>
                    <td>{{ slot.status }}</td>
                    <td>{{ slot.booked_by }}</td>
                    <td v-if="slot.evaluated">Marks given</td>
                    <td v-else>
                        <input type="date" v-model="slot.slot_date" :min="String(exam.exam_start_date).slice(0, 10)" :max="String(exam.exam_end_date).slice(0, 10)">
                        <input type="time" v-model="slot.slot_time">
                        <input type="time" v-model="slot.end_time">
                        <button @click="reschedule(slot)">Save</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const examination_id = useRoute().params.examination_id
const message = ref('')
const examinors = ref([])
const examinor_id = ref('')
const exam = ref({
    name: '',
    description: '',
    course_name: '',
    examinor_name: '',
    examinor_slot_create_start_date: '',
    examinor_slot_create_end_date: '',
    booking_start_time: '',
    booking_end_time: '',
    exam_start_date: '',
    exam_end_date: '',
    slot_open: false,
    slots: []
})

const getExamDetail = async () => {
    const response = await axios.get(`http://127.0.0.1:5000/admin_exam_detail/${examination_id}`)
    exam.value = response.data.data
    examinor_id.value = response.data.data.examinor_id
    const examinorResponse = await axios.get('http://127.0.0.1:5000/provide_examinor_details')
    examinors.value = examinorResponse.data.data
}

const changeExaminer = async () => {
    const response = await axios.post(`http://127.0.0.1:5000/change_exam_examiner/${examination_id}`, {
        examinor_id: examinor_id.value
    })
    message.value = response.data.message
    getExamDetail()
}

const reschedule = async (slot) => {
    const response = await axios.post(`http://127.0.0.1:5000/reschedule_slot/${slot.id}`, {
        slot_date: slot.slot_date,
        slot_time: slot.slot_time,
        end_time: slot.end_time
    })
    message.value = response.data.message
    getExamDetail()
}

onMounted(() => {
    getExamDetail()
})
</script>
