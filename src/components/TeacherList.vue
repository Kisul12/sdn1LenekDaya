<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const teachers = ref([])
const loading = ref(true)
const error = ref(null)

const getImageUrl = (path) => {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `http://localhost:5000/${path}`
}

const fetchTeachers = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await api.get('/teachers')
    teachers.value = res.data
  } catch (err) {
    console.error('Failed to fetch teachers:', err)
    error.value = 'Gagal memuat data guru.'
  } finally {
    loading.value = false
  }
}

const handleImageError = (e) => {
  e.target.src = 'https://ui-avatars.com/api/?name=Guru&background=random&size=200'
}

onMounted(() => {
  fetchTeachers()
})
</script>

<template>
  <div class="animate-fade-in up">
    <div class="text-center mb-10">
      <h2 class="text-3xl font-bold text-accent mb-2">Tenaga Pendidik</h2>
      <div class="w-16 h-1.5 bg-secondary mx-auto rounded-full"></div>
      <p class="text-gray-500 mt-4">Guru-guru berdedikasi tinggi yang siap membimbing siswa.</p>
    </div>

    <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="i in 3" :key="i" class="bg-white p-6 rounded-2xl shadow animate-pulse">
        <div class="h-48 bg-gray-200 rounded-xl mb-4"></div>
        <div class="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500 mb-4">{{ error }}</p>
      <button @click="fetchTeachers" class="px-6 py-2 bg-primary text-white rounded-full hover:bg-blue-700">Coba Lagi</button>
    </div>

    <div v-else-if="teachers.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="teacher in teachers" :key="teacher._id" class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100">
        <div class="relative overflow-hidden rounded-xl mb-6 shadow-md">
           <img
            :src="getImageUrl(teacher.photoUrl) || 'https://ui-avatars.com/api/?name=' + teacher.name + '&background=random&size=200'"
            @error="handleImageError"
            alt="Foto Guru"
            class="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
          />
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
             <span class="text-white text-xs font-bold uppercase tracking-wider bg-secondary px-2 py-1 rounded">{{ teacher.subject }}</span>
          </div>
        </div>
        
        <h3 class="font-bold text-xl text-primary mb-1">{{ teacher.name }}</h3>
        <p class="text-sm text-gray-400 font-mono">NIP: {{ teacher.nip }}</p>
      </div>
    </div>

    <div v-else class="text-center py-12 text-gray-500 bg-white rounded-2xl shadow">
      Belum ada data guru.
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in.up {
  animation: fadeUp 0.5s ease-out;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
