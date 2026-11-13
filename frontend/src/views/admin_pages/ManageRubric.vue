<template>
    <Navbar />
    <div>
        <h1>Manage Rubric</h1>
        <p v-if="exam_name">Examination: {{ exam_name }}</p>
        <p v-if="!can_edit">Questions cannot be edited after the exam is finished.</p>

        <form v-if="can_edit" @submit.prevent="save_rubric">
            <input type="text" v-model="criterion" placeholder="Criterion" required>
            <input type="text" v-model="description" placeholder="Description" required>
            <input type="number" v-model="marks" placeholder="Marks" required>
            <button type="submit">{{ editing_id ? 'Update Rubric' : 'Add Rubric' }}</button>
            <button v-if="editing_id" type="button" @click="cancel_edit">Cancel</button>
        </form>
        <p>{{ message }}</p>

        <table border="1">
            <thead>
                <tr>
                    <th>Criterion</th>
                    <th>Description</th>
                    <th>Marks</th>
                    <th v-if="can_edit">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="rubric in rubric_list" :key="rubric.id">
                    <td>{{ rubric.criterion }}</td>
                    <td>{{ rubric.description }}</td>
                    <td>{{ rubric.marks }}</td>
                    <td v-if="can_edit">
                        <button @click="start_edit(rubric)">Edit</button>
                        <button @click="delete_rubric(rubric.id)">Delete</button>
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
const criterion = ref('')
const description = ref('')
const marks = ref('')
const message = ref('')
const exam_name = ref('')
const can_edit = ref(true)
const rubric_list = ref([])
const editing_id = ref(null)

const fetch_rubrics = async () => {
    const response = await axios.get(`http://127.0.0.1:5000/provide_rubric_details/${examination_id}`)
    rubric_list.value = response.data.data
    exam_name.value = response.data.exam_name
    can_edit.value = response.data.can_edit
}

const clear_form = () => {
    criterion.value = ''
    description.value = ''
    marks.value = ''
    editing_id.value = null
}

const start_edit = (rubric) => {
    editing_id.value = rubric.id
    criterion.value = rubric.criterion
    description.value = rubric.description
    marks.value = rubric.marks
}

const cancel_edit = () => {
    clear_form()
}

const save_rubric = async () => {
    const payload = {
        criterion: criterion.value,
        description: description.value,
        marks: marks.value
    }
    const response = editing_id.value
        ? await axios.post(`http://127.0.0.1:5000/edit_rubric/${editing_id.value}`, payload)
        : await axios.post(`http://127.0.0.1:5000/create_rubric/${examination_id}`, payload)
    message.value = response.data.message
    clear_form()
    fetch_rubrics()
}

const delete_rubric = async (id) => {
    const response = await axios.post(`http://127.0.0.1:5000/delete_rubric/${id}`)
    message.value = response.data.message
    fetch_rubrics()
}

onMounted(() => {
    fetch_rubrics()
})
</script>
