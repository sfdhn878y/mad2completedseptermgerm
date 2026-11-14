import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import CreateCourse from '../views/CreateCourse.vue'
import CreateExam from '../views/CreateExam.vue'
import CreateExaminor from '../views/CreateExaminor.vue'
import ManageCourse from '../views/admin_pages/ManageCourse.vue'
import EditCourse from '../views/admin_pages/EditCourse.vue'
import ManageExaminor from '../views/admin_pages/ManageExaminor.vue'
import ManageExamination from '../views/admin_pages/ManageExamination.vue'
import AdminExamDetail from '../views/admin_pages/AdminExamDetail.vue'
import CreateQuestionBank from '../views/admin_pages/CreateQuestionBank.vue'
import ManageRubric from '../views/admin_pages/ManageRubric.vue'
import Examinor from '../views/examinor/Examinor.vue'
import AssignedExamination from '../views/examinor/AssignedExamination.vue'
import CreateSlot from '../views/examinor/CreateSlot.vue'
import ViewSlot from '../views/examinor/ViewSlot.vue'
import ViewBooking from '../views/examinor/ViewBooking.vue'
import GiveMarks from '../views/examinor/GiveMarks.vue'
import User from '../views/user/User.vue'
import SeeExamination from '../views/user/SeeExamination.vue'
import ExamDetail from '../views/user/ExamDetail.vue'
import MyBooking from '../views/user/MyBooking.vue'
import ManageStudents from '../views/admin_pages/ManageStudents.vue'
import AllBookings from '../views/admin_pages/AllBookings.vue'
import AllSlots from '../views/admin_pages/AllSlots.vue'
import EditExam from '../views/admin_pages/EditExam.vue'
import Reports from '../views/admin_pages/Reports.vue'
import AdminSearch from '../views/admin_pages/AdminSearch.vue'
import MyResults from '../views/user/MyResults.vue'
const routes = [

  {
    path: '/', // http://localhost:5173/
    component: Home
  },
  {
    path: '/register', // http://localhost:5173/register
    component: Register
  },
  {
    path: '/login', // http://localhost:5173/login
    component: Login
  },
  {
    path: '/admin', // http://localhost:5173/admin
    component: Admin
  },
  {
    path: '/create_course', // http://localhost:5173/create_course
    component: CreateCourse
  },
  {
    path: '/create_examination', // http://localhost:5173/create_examination
    component: CreateExam
  },
  {
    path: '/create_examinor', // http://localhost:5173/create_examinor
    component: CreateExaminor
  },
  {
    path: '/manage_course', // http://localhost:5173/manage_course
    component: ManageCourse
  },
  {
    path: '/edit_course/:id', // http://localhost:5173/edit_course/:id
    component: EditCourse
  },
  { 
    path: '/manage_examinor', // http://localhost:5173/manage_examinor
    component: ManageExaminor
  },
  {
    path: '/manage_examination', // http://localhost:5173/manage_examination
    component: ManageExamination
  },
  {
    path: '/admin_exam_detail/:examination_id', // http://localhost:5173/admin_exam_detail/:examination_id
    component: AdminExamDetail
  },
  {
    path: '/create-questionbank/:examination_id', // http://localhost:5173/create-questionbank/:examination_id
    component: CreateQuestionBank
  },
  {
    path: '/manage-rubric/:examination_id', // http://localhost:5173/manage-rubric/:examination_id
    component: ManageRubric
  },
  {
    path: '/examinor', // http://localhost:5173/examinor
    component: Examinor
  },
  { 
    path: '/assigned_examination', // http://localhost:5173/assigned_examination
    component: AssignedExamination
  }
  ,
  {
    path: '/create_slot/:examination_id', // http://localhost:5173/create_slot/:examination_id
    component: CreateSlot
  },
  {
    path: '/view_slot/:examination_id', // http://localhost:5173/view_slot/:examination_id
    component: ViewSlot
  },
  {
    path: '/view_booking', // http://localhost:5173/view_booking
    component: ViewBooking
  },
  {
    path: '/give_marks/:booking_id', // http://localhost:5173/give_marks/:booking_id
    component: GiveMarks
  },
  {
    path: '/user', // http://localhost:5173/user
    component: User
  },
  {
    path: '/see_examination', // http://localhost:5173/see_examination
    component: SeeExamination
  },
  {
    path: '/exam_detail/:examination_id', // http://localhost:5173/exam_detail/:examination_id
    component: ExamDetail
  },
  {
    path: '/my_booking', // http://localhost:5173/my_booking
    component: MyBooking
  },
  {
    path: '/manage_students',
    component: ManageStudents
  },
  {
    path: '/manage_bookings',
    component: AllBookings
  },
  {
    path: '/all_slots',
    component: AllSlots
  },
  {
    path: '/edit_exam/:examination_id',
    component: EditExam
  },
  {
    path: '/reports',
    component: Reports
  },
  {
    path: '/admin_search',
    component: AdminSearch
  },
  {
    path: '/my_results',
    component: MyResults
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router