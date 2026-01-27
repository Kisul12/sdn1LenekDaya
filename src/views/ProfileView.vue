<script setup>
import { ref } from 'vue'
import SchoolProfile from '../components/SchoolProfile.vue'
import TeacherList from '../components/TeacherList.vue'

const activeTab = ref(null) // 'school' or 'teachers' or null

const selectTab = (tab) => {
  activeTab.value = tab
  // Scroll to content
  setTimeout(() => {
    document.getElementById('profile-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 pt-32 pb-20">
    <div class="container mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16 animate-fade-in-down">
         <div class="inline-block px-4 py-1.5 mb-4 rounded-full bg-blue-100/50 text-blue-600 text-sm font-medium border border-blue-100 backdrop-blur-sm">
           ✨ Menu Navigasi
         </div>
         <h1 class="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 mb-6 tracking-tight">Halaman Profil</h1>
         <p class="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">Silakan pilih informasi yang ingin Anda lihat di bawah ini.</p>
      </div>

      <!-- Choice Cards -->
      <div v-if="!activeTab" class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto animate-fade-in-up">
        <!-- School Profile Card -->
        <div 
          @click="selectTab('school')"
          class="group cursor-pointer bg-white rounded-[2rem] p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-primary/30 transform hover:-translate-y-2 flex flex-col items-center text-center relative overflow-hidden"
        >
          <div class="w-28 h-28 bg-blue-100/50 rounded-2xl flex items-center justify-center text-6xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm ring-1 ring-blue-100">
            🏫
          </div>
          <h2 class="text-3xl font-bold text-gray-800 group-hover:text-primary transition-colors mb-4">Profil Sekolah</h2>
          <p class="text-gray-600 text-lg">Jelajahi sejarah, visi, misi, dan identitas sekolah kami yang membanggakan.</p>
          
          <div class="mt-8 py-2 px-6 rounded-full bg-primary/10 text-primary font-medium group-hover:bg-primary group-hover:text-white transition-all flex items-center gap-2">
            Lihat Detail <span class="text-xl">→</span>
          </div>
        </div>

        <!-- Teachers Card -->
        <div 
           @click="selectTab('teachers')"
           class="group cursor-pointer bg-white rounded-[2rem] p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-secondary/30 transform hover:-translate-y-2 flex flex-col items-center text-center relative overflow-hidden"
        >
          <div class="w-28 h-28 bg-yellow-100/50 rounded-2xl flex items-center justify-center text-6xl mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-sm ring-1 ring-yellow-100">
            👨‍🏫
          </div>
          <h2 class="text-3xl font-bold text-gray-800 group-hover:text-secondary transition-colors mb-4">Tenaga Pendidik</h2>
          <p class="text-gray-600 text-lg">Kenali guru-guru berdedikasi dan staf pengajar profesional kami.</p>

          <div class="mt-8 py-2 px-6 rounded-full bg-secondary/10 text-secondary font-medium group-hover:bg-secondary group-hover:text-white transition-all flex items-center gap-2">
            Lihat Daftar <span class="text-xl">→</span>
          </div>
        </div>
      </div>

      <!-- Back Button & Content -->
      <div v-else id="profile-content" class="max-w-6xl mx-auto">
        <button 
          @click="activeTab = null"
          class="mb-8 group flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-white/50 hover:shadow-md transition-all text-gray-600 hover:text-primary font-medium"
        >
          <span class="group-hover:-translate-x-1 transition-transform">←</span> Kembali ke Pilihan
        </button>

        <Transition name="fade" mode="out-in">
          <SchoolProfile v-if="activeTab === 'school'" />
          <TeacherList v-else-if="activeTab === 'teachers'" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-down { animation: fadeInDown 0.8s ease-out; }
.animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
