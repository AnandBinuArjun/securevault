<template>
  <div class="p-6 lg:p-12 max-w-5xl mx-auto animation-fade-in relative z-20">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
      <div>
        <h2 class="text-5xl font-black tracking-tighter text-gray-900 dark:text-white">Live Threat Intelligence</h2>
        <p class="text-gray-500 font-medium mt-2">Latest security vulnerabilities normalized across the SecureVault network.</p>
      </div>
      <div class="flex items-center gap-3 bg-red-500/10 px-5 py-2.5 rounded-2xl ring-1 ring-red-500/20 shadow-lg shadow-red-500/5">
        <span class="relative flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <span class="text-xs font-black text-red-500 uppercase tracking-widest">Global Stream Active</span>
      </div>
    </div>

    <!-- Liquid Filters -->
    <div class="mb-10 flex flex-wrap gap-4 items-center">
      <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">Filter Sensitivity:</span>
      <button 
        v-for="sev in ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM']" 
        :key="sev"
        @click="filterSeverity = sev === 'ALL' ? '' : sev"
        :class="['px-5 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ring-1', 
          (filterSeverity === sev || (sev === 'ALL' && filterSeverity === '')) 
            ? 'bg-blue-500 text-white ring-blue-500 shadow-xl shadow-blue-500/20' 
            : 'mac-glass text-gray-400 ring-white/10 hover:ring-white/30']"
      >
        {{ sev }}
      </button>
    </div>

    <div v-if="loading" class="flex flex-col gap-8">
      <div v-for="i in 5" :key="i" class="h-32 mac-glass animate-pulse"></div>
    </div>
    
    <div v-else-if="filteredThreats.length === 0" class="text-center py-32 mac-card">
      <div class="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-400">
         <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="3"></path></svg>
      </div>
      <p class="text-gray-400 font-black uppercase tracking-widest text-xs">No active alerts match the filter</p>
    </div>

    <div v-else class="space-y-8">
      <div v-for="threat in filteredThreats" :key="threat.id" class="mac-card group hover:scale-[1.01] transition-transform relative overflow-hidden">
        <!-- Glow accent -->
        <div :class="['absolute top-0 left-0 w-1.5 h-full', 
          threat.severity === 'CRITICAL' ? 'bg-red-500 shadow-[0_0_15px_rgba(255,59,48,0.5)]' : 
          threat.severity === 'HIGH' ? 'bg-orange-500 shadow-[0_0_15px_rgba(255,149,0,0.5)]' : 
          threat.severity === 'MEDIUM' ? 'bg-yellow-500 shadow-[0_0_15px_rgba(255,204,0,0.5)]' : 'bg-green-500 shadow-[0_0_15px_rgba(52,199,89,0.5)]']"></div>

        <div class="p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-3">
               <span class="font-black text-2xl text-gray-900 dark:text-white tracking-tighter">{{ threat.cve_id }}</span>
               <span :class="['px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest ring-1', 
                 threat.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-500 ring-red-500/30' : 
                 threat.severity === 'HIGH' ? 'bg-orange-500/10 text-orange-500 ring-orange-500/30' : 
                 threat.severity === 'MEDIUM' ? 'bg-yellow-500/10 text-yellow-500 ring-yellow-500/30' : 'bg-green-500/10 text-green-500 ring-green-500/30']">
                 {{ threat.severity }}
               </span>
            </div>
            <p class="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed max-w-2xl line-clamp-2">{{ threat.description }}</p>
          </div>
          
          <div class="text-left md:text-right flex flex-col items-start md:items-end shrink-0">
            <div class="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Audited Registry</div>
            <button @click="$router.push('/report/' + encodeURIComponent(threat.device.model_name))" class="mac-button !py-2.5 !px-5 text-xs flex items-center gap-3">
               <BrandLogo :brand="threat.device.brand" size="xs" />
               <span class="font-black text-blue-500">{{ threat.device.model_name }}</span>
               <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-width="3"></path></svg>
            </button>
            <div class="text-[10px] font-bold text-gray-400 mt-4">{{ new Date(threat.discovered_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}</div>
          </div>
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
      threats: [],
      loading: true,
      filterSeverity: ''
    }
  },
  computed: {
    filteredThreats() {
      if (!this.filterSeverity) return this.threats;
      return this.threats.filter(t => t.severity === this.filterSeverity);
    }
  },
  async mounted() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/threats');
      const json = await res.json();
      if (json.status === 'success') {
        this.threats = json.data;
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }
}
</script>


