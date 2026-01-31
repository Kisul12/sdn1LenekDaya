<template>
  <div class="relative mt-20">
    <!-- Animated Waves Top -->
    <div class="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[99%]">
      <svg class="waves block w-full h-[100px]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <!-- Using 'text-accent' color via currentColor. We need to set the color on the parent or SVG -->
          <!-- We want the waves to be the same color as the footer (accent) -->
          <!-- Adjust opacities to be layers of the accent color? -->
          <!-- Actually, usually we want the 'waves' to be white/transparent if overlaying? No.
               If we want the footer to have a wavy top, we want the waves to use the Footer's color.
               The background behind them is the PAGE background (white/gray).
           -->
           <use xlink:href="#gentle-wave" x="48" y="0" class="text-accent/30" fill="currentColor" />
           <use xlink:href="#gentle-wave" x="48" y="3" class="text-accent/50" fill="currentColor" />
           <use xlink:href="#gentle-wave" x="48" y="5" class="text-accent/70" fill="currentColor" />
           <use xlink:href="#gentle-wave" x="48" y="7" class="text-accent" fill="currentColor" />
        </g>
      </svg>
    </div>

    <footer id="contact" class="bg-accent text-white py-12 relative z-10">
      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-3 gap-12 mb-8">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <img src="/logo_sd.jpeg" alt="Logo SD" class="w-10 h-10 object-contain rounded-lg bg-white/10" />
              <div class="flex flex-col">
                <span class="font-bold text-lg leading-tight">SD NEGERI 1</span>
                <span class="text-xs font-medium tracking-wider text-gray-300">LENEK DAYA</span>
              </div>
            </div>
            <p class="text-gray-400 text-sm leading-relaxed">
              Membentuk generasi penerus bangsa yang cerdas, kreatif, dan berakhlak mulia.
            </p>
          </div>
          
          <div>
            <h4 class="text-lg font-bold mb-4 text-secondary">Kontak</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>📍 Jl Dane Rahil Desa Lenek Daya</li>
              <li>✉️ Sdn1Lenekdaya@gmail.com</li>
            </ul>
          </div>

          <div>
             <h4 class="text-lg font-bold mb-4 text-secondary">Tautan</h4>
             <ul class="space-y-2 text-sm text-gray-400">
               <li><RouterLink to="/" class="hover:text-white transition-colors">Beranda</RouterLink></li>
               <li><RouterLink to="/profile" class="hover:text-white transition-colors">Profil Sekolah</RouterLink></li>
               <li><RouterLink to="/gallery" class="hover:text-white transition-colors">Galeri</RouterLink></li>
             </ul>
          </div>
        </div>
        
        <div class="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          &copy; 2026 SD Negeri 1 Lenek Daya. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.waves {
  position: relative;
  width: 100%;
  height: 100px;
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
</style>
