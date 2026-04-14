<template>
  <div class="relative min-h-screen pt-20 px-4 md:px-0">
    <!-- Hero Section -->
    <div class="text-center max-w-4xl mx-auto animation-fade-in mt-20 relative z-20">
      <h1 class="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white mb-8 leading-[0.9]">
        Vault Secure. <br/>
        <span class="text-blue-500">Enterprise Ready.</span>
      </h1>
      <p class="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
        High-fidelity hardware vulnerability analysis and secure protocol tracking in one liquid interface.
      </p>

      <!-- Liquid Search Interface -->
      <div class="max-w-xl mx-auto relative group scale-110 md:scale-125">
        <div class="relative mac-glass p-2 flex items-center shadow-2xl border border-white/30 dark:border-white/10 ring-1 ring-black/5">
          <div class="pl-4 text-gray-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            v-model="searchQuery" 
            @input="fetchSuggestions"
            @focus="showSuggestions = true"
            @keyup.enter="searchDevice(searchQuery)"
            type="text" 
            placeholder="Search IMEI or Model" 
            class="flex-1 bg-transparent border-none outline-none px-4 py-3 text-lg font-bold text-gray-900 dark:text-white placeholder-gray-400/60"
            autocomplete="off"
          />
          <button @click="searchDevice(searchQuery)" class="mac-button-primary !py-3 px-8 rounded-xl font-black tracking-wide">
            ANALYZE
          </button>
        </div>

        <transition name="fade">
          <div v-if="showSuggestions && suggestions.length > 0" class="absolute top-full left-0 right-0 mt-4 mac-glass rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/40 dark:border-white/10 overflow-hidden z-50 animate-fade-in">
            <ul class="divide-y divide-gray-100 dark:divide-white/5">
              <li v-for="suggestion in suggestions" :key="suggestion.id" @mousedown="searchDevice(suggestion.model_name)" class="p-5 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 cursor-pointer flex items-center justify-between transition-all group/item">
                <div class="flex items-center gap-5">
                  <div class="w-10 h-10 mac-glass rounded-xl flex items-center justify-center shrink-0">
                    <BrandLogo :brand="suggestion.brand" size="xs" />
                  </div>
                  <div class="text-left">
                    <div class="font-black text-gray-900 dark:text-white text-lg group-hover/item:text-blue-500 transition-colors">{{ suggestion.model_name }}</div>
                    <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{{ suggestion.brand }}</div>
                  </div>
                </div>
                <div class="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                  <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path></svg>
                </div>
              </li>
            </ul>
          </div>
        </transition>
        <p v-if="errorMsg" class="mt-4 text-red-500 text-xs font-black uppercase tracking-widest bg-red-500/10 py-1 px-4 rounded-full inline-block">{{ errorMsg }}</p>
      </div>
    </div>

    <!-- Liquid Feature Cards -->
    <div class="max-w-6xl mx-auto mt-48 grid grid-cols-1 md:grid-cols-3 gap-10 py-20 relative z-20">
      <div v-for="(feat, i) in features" :key="i" class="mac-card p-10 group hover:scale-105 transition-transform">
        <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg ring-1 ring-white/20', feat.color]">
          <component :is="feat.icon" class="w-7 h-7" />
        </div>
        <h3 class="text-2xl font-black mb-4 text-gray-900 dark:text-white tracking-tight">{{ feat.title }}</h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">{{ feat.desc }}</p>
      </div>
    </div>

    <!-- Real-time Security Ticker -->
    <div class="fixed bottom-0 left-0 right-0 h-12 mac-glass !bg-white/40 dark:!bg-black/40 !rounded-none z-50 flex items-center overflow-hidden border-t border-white/20">
      <div class="shrink-0 px-4 h-full flex items-center bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest mr-4 shadow-xl z-20">
        Live Security Stream
      </div>
      <div class="whitespace-nowrap flex gap-16 items-center text-[11px] font-bold text-gray-600 dark:text-gray-300 animate-marquee z-10">
        <span v-for="(threat, i) in recentThreats" :key="i" class="flex items-center gap-3">
          <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          <span class="text-blue-500 font-black">{{ threat.cve_id }}</span>
          {{ threat.description }}
        </span>
        <span v-if="recentThreats.length === 0" class="flex items-center gap-3">
           <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
           Active monitoring: Global security registries normalized.
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import BrandLogo from '../components/BrandLogo.vue'

export default {
  data() {
    return {
      searchQuery: '',
      errorMsg: '',
      suggestions: [],
      showSuggestions: false,
      searchTimeout: null,
      stats: null,
      recentThreats: [],
      features: [
        { title: 'Neural Diagnostics', desc: 'Predictive hardware vulnerability detection across ARM and x86 architectures.', icon: 'ZapIcon', color: 'bg-blue-500 text-white' },
        { title: 'Protocol Vault', desc: 'Real-time GSMA and carrier-level security compliance verification.', icon: 'ShieldIcon', color: 'bg-purple-500 text-white' },
        { title: 'Audit Ready', desc: 'Enterprise-grade PDF reporting with verifiable cryptographic security signatures.', icon: 'FileTextIcon', color: 'bg-indigo-500 text-white' }
      ]
    }
  },
  components: {
    BrandLogo,
    ZapIcon: { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>' },
    ShieldIcon: { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>' },
    FileTextIcon: { template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>' }
  },
  async mounted() {
    try {
      const pStats = fetch('http://127.0.0.1:8000/api/stats').then(r => r.json());
      const pThreats = fetch('http://127.0.0.1:8000/api/threats').then(r => r.json());
      const [resStats, resThreats] = await Promise.all([pStats, pThreats]);
      if (resStats.status === 'success') this.stats = resStats.data;
      if (resThreats.status === 'success') this.recentThreats = resThreats.data;
    } catch(e) {
      console.log('API not ready.');
    }
  },
  methods: {
    fetchSuggestions() {
      clearTimeout(this.searchTimeout);
      if (this.searchQuery.length < 2) {
        this.suggestions = [];
        return;
      }
      this.searchTimeout = setTimeout(async () => {
        try {
          const res = await fetch(`http://127.0.0.1:8000/api/search?q=${encodeURIComponent(this.searchQuery)}`);
          const json = await res.json();
          if (json.status === 'success') {
            this.suggestions = json.data;
            this.showSuggestions = true;
          }
        } catch (e) {
          console.error(e);
        }
      }, 300);
    },
    searchDevice(query) {
      if(!query) query = this.searchQuery;
      this.errorMsg = '';
      if (!query.trim()) {
        this.errorMsg = 'Target input empty.';
        return;
      }
      const isDigits = /^\d+$/.test(query.trim());
      if (isDigits && query.trim().length !== 15) {
         this.errorMsg = 'IMEI length mismatch.';
         return;
      }
      this.$router.push('/report/' + encodeURIComponent(query));
    }
  }
}
</script>

<style scoped>
.animate-marquee {
  animation: marquee 50s linear infinite;
}
@keyframes marquee {
  0% { transform: translateX(5%); }
  100% { transform: translateX(-100%); }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>


<style scoped>
.animate-marquee {
  animation: marquee 40s linear infinite;
}
@keyframes marquee {
  0% { transform: translateX(10%); }
  100% { transform: translateX(-100%); }
}
</style>

