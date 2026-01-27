<script setup>
defineProps({
  isOpen: Boolean,
  title: String,
  message: String,
  confirmText: {
    type: String,
    default: 'Ya, Lanjutkan'
  },
  cancelText: {
    type: String,
    default: 'Batal'
  },
  type: {
    type: String,
    default: 'danger', // 'danger', 'warning', 'info'
    validator: (value) => ['danger', 'warning', 'info'].includes(value)
  }
})

defineEmits(['confirm', 'close'])
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        @click="$emit('close')"
      ></div>

      <!-- Modal Card -->
      <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative z-10 transform transition-all text-center overflow-hidden">
        
        <!-- Icon -->
        <div 
          class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transiton-colors"
          :class="{
            'bg-red-100 text-red-600': type === 'danger',
            'bg-yellow-100 text-yellow-600': type === 'warning',
            'bg-blue-100 text-blue-600': type === 'info'
          }"
        >
          <span v-if="title.toLowerCase().includes('logout')" class="text-3xl">🚪</span>
          <span v-else-if="type === 'danger'" class="text-3xl">🗑️</span>
          <span v-else class="text-3xl">ℹ️</span>
        </div>

        <h3 class="text-xl font-bold text-gray-900 mb-2">{{ title }}</h3>
        <p class="text-gray-500 mb-8 leading-relaxed">{{ message }}</p>

        <div class="grid grid-cols-2 gap-3">
          <button 
            @click="$emit('close')"
            class="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 hover:text-gray-800 transition-colors"
          >
            {{ cancelText }}
          </button>
          
          <button 
            @click="$emit('confirm')"
            class="px-4 py-2.5 rounded-xl text-white font-bold shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            :class="{
              'bg-red-500 hover:bg-red-600 shadow-red-200': type === 'danger',
              'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-200': type === 'warning',
              'bg-blue-500 hover:bg-blue-600 shadow-blue-200': type === 'info'
            }"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
</style>
