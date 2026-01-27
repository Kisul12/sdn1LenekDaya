<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { RouterView } from 'vue-router'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <div class="font-sans text-gray-800 antialiased bg-gray-50 min-h-screen flex flex-col">
    <Navbar v-if="!isAdminRoute" />
    <main class="flex-grow">
      <RouterView /> <!-- Content changes based on route -->
    </main>
    <Footer v-if="!isAdminRoute" />
  </div>
</template>

<style>
/* Global smooth scroll */
html {
  scroll-behavior: smooth;
}
</style>