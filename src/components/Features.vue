<script setup>
const features = [
  {
    icon: '📚',
    title: 'Kurikulum Merdeka',
    desc: 'Pembelajaran yang berpusat pada peserta didik dan mengembangkan minat bakat.'
  },
  {
    icon: '🏆',
    title: 'Prestasi Unggul',
    desc: 'Mencetak siswa berprestasi di bidang akademik maupun non-akademik.'
  },
  {
    icon: '🕌',
    title: 'Berakhlak Mulia',
    desc: 'Menanamkan nilai-nilai keagamaan dan budi pekerti luhur sejak dini.'
  }
]
</script>

<template>
  <section id="features" class="py-20 bg-gray-50">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-secondary font-bold tracking-wider uppercase text-sm mb-3">Keunggulan Kami</h2>
        <h3 class="text-3xl md:text-4xl font-bold text-accent mb-4">Mengapa Memilih SDN 1 Lenek Daya?</h3>
        <div class="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(item, index) in features" :key="index" class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
          <div class="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            {{ item.icon }}
          </div>
          <h4 class="text-xl font-bold text-accent mb-3">{{ item.title }}</h4>
          <p class="text-gray-600 leading-relaxed text-sm">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
