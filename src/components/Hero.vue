<script setup>
// Hero section
</script>

<template>
  <section class="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-[#1a5f9a] to-blue-400">
    <!-- Background Patterns -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-overlay blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full mix-blend-overlay blur-3xl animate-pulse delay-700"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10 text-center text-white">
      <div class="inline-block px-4 py-1.5 mb-6 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium tracking-wide animate-fade-in-down">
         🏫 Selamat Datang di Website Resmi SDN 1 Lenek Daya
      </div>
      
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
        Mewujudkan Generasi <br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Cerdas & Berkarakter</span>
      </h1>
      
      <p class="text-lg md:text-xl text-blue-50 mb-10 max-w-2xl mx-auto leading-relaxed">
        SDN 1 Lenek Daya berkomitmen memberikan pendidikan berkualitas dengan fasilitas terbaik untuk mendukung tumbuh kembang siswa.
      </p>
      
      <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
        <RouterLink to="/profile" class="px-8 py-3.5 bg-white text-primary font-bold rounded-full hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full md:w-auto">
          Tentang Kami
        </RouterLink>
        <RouterLink to="/gallery" class="px-8 py-3.5 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all w-full md:w-auto">
          Lihat Galeri
        </RouterLink>
      </div>
    </div>
    
    <!-- Animated Waves -->
    <div class="absolute bottom-0 left-0 w-full">
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#f9fafb" /> <!-- matches bg-gray-50 -->
        </g>
      </svg>
    </div>
  </section>
</template>

<style scoped>
.waves {
  position: relative;
  width: 100%;
  height: 100px;
  margin-bottom: -7px; /* Fix for safari gap */
  min-height: 100px;
  max-height: 150px;
}

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% { transform: translate3d(-90px,0,0); }
  100% { transform: translate3d(85px,0,0); }
}

.animate-fade-in-down {
  animation: fadeInDown 1s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
