<script setup>
import { ref } from 'vue'
import api from '../../services/api'

const props = defineProps({
  item: Object
})
const emit = defineEmits(['close'])

const title = ref(props.item?.title || '')
const description = ref(props.item?.description || '')
const selectedFile = ref(null)
const previewUrl = ref(props.item?.imageUrl || '')
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
    formData.append('title', title.value)
    formData.append('description', description.value)
    if (selectedFile.value) {
      formData.append('image', selectedFile.value)
    }

    const config = { headers: { 'Content-Type': 'multipart/form-data' } }

    if (props.item) {
      await api.put(`/gallery/${props.item._id}`, formData, config)
    } else {
      await api.post('/gallery', formData, config)
    }
    emit('close')
  } catch (err) {
    console.error(err)
    alert('Gagal menyimpan foto. Pastikan backend mendukung upload file.')
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
      <h3 class="text-xl font-bold">{{ item ? 'Edit Foto' : 'Tambah Foto Baru' }}</h3>
    </div>

    <form @submit.prevent="handleSubmit" class="max-w-xl space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Judul Kegiatan</label>
        <input v-model="title" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
        <textarea v-model="description" rows="2" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Foto Kegiatan</label>
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
