<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'
import GalleryForm from './GalleryForm.vue'
import ConfirmModal from '../ConfirmModal.vue'

const items = ref([])
const loading = ref(true)
const showForm = ref(false)
const selectedItem = ref(null)

// Delete State
const showDeleteModal = ref(false)
const itemToDelete = ref(null)

const fetchGallery = async () => {
  try {
    const res = await api.get('/gallery')
    items.value = res.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const openForm = (item = null) => {
  selectedItem.value = item
  showForm.value = true
}

const handleFormClose = () => {
  showForm.value = false
  selectedItem.value = null
  fetchGallery()
}

const confirmDelete = (id) => {
  itemToDelete.value = id
  showDeleteModal.value = true
}

const deleteGallery = async () => {
  if (!itemToDelete.value) return
  
  try {
    await api.delete(`/gallery/${itemToDelete.value}`)
    fetchGallery()
  } catch (err) {
    console.error(err)
    alert('Gagal menghapus foto')
  } finally {
    showDeleteModal.value = false
    itemToDelete.value = null
  }
}

onMounted(() => {
  fetchGallery()
})
</script>

<template>
  <div>
    <div v-if="!showForm">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-800">Daftar Foto Galeri</h3>
        <button @click="openForm()" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-bold text-sm">
          + Tambah Foto
        </button>
      </div>

      <div v-if="loading" class="text-center py-10 text-gray-500">Memuat data...</div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in items" :key="item._id" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
          <div class="h-48 overflow-hidden relative">
             <img :src="item.imageUrl" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
             <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
               <div class="flex gap-2">
                 <button @click.stop="openForm(item)" class="bg-white/20 hover:bg-white text-white hover:text-primary backdrop-blur-sm p-2 rounded-lg transition-colors" title="Edit">✏️</button>
                 <button @click.stop="confirmDelete(item._id)" class="bg-white/20 hover:bg-red-500 text-white backdrop-blur-sm p-2 rounded-lg transition-colors" title="Hapus">🗑️</button>
               </div>
             </div>
          </div>
          <div class="p-4">
            <h4 class="font-bold text-gray-800 mb-1 truncate">{{ item.title }}</h4>
            <p class="text-sm text-gray-500 line-clamp-2">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <GalleryForm 
      v-else 
      :item="selectedItem" 
      @close="handleFormClose" 
    />

    <ConfirmModal 
      :isOpen="showDeleteModal"
      title="Hapus Foto"
      message="Apakah Anda yakin ingin menghapus foto ini? Tindakan ini tidak dapat dibatalkan."
      confirmText="Ya, Hapus"
      cancelText="Batal"
      type="danger"
      @confirm="deleteGallery"
      @close="showDeleteModal = false"
    />
  </div>
</template>
