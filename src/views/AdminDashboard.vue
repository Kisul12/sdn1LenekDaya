<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import auth from '../services/auth'

// Components (will be created next)
import ProfileForm from '../components/admin/ProfileForm.vue'
import TeacherList from '../components/admin/TeacherList.vue'
import GalleryList from '../components/admin/GalleryList.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

const router = useRouter()
const activeTab = ref('profile') // 'profile', 'teachers', 'gallery'
const isSidebarOpen = ref(true)
const showLogoutModal = ref(false)

const confirmLogout = () => {
  auth.logout()
  router.push('/admin/login')
  showLogoutModal.value = false
}

const menuItems = [
  { id: 'profile', label: 'Profil Sekolah', icon: '🏫' },
  { id: 'teachers', label: 'Data Guru', icon: '👨‍🏫' },
  { id: 'gallery', label: 'Galeri Kegiatan', icon: '📸' }
]
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside 
      :class="[
        'bg-white w-64 fixed h-full shadow-lg z-20 transition-transform duration-300',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-64'
      ]"
    >
      <div class="p-6 border-b">
        <h1 class="text-2xl font-bold text-primary flex items-center gap-2">
          <span>⚙️</span> Admin Panel
        </h1>
      </div>

      <nav class="p-4 space-y-2">
        <button
          v-for="item in menuItems"
          :key="item.id"
          @click="activeTab = item.id"
          :class="[
            'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium',
            activeTab === item.id ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-50'
          ]"
        >
          <span>{{ item.icon }}</span>
          {{ item.label }}
        </button>

        <div class="pt-8 border-t mt-8">
          <button 
            @click="showLogoutModal = true"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors font-medium"
          >
            <span>🚪</span> Keluar
          </button>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 lg:ml-64 min-h-screen flex flex-col">
      <!-- Topbar -->
      <header class="bg-white shadow-sm p-4 flex justify-between items-center lg:hidden">
        <button @click="isSidebarOpen = !isSidebarOpen" class="text-2xl text-gray-600">
          ☰
        </button>
        <span class="font-bold text-gray-700">Admin Dashboard</span>
      </header>

      <div class="p-6 md:p-10 flex-grow">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 capitalize">
          Kelola {{ menuItems.find(i => i.id === activeTab)?.label }}
        </h2>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[500px] p-6">
          <Transition name="fade" mode="out-in">
            <ProfileForm v-if="activeTab === 'profile'" />
            <TeacherList v-else-if="activeTab === 'teachers'" />
            <GalleryList v-else-if="activeTab === 'gallery'" />
          </Transition>
        </div>
      </div>
    </main>

    <ConfirmModal 
      :isOpen="showLogoutModal"
      title="Konfirmasi Logout"
      message="Apakah Anda yakin ingin keluar dari halaman admin?"
      confirmText="Ya, Logout"
      cancelText="Batal"
      type="danger"
      @confirm="confirmLogout"
      @close="showLogoutModal = false"
    />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
