<script setup>
import { ref } from 'vue'
import api from '../../services/api'

const props = defineProps({
  teacher: Object
})
const emit = defineEmits(['close'])

const name = ref(props.teacher?.name || '')
const nip = ref(props.teacher?.nip || '')
const subject = ref(props.teacher?.subject || '')
const selectedFile = ref(null)
const previewUrl = ref(props.teacher?.photoUrl || '')
const loading = ref(false)

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('nip', nip.value)
    formData.append('subject', subject.value)
    if (selectedFile.value) {
      formData.append('photo', selectedFile.value)
    }

    const config = { headers: { 'Content-Type': 'multipart/form-data' } }

    if (props.teacher) {
      await api.put(`/teachers/${props.teacher._id}`, formData, config)
    } else {
      await api.post('/teachers', formData, config)
    }
    emit('close')
  } catch (err) {
    console.error(err)
    alert('Gagal menyimpan data guru. Pastikan backend mendukung upload file.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div class="flex items-center gap-4 mb-6">
      <button 
        @click="$emit('close')" 
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-primary transition-all text-sm font-medium group"
      >
        <span class="group-hover:-translate-x-1 transition-transform">←</span> Kembali
      </button>
      <h3 class="text-xl font-bold">{{ teacher ? 'Edit Guru' : 'Tambah Guru Baru' }}</h3>
    </div>

    <form @submit.prevent="handleSubmit" class="max-w-xl space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
        <input v-model="name" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">NIP</label>
        <input v-model="nip" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran</label>
        <input v-model="subject" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Foto Guru</label>
        <div class="flex items-start gap-4">
          <div v-if="previewUrl" class="w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
            <img :src="previewUrl" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1">
            <input 
              type="file" 
              accept="image/*"
              @change="handleFileChange"
              class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
            />
            <p class="text-xs text-gray-500 mt-2">Format: JPG, PNG. Maks 2MB.</p>
          </div>
        </div>
      </div>

      <div class="pt-4">
        <button 
          type="submit" 
          :disabled="loading"
          class="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors w-full"
        >
          {{ loading ? 'Menyimpan...' : 'Simpan' }}
        </button>
      </div>
    </form>
  </div>
</template>
