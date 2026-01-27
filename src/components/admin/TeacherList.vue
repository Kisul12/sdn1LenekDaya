<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'
import TeacherForm from './TeacherForm.vue'
import ConfirmModal from '../ConfirmModal.vue'

const teachers = ref([])
const loading = ref(true)
const showForm = ref(false)
const selectedTeacher = ref(null)

// Delete State
const showDeleteModal = ref(false)
const teacherToDelete = ref(null)

const fetchTeachers = async () => {
  try {
    const res = await api.get('/teachers')
    teachers.value = res.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const openForm = (teacher = null) => {
  selectedTeacher.value = teacher
  showForm.value = true
}

const handleFormClose = () => {
  showForm.value = false
  selectedTeacher.value = null
  fetchTeachers()
}

const confirmDelete = (id) => {
  teacherToDelete.value = id
  showDeleteModal.value = true
}

const deleteTeacher = async () => {
  if (!teacherToDelete.value) return
  
  try {
    await api.delete(`/teachers/${teacherToDelete.value}`)
    fetchTeachers()
  } catch (err) {
    console.error(err)
    alert('Gagal menghapus guru')
  } finally {
    showDeleteModal.value = false
    teacherToDelete.value = null
  }
}

onMounted(() => {
  fetchTeachers()
})
</script>

<template>
  <div>
    <div v-if="!showForm">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-800">Daftar Tenaga Pendidik</h3>
        <button @click="openForm()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-bold text-sm">
          + Tambah Guru
        </button>
      </div>

      <div v-if="loading" class="text-center py-10 text-gray-500">Memuat data...</div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="teacher in teachers" :key="teacher._id" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div class="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
             <img :src="teacher.photoUrl || 'https://via.placeholder.com/150'" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="font-bold text-gray-800 truncate">{{ teacher.name }}</h4>
            <div class="text-xs text-primary font-medium mb-1">{{ teacher.subject }}</div>
            <p class="text-xs text-gray-500 truncate">NIP: {{ teacher.nip }}</p>
          </div>
          <div class="flex flex-col gap-2">
            <button @click="openForm(teacher)" class="text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors">✏️</button>
            <button @click="confirmDelete(teacher._id)" class="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors">🗑️</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Component (Edit/Add) -->
    <TeacherForm v-else :teacher="selectedTeacher" @close="handleFormClose" />

    <ConfirmModal 
      :isOpen="showDeleteModal"
      title="Hapus Guru"
      message="Apakah Anda yakin ingin menghapus data guru ini? Tindakan ini tidak dapat dibatalkan."
      confirmText="Ya, Hapus"
      cancelText="Batal"
      type="danger"
      @confirm="deleteTeacher"
      @close="showDeleteModal = false"
    />
  </div>
</template>
