<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const router = useRouter()
const galleryId = route.params.id

const gallery = ref(null)
const loading = ref(true)
const error = ref(null)

const getImageUrl = (path) => {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `http://localhost:5000/${path}`
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

const fetchGalleryDetail = async () => {
    loading.value = true
    error.value = null
    try {
        const res = await api.get(`/gallery/${galleryId}`)
        gallery.value = res.data
    } catch (err) {
        console.error('Failed to fetch gallery detail:', err)
        error.value = 'Gagal memuat detail kegiatan.'
    } finally {
        loading.value = false
    }
}

const goBack = () => {
  router.back()
}

onMounted(() => {
    fetchGalleryDetail()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 pt-32 pb-20">
    <div class="container mx-auto px-6">
      <!-- Back Button -->
      <div class="mb-8">
        <button 
          @click="goBack"
          class="group flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-300 font-medium"
        >
          <div class="p-2 rounded-full bg-white shadow-sm border border-gray-100 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </div>
          <span class="relative">
            Kembali ke Galeri
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </span>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="animate-pulse flex flex-col items-center justify-center p-12">
        <div class="w-full max-w-4xl h-96 bg-gray-200 rounded-2xl mb-8"></div>
        <div class="w-2/3 h-8 bg-gray-200 rounded mb-4"></div>
        <div class="w-1/2 h-4 bg-gray-200 rounded"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div class="text-red-500 text-5xl mb-4">⚠️</div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h3>
        <p class="text-gray-500 mb-6">{{ error }}</p>
        <button @click="fetchGalleryDetail" class="px-6 py-2 bg-secondary text-white rounded-full hover:bg-yellow-600 shadow-md hover:shadow-lg transition-all">Coba Lagi</button>
      </div>

      <!-- Content -->
      <div v-else-if="gallery" class="animate-fade-in-up">
        <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          <!-- Image Section -->
          <div class="relative h-[400px] md:h-[600px] w-full group">
            <img 
              :src="getImageUrl(gallery.imageUrl) || 'https://placehold.co/1200x800?text=Activity+Image'" 
              :alt="gallery.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
            
            <div class="absolute bottom-0 left-0 p-8 md:p-12 w-full">
               <div class="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/90 backdrop-blur-sm text-white text-sm font-semibold tracking-wide shadow-lg">
                {{ gallery.category || 'Kegiatan Sekolah' }}
               </div>
               <h1 class="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg max-w-4xl">
                 {{ gallery.title }}
               </h1>
            </div>
          </div>

          <!-- Description Section -->
          <div class="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div class="lg:col-span-2">
              <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span class="w-1.5 h-8 bg-secondary rounded-full"></span>
                Deskripsi Kegiatan
              </h2>
              <div class="prose prose-lg text-gray-600 leading-relaxed text-justify">
                {{ gallery.description || 'Tidak ada deskripsi tersedia.' }}
              </div>
            </div>

            <!-- Sidebar Info -->
            <div class="lg:col-span-1 space-y-8">
              <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 class="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Informasi Detail</h3>
                
                <div class="space-y-4">
                  <div class="flex items-start gap-4">
                    <div class="p-2 bg-blue-100 text-blue-600 rounded-lg">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">Tanggal Posting</p>
                      <p class="font-medium text-gray-800">{{ formatDate(gallery.createdAt || new Date()) }}</p>
                    </div>
                  </div>
                  
                  <!-- Add more info here if available -->
                  <div class="flex items-start gap-4">
                    <div class="p-2 bg-green-100 text-green-600 rounded-lg">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">Kategori</p>
                      <p class="font-medium text-gray-800">Dokumentasi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
