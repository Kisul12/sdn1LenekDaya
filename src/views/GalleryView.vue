<script setup>
import GalleryGrid from '../components/GalleryGrid.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 pt-32 pb-20">
    <div class="container mx-auto px-6">
       <!-- Header -->
      <div class="text-center mb-16 animate-fade-in-down">
         <div class="inline-block px-5 py-2 mb-6 rounded-full bg-white/60 backdrop-blur-md shadow-sm border border-white/50 text-primary font-medium tracking-wide">
           📸 Galeri Sekolah
         </div>
         <h1 class="text-5xl font-bold text-gray-900 mb-6 drop-shadow-sm">Dokumentasi Kegiatan</h1>
         <p class="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
           Menangkap momen indah dan prestasi gemilang dalam perjalanan pendidikan kami.
         </p>
         <div class="w-32 h-1.5 bg-gradient-to-r from-primary via-blue-400 to-primary mx-auto rounded-full mt-8 opacity-80"></div>
      </div>

      <GalleryGrid />
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out;
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
