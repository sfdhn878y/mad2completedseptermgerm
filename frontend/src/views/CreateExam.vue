<template>
    <Navbar />
    <div>
        <h1>Create Examination</h1>
    </div>
    <form @submit.prevent="createExam">
        <input type="text" v-model="examName" placeholder="Exam Name">
        <input type="text" v-model="examDescription" placeholder="Exam Description">
        <input type="number" v-model="duration" placeholder="Duration in minutes">
        <input type="number" v-model="maxMarks" placeholder="Maximum marks">
        <label>
            Slot start date
            <input type="date" v-model="examinor_slot_create_start_date" required>
        </label>
        <label>
            Slot end date
            <input type="date" v-model="examinor_slot_create_end_date" required>
        </label>
        <label>
            Booking start date
            <input type="date" v-model="booking_start_time" required>
        </label>
        <label>
            Booking end date
            <input type="date" v-model="booking_end_time" required>
        </label>
        <label>
            Exam start date
            <input type="date" v-model="exam_start_date" required>
        </label>
        <label>
            Exam end date
            <input type="date" v-model="exam_end_date" required>
        </label>

        <select v-model="course_id">
            <option disabled value="">Select course</option>
            <option v-for="course in course_data_list" :key="course.id" :value="course.id">
                {{ course.name }}
            </option>
        </select>

        <select v-model="examinor_id" required>
            <option disabled value="">Select examiner</option>
            <option v-for="examinor in examinor_data_list" :key="examinor.id" :value="examinor.id">
                {{ examinor.name }}
            </option>
        </select>

        <button type="submit">Create Exam</button>
    </form>
    {{ responce_frontend }}
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import { ref, onMounted } from 'vue';
import axios from 'axios';

const examinor_data_list = ref([]);
const course_data_list = ref([]);
const examName = ref('');
const examDescription = ref('');
const examType = ref('Viva');
const duration = ref(30);
const maxMarks = ref(100);
const examinor_slot_create_start_date = ref('');
const examinor_slot_create_end_date = ref('');
const booking_start_time = ref('');
const booking_end_time = ref('');
const exam_start_date = ref('');
const exam_end_date = ref('');
const course_id = ref('');
const examinor_id = ref('');
const responce_frontend = ref('');

const examinor_data = async () => {
    const response = await axios.post(
        "http://127.0.0.1:5000/provide_examinor_details",
    )
    examinor_data_list.value = response.data.data

}

const course_data = async () => {
    const response = await axios.post(
        "http://127.0.0.1:5000/provide_course_details",
    )
    course_data_list.value = response.data.data
}

const createExam = async () => {
    const response = await axios.post(
        "http://127.0.0.1:5000/create_exam",
        {
           exam_name: examName.value,
           exam_description: examDescription.value,
           exam_type: examType.value,
           duration: duration.value,
           max_marks: maxMarks.value,
           examinor_slot_create_start_date: examinor_slot_create_start_date.value,
           examinor_slot_create_end_date: examinor_slot_create_end_date.value,
           booking_start_time: booking_start_time.value,
           booking_end_time: booking_end_time.value,
           exam_start_date: exam_start_date.value,
           exam_end_date: exam_end_date.value,
           course_id: course_id.value,
           examinor_id: examinor_id.value,
        }
    )
    responce_frontend.value = response.data
}

onMounted(() => {
    examinor_data();
    course_data();
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