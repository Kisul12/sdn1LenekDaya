<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const galleries = ref([])
const loading = ref(true)
const error = ref(null)

const getImageUrl = (path) => {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `http://localhost:5000/${path}`
}

const fetchGallery = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await api.get('/gallery')
    galleries.value = res.data
  } catch (err) {
    console.error('Failed to fetch gallery:', err)
    error.value = 'Gagal memuat galeri.'
  } finally {
    loading.value = false
  }
}

const handleImageError = (e) => {
  e.target.src = 'https://placehold.co/600x400?text=No+Image'
}

onMounted(() => {
  fetchGallery()
})
</script>

<template>
  <div class="animate-fade-in-up">
    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500 mb-4">{{ error }}</p>
      <button @click="fetchGallery" class="px-6 py-2 bg-secondary text-white rounded-full hover:bg-yellow-600">Coba Lagi</button>
    </div>

    <!-- Gallery Grid -->
    <div v-else-if="galleries.length > 0" class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      <router-link :to="{ name: 'gallery-detail', params: { id: item._id } }" v-for="item in galleries" :key="item._id" class="block break-inside-avoid relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
         <img
          :src="getImageUrl(item.imageUrl) || 'https://placehold.co/600x400?text=Gallery'"
          @error="handleImageError"
          :alt="item.title"
          class="w-full h-auto object-cover hover:scale-105 transition duration-500 cursor-pointer"
        />
        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
           <h3 class="text-white font-bold text-sm">{{ item.title }}</h3>
           <p v-if="item.description" class="text-gray-300 text-xs mt-1">{{ item.description }}</p>
        </div>
      </router-link>
    </div>

    <!-- Empty -->
    <div v-else class="text-center py-20 text-gray-500">
      Belum ada foto kegiatan.
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
