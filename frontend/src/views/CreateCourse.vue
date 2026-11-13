<template>
    <Navbar />
    <div>
        <h1>Create Course</h1>
    </div>
    {{ responce_frontend }}
    <form @submit.prevent="createCourse">
        <input type="text" v-model="courseCode" placeholder="Course Code">
        <input type="text" v-model="courseName" placeholder="Course Name">
        <input type="text" v-model="courseDescription" placeholder="Course Description">
        <input type="number" v-model="courseDuration" placeholder="Course Duration">
        <select v-model="status">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
        </select>
        <button type="submit">Create Course</button>
    </form>
</template>
<script setup>
import Navbar from './components/Navbar.vue'
import { ref } from 'vue'
import axios from 'axios'

const courseCode = ref('')
const courseName = ref('')
const courseDescription = ref('')
const courseDuration = ref('')
const status = ref('Active')
const error = ref('')
const responce_frontend = ref('')

const createCourse = async () => {
    try{
        const response = await axios.post(
            "http://127.0.0.1:5000/create_course",
            {
                courseCode: courseCode.value,
                courseName: courseName.value,
                courseDescription: courseDescription.value,
                courseDuration: courseDuration.value,
                status: status.value,
            }
        )
        responce_frontend.value = response.data

    }catch(err){
        error.value = err.message;

    }
}
</script>