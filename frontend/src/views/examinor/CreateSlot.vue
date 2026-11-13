<template>
    <Navbar />
    <div>
        <h1>Create Slot</h1>
        <p v-if="slot_open">Slot creation opened by admin</p>
        <p v-else-if="slot_start">You can create slots from {{ slot_start }} to {{ slot_end }}</p>
        <p v-if="exam_start">Give the slot on an examination date, from {{ exam_start }} to {{ exam_end }}</p>
        <p v-if="blocked_message">{{ blocked_message }}</p>
    </div>
    {{ responce_frontend }}
    <form v-if="!blocked_message" @submit.prevent="createSlot">
        <label>
            Examination date
            <input type="date" v-model="slot_date" :min="exam_start" :max="exam_end" required>
        </label>
        <label>
            Slot time
            <input type="time" v-model="slot_time" required>
        </label>
        <label>
            End time
            <input type="time" v-model="end_time" required>
        </label>
        <p>Capacity: 1</p>
        <input type="text" v-model="meeting_link" placeholder="Meeting link (optional)">
        <button type="submit">Create Slot</button>
    </form>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const examination_id = useRoute().params.examination_id
const slot_date = ref('')
const slot_time = ref('')
const end_time = ref('')
const meeting_link = ref('')
const responce_frontend = ref('')
const slot_start = ref('')
const slot_end = ref('')
const exam_start = ref('')
const exam_end = ref('')
const slot_open = ref(false)
const blocked_message = ref('')

const today = () => {
    const now = new Date()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${now.getFullYear()}-${month}-${day}`
}

const load_exam = async () => {
    const response = await axios.get('http://127.0.0.1:5000/provide_examination_details')
    const exam = response.data.data.find(item => String(item.id) === String(examination_id))
    if (!exam) {
        blocked_message.value = 'Examination not found'
        return
    }
    slot_start.value = String(exam.examinor_slot_create_start_date).slice(0, 10)
    slot_end.value = String(exam.examinor_slot_create_end_date).slice(0, 10)
    exam_start.value = String(exam.exam_start_date).slice(0, 10)
    exam_end.value = String(exam.exam_end_date).slice(0, 10)
    slot_date.value = exam_start.value
    slot_open.value = !!exam.slot_open || exam.status === 'Slot Creation'
    const current = today()
    const in_window = current >= slot_start.value && current <= slot_end.value
    if (!slot_open.value && !in_window) {
        blocked_message.value = 'You can only create a slot between the slot start date and the slot end date'
    }
}

const createSlot = async () => {
    if (blocked_message.value) {
        responce_frontend.value = blocked_message.value
        return
    }
    if (slot_date.value < exam_start.value || slot_date.value > exam_end.value) {
        responce_frontend.value = 'Give the slot on an examination date, from ' + exam_start.value + ' to ' + exam_end.value
        return
    }
    const response = await axios.post(`http://127.0.0.1:5000/create_slot/${examination_id}`, {
        slot_date: slot_date.value,
        slot_time: slot_time.value,
        end_time: end_time.value,
        capacity: 1,
        meeting_link: meeting_link.value,
        examinor_id: localStorage.getItem('user_id')
    })
    responce_frontend.value = response.data.message
}

onMounted(() => {
    load_exam()
})
</script>

<style scoped>
label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 13px;
    color: #374151;
}
</style>
