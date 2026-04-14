<template>
  <div class="p-6 md:p-12 max-w-7xl mx-auto animation-fade-in relative z-20">
    <div class="mb-16">
      <h2 class="text-5xl font-black tracking-tighter text-gray-900 dark:text-white mb-4">Vault Archive</h2>
      <p class="text-gray-500 font-medium">Your private repository of hardware integrity audits.</p>
    </div>

    <div v-if="archive.length === 0" class="mac-card p-20 text-center">
       <div class="w-16 h-16 mac-glass rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-300">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" stroke-width="2.5"></path></svg>
       </div>
       <p class="text-gray-400 font-bold uppercase tracking-widest text-xs">No audits archived yet.</p>
       <button @click="$router.push('/devices')" class="mac-button mt-8">Secure New Asset</button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       <div v-for="item in archive" :key="item.id" class="mac-card p-8 group hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden" @click="$router.push('/report/' + encodeURIComponent(item.model))">
          <div class="flex justify-between items-start mb-6">
             <BrandLogo :brand="item.brand" size="sm" />
             <button @click.stop="removeFromArchive(item.id)" class="text-gray-400 hover:text-red-500 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2"></path></svg>
             </button>
          </div>
          <h3 class="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-2">{{ item.model }}</h3>
          <div class="flex justify-between items-center">
             <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">{{ item.date }}</span>
             <div class="text-[10px] font-black p-1 px-3 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">SCORE: {{ item.score }}</div>
          </div>
       </div>
    </div>
  </div>
</template>

<script>
import BrandLogo from '../components/BrandLogo.vue'

export default {
  components: { BrandLogo },
  data() {
    return {
      archive: []
    }
  },
  mounted() {
    this.archive = JSON.parse(localStorage.getItem('securevault_archive') || '[]');
  },
  methods: {
    removeFromArchive(id) {
      this.archive = this.archive.filter(a => a.id !== id);
      localStorage.setItem('securevault_archive', JSON.stringify(this.archive));
    }
  }
}
</script>
