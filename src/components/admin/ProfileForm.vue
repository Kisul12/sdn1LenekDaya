<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

const profile = ref({
  history: '',
  vision: '',
  mission: ''
})
const loading = ref(false)
const message = ref('')

const fetchProfile = async () => {
  try {
    const res = await api.get('/profile')
    const data = Array.isArray(res.data) ? res.data[0] : res.data
    if (data) {
      profile.value = {
        history: data.history || '',
        vision: data.vision || '',
        mission: data.mission || ''
      }
    }
  } catch (err) {
    console.error(err)
  }
}

const saveProfile = async () => {
  loading.value = true
  message.value = ''
  try {
    await api.post('/profile', profile.value)
    message.value = 'Profil berhasil diperbarui!'
  } catch (err) {
    console.error(err)
    message.value = 'Gagal menyimpan profil.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProfile()
})
</script>

<template>
  <div>
    <h3 class="text-xl font-bold mb-6">Edit Profil Sekolah</h3>
    
    <div v-if="message" class="mb-4 p-3 bg-blue-50 text-blue-700 rounded">{{ message }}</div>

    <form @submit.prevent="saveProfile" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Sejarah Singkat</label>
        <textarea 
          v-model="profile.history" 
          rows="5"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
        ></textarea>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div>
           <label class="block text-sm font-medium text-gray-700 mb-2">Visi</label>
           <textarea 
             v-model="profile.vision" 
             rows="4"
             class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
           ></textarea>
        </div>
        <div>
           <label class="block text-sm font-medium text-gray-700 mb-2">Misi (Satu per baris)</label>
           <textarea 
             v-model="profile.mission" 
             rows="4"
             class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
             placeholder="Misi 1&#10;Misi 2"
           ></textarea>
        </div>
      </div>

      <div class="flex justify-end">
        <button 
          type="submit" 
          :disabled="loading"
          class="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {{ loading ? 'Menyimpan...' : 'Simpan Perubahan' }}
        </button>
      </div>
    </form>
  </div>
</template>
