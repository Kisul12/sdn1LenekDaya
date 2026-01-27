<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const profile = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchProfile = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await api.get('/profile')
    profile.value = Array.isArray(res.data) ? res.data[0] : res.data
  } catch (err) {
    console.error('Failed to fetch profile:', err)
    error.value = 'Gagal memuat data profil sekolah.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProfile()
})
</script>

<template>
  <div class="relative overflow-hidden rounded-3xl shadow-2xl bg-white isolate ring-1 ring-black/5">
    <!-- Sophisticated Background System -->
    <div class="absolute inset-0 z-0">
      <!-- Base Gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30"></div>
      
      <!-- Grid Pattern -->
      <div class="absolute inset-0 opacity-[0.03]" 
           style="background-image: linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px); background-size: 32px 32px;">
      </div>
      
      <!-- Animated Ambient Orbs -->
      <div class="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-blue-400/10 rounded-full blur-3xl animate-blob"></div>
      <div class="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-secondary/10 to-yellow-300/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-100/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="relative z-10 p-8 md:p-16 space-y-8">
      <div class="h-10 bg-gray-200/70 rounded-lg w-1/3 mx-auto animate-pulse"></div>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="h-56 bg-white/60 rounded-2xl animate-pulse"></div>
        <div class="h-56 bg-white/60 rounded-2xl animate-pulse"></div>
      </div>
      <div class="h-40 bg-white/60 rounded-2xl animate-pulse"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="relative z-10 p-16 text-center">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-full mb-6 relative">
         <div class="absolute inset-0 rounded-full bg-red-100 animate-ping opacity-25"></div>
        <span class="text-4xl">⚠️</span>
      </div>
      <h3 class="text-xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h3>
      <p class="text-gray-500 mb-8">{{ error }}</p>
      <button @click="fetchProfile" class="px-8 py-3 bg-primary text-white rounded-full hover:bg-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-1 font-medium">
        Coba Lagi
      </button>
    </div>

    <!-- Content -->
    <div v-else-if="profile" class="relative z-10 p-8 md:p-14">
      <!-- Header Section -->
      <div class="text-center mb-16 relative">
        <div class="inline-flex items-center justify-center p-3 px-6 rounded-full bg-white shadow-sm border border-blue-100 text-blue-600 mb-6 backdrop-blur-sm bg-opacity-60">
          <span class="mr-2 text-xl">🏫</span>
          <span class="font-medium tracking-wide text-sm uppercase">Tentang Sekolah Kami</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Mengenal Lebih Dekat</h2>
        <div class="w-32 h-1.5 mx-auto rounded-full bg-gradient-to-r from-primary via-blue-400 to-primary opacity-80"></div>
      </div>

      <!-- History Card -->
      <div class="mb-12 group">
        <div class="relative bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div class="absolute top-0 left-0 w-2 h-full bg-primary"></div>
          <div class="absolute -right-10 -top-10 w-40 h-40 bg-blue-50 rounded-full blur-2xl opacity-50 group-hover:bg-blue-100 transition-colors duration-500"></div>
          
          <div class="relative z-10 sm:flex items-start gap-6">
            <div class="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl mb-4 sm:mb-0 text-primary">
              📜
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-800 mb-4">Sejarah Singkat</h3>
              <p class="text-gray-600 leading-relaxed text-justify text-lg">{{ profile.history || 'Data sejarah belum tersedia saat ini.' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Vision & Mission Grid -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Vision -->
        <div class="group h-full">
          <div class="relative h-full bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
            <div class="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="flex items-center gap-4 mb-6 relative z-10">
              <div class="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl text-primary">
                👁️
              </div>
              <h3 class="text-2xl font-bold text-gray-800">Visi Sekolah</h3>
            </div>
            
            <div class="flex-grow flex items-center relative z-10">
              <p class="text-xl text-gray-700 italic font-medium leading-relaxed text-center w-full px-4">
                "{{ profile.vision || 'Data visi belum tersedia.' }}"
              </p>
            </div>
            
            <div class="hidden md:block absolute -bottom-8 -right-8 text-9xl text-blue-50 select-none pb-4 pr-4">"</div>
          </div>
        </div>

        <!-- Mission -->
        <div class="group h-full">
          <div class="relative h-full bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
             <div class="absolute inset-0 bg-gradient-to-b from-yellow-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             
            <div class="flex items-center gap-4 mb-6 relative z-10">
              <div class="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center text-2xl text-secondary">
                🚀
              </div>
              <h3 class="text-2xl font-bold text-gray-800">Misi Sekolah</h3>
            </div>

            <ul class="space-y-4 relative z-10">
              <li v-for="(line, idx) in (profile.mission || '').split('\n')" :key="idx" class="flex gap-4 p-3 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
                <div class="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                  <div class="w-2 h-2 rounded-full bg-secondary"></div>
                </div>
                <span class="text-gray-700 text-lg">{{ line }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
