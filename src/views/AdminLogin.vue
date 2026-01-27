<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import auth from '../services/auth'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    await auth.login(username.value, password.value)
    router.push('/admin/dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Login gagal. Periksa kembali username dan password.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-6">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
      <div class="bg-primary p-8 text-center">
        <div class="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 text-white">
          🔐
        </div>
        <h2 class="text-2xl font-bold text-white">Admin Login</h2>
        <p class="text-blue-100 mt-2 text-sm">Masuk untuk mengelola profil, guru, dan galeri.</p>
      </div>

      <div class="p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div v-if="error" class="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
            {{ error }}
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input 
              v-model="username" 
              type="text" 
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              v-model="password" 
              type="password" 
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="Masukkan password"
            />
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
          >
            <span v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            {{ loading ? 'Memproses...' : 'Masuk Dashboard' }}
          </button>
        </form>

        <div class="mt-8 text-center">
          <RouterLink 
            to="/" 
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gray-100/80 text-gray-600 hover:bg-gray-200 hover:text-primary transition-all duration-300 font-medium text-sm group"
          >
            <span class="group-hover:-translate-x-1 transition-transform text-lg">←</span> Kembali ke Beranda
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.5s ease-out; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
