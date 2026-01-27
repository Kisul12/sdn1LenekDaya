<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const isHome = computed(() => route.path === '/')

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      (isScrolled || !isHome || isMobileMenuOpen) ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
    ]"
  >
    <div class="container mx-auto px-6 flex justify-between items-center relative z-20">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-3 group" @click="isMobileMenuOpen = false">
        <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
          SD
        </div>
        <div class="flex flex-col">
          <span :class="{'text-white': (!isScrolled && isHome && !isMobileMenuOpen), 'text-primary': (isScrolled || !isHome || isMobileMenuOpen)}" class="font-bold text-lg leading-tight transition-colors">SD NEGERI 1</span>
          <span :class="{'text-white/80': (!isScrolled && isHome && !isMobileMenuOpen), 'text-gray-500': (isScrolled || !isHome || isMobileMenuOpen)}" class="text-xs font-medium tracking-wider transition-colors">LENEK DAYA</span>
        </div>
      </RouterLink>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8">
        <RouterLink to="/" :class="{'text-white hover:text-white/80': (!isScrolled && isHome), 'text-gray-600 hover:text-primary': (isScrolled || !isHome)}" class="font-medium transition-colors">Beranda</RouterLink>
        <RouterLink to="/profile" :class="{'text-white hover:text-white/80': (!isScrolled && isHome), 'text-gray-600 hover:text-primary': (isScrolled || !isHome)}" class="font-medium transition-colors">Profil</RouterLink>
        <RouterLink to="/gallery" :class="{'text-white hover:text-white/80': (!isScrolled && isHome), 'text-gray-600 hover:text-primary': (isScrolled || !isHome)}" class="font-medium transition-colors">Galeri</RouterLink>
        <a href="#contact" :class="{'text-white hover:text-white/80': (!isScrolled && isHome), 'text-gray-600 hover:text-primary': (isScrolled || !isHome)}" class="font-medium transition-colors">Kontak</a>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden text-2xl focus:outline-none transition-colors duration-300" :class="{'text-white': (!isScrolled && isHome && !isMobileMenuOpen), 'text-gray-800': (isScrolled || !isHome || isMobileMenuOpen)}">
        <div class="w-6 h-6 flex items-center justify-center relative">
          <span class="transform transition-all duration-300 absolute" :class="{'opacity-100 rotate-0': !isMobileMenuOpen, 'opacity-0 rotate-90': isMobileMenuOpen}">☰</span>
          <span class="transform transition-all duration-300 absolute" :class="{'opacity-0 -rotate-90': !isMobileMenuOpen, 'opacity-100 rotate-0': isMobileMenuOpen}">✕</span>
        </div>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-xl border-t border-gray-100 py-6 px-6 flex flex-col gap-2 z-10">
        <RouterLink to="/" class="mobile-nav-item text-gray-800 font-medium hover:text-primary hover:bg-gray-50 p-4 rounded-xl transition-all" @click="isMobileMenuOpen = false">Beranda</RouterLink>
        <RouterLink to="/profile" class="mobile-nav-item text-gray-800 font-medium hover:text-primary hover:bg-gray-50 p-4 rounded-xl transition-all" @click="isMobileMenuOpen = false" style="animation-delay: 100ms">Profil</RouterLink>
        <RouterLink to="/gallery" class="mobile-nav-item text-gray-800 font-medium hover:text-primary hover:bg-gray-50 p-4 rounded-xl transition-all" @click="isMobileMenuOpen = false" style="animation-delay: 200ms">Galeri</RouterLink>
        <a href="#contact" class="mobile-nav-item text-gray-800 font-medium hover:text-primary hover:bg-gray-50 p-4 rounded-xl transition-all" @click="isMobileMenuOpen = false" style="animation-delay: 300ms">Kontak</a>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.mobile-nav-item {
  opacity: 0;
  animation: slideInRight 0.4s ease-out forwards;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
