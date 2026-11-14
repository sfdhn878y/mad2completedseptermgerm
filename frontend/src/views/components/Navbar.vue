<template>
  <nav>
    <div class="nav-brand">ExamPortal</div>
    <div class="nav-links">
      <template v-if="loggedIn">
        <template v-if="role === 'admin'">
          <a href="/admin">Home</a>
          <a href="/manage_course" >Courses</a>
          <a href="/manage_examination" >Examinations</a>
          <a href="/manage_examinor" >Examiners</a>
          <a href="/all_slots" >Slots</a>
          <a href="/manage_students" >Students</a>
          <a href="/manage_bookings" >Bookings</a>
          <a href="/reports" >Reports</a>
          <a href="/admin_search" >Search</a>
        </template>

        <template v-else-if="role === 'examinor'">
          <a href="/examinor" >Home</a>
          <a href="/assigned_examination" >Assigned Examination</a>
          <a href="/view_booking" >View Booking</a>
        </template>

        <template v-else>
          <a href="/user" >Home</a>
          <a href="/see_examination" >Examinations</a>
          <a href="/my_booking" >My Bookings</a>
          <a href="/my_results" >Results</a>
        </template>

        <button class="logout-btn" @click.prevent="logout">Logout</button>
      </template>

      <template v-else>
        <a href="/login" >Login</a>
        <a href="/register" >Signup</a>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const path = window.location.pathname
const loggedIn = ref(!!localStorage.getItem('token'))
const role = ref(localStorage.getItem('role') || '')

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.removeItem('name')
  localStorage.removeItem('user_id')
  loggedIn.value = false
  role.value = ''
  window.location.href = '/login'
}
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background-color: #1f2937;
  color: #fff;
}
.nav-brand {
  font-weight: 700;
  font-size: 18px;
  color: #34d399;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
a {
  color: #e5e7eb;
  text-decoration: none;
  font-size: 14px;
}
a:hover {
  color: #fff;
}
a.active {
  color: #34d399;
  font-weight: 600;
}
.logout-btn {
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
.logout-btn:hover {
  background: #dc2626;
}
</style>
