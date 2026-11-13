<template>
    <Navbar />
    <div>
        <h1>View Slot</h1>
        <p v-if="exam_name">Examination: {{ exam_name }}</p>
        <p>{{ message }}</p>
        <p v-if="slots.length === 0">No slots</p>

        <table v-else border="1">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Capacity</th>
                    <th>Available</th>
                    <th>Status</th>
                    <th>Meeting link</th>
                    <th>Examiner</th>
                    <th v-if="role === 'examinor'">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="slot in slots" :key="slot.id">
                    <td><input v-if="editing_id === slot.id" type="date" v-model="form.slot_date"><span v-else>{{ slot.slot_date }}</span></td>
                    <td><input v-if="editing_id === slot.id" type="time" v-model="form.slot_time"><span v-else>{{ slot.slot_time }}</span></td>
                    <td><input v-if="editing_id === slot.id" type="time" v-model="form.end_time"><span v-else>{{ slot.end_time }}</span></td>
                    <td>1</td>
                    <td>{{ slot.available }}</td>
                    <td>{{ slot.status }}</td>
                    <td><input v-if="editing_id === slot.id" v-model="form.meeting_link"><span v-else>{{ slot.meeting_link }}</span></td>
                    <td>{{ slot.examinor_name }}</td>
                    <td v-if="role === 'examinor'">
                        <template v-if="!booking_started">
                            <button v-if="editing_id !== slot.id" @click="startEdit(slot)">Edit</button>
                            <button v-if="editing_id === slot.id" @click="saveSlot(slot.id)">Save</button>
                            <button @click="removeSlot(slot.id)">Remove</button>
                        </template>
                        <span v-else>Booking started</span>
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
const exam_name = ref('')
const slots = ref([])
const message = ref('')
const booking_started = ref(true)
const role = localStorage.getItem('role')
const editing_id = ref(null)
const form = ref({ slot_date: '', slot_time: '', end_time: '', capacity: 1, meeting_link: '' })

const fetch_slots = async () => {
    const response = await axios.get(`http://127.0.0.1:5000/provide_slot_details/${examination_id}`)
    slots.value = response.data.data
    exam_name.value = response.data.exam_name
    booking_started.value = response.data.booking_started
}
const startEdit = (slot) => {
    editing_id.value = slot.id
    form.value = {
        slot_date: slot.slot_date,
        slot_time: slot.slot_time,
        end_time: slot.end_time,
        capacity: slot.capacity,
        meeting_link: slot.meeting_link
    }
}
const saveSlot = async (id) => {
    const response = await axios.post(`http://127.0.0.1:5000/update_slot/${id}`, form.value)
    message.value = response.data.message
    editing_id.value = null
    fetch_slots()
}
const removeSlot = async (id) => {
    const response = await axios.post(`http://127.0.0.1:5000/delete_slot/${id}`)
    message.value = response.data.message
    fetch_slots()
}
onMounted(fetch_slots)
</script>
