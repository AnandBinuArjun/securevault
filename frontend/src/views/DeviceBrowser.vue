<template>
  <div class="p-6 lg:p-12 max-w-7xl mx-auto animation-fade-in relative z-20">
    <div class="flex flex-col lg:flex-row justify-between lg:items-center mb-12 gap-8">
      <div>
        <h2 class="text-5xl font-black tracking-tighter text-gray-900 dark:text-white">Hardware Registry</h2>
        <p class="text-gray-500 font-medium mt-2">Historical database of vetted hardware and their cryptographic status.</p>
      </div>
      <div class="flex flex-wrap gap-4">
         <select v-model="filterBrand" class="mac-glass px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest outline-none ring-1 ring-white/10 dark:text-white">
            <option value="" class="dark:bg-gray-900">All Manufacturers</option>
            <option value="Apple" class="dark:bg-gray-900">Apple</option>
            <option value="Samsung" class="dark:bg-gray-900">Samsung</option>
            <option value="Google" class="dark:bg-gray-900">Google</option>
         </select>
         <select v-model="filterYear" class="mac-glass px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest outline-none ring-1 ring-white/10 dark:text-white">
            <option value="" class="dark:bg-gray-900">All Audit Periods</option>
            <option v-for="y in [2024, 2023, 2022, 2021]" :key="y" :value="y" class="dark:bg-gray-900">{{ y }} Operations</option>
         </select>
         <select v-model="filterSecurity" class="mac-glass px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest outline-none ring-1 ring-white/10 dark:text-white">
            <option value="" class="dark:bg-gray-900">Registry: All</option>
            <option value="SUPPORTED" class="dark:bg-gray-900">Active Support</option>
            <option value="EOL" class="dark:bg-gray-900">End of Life</option>
         </select>
         <select v-model="filterStatus" class="mac-glass px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest outline-none ring-1 ring-white/10 dark:text-white">
            <option value="" class="dark:bg-gray-900">Integrity: All</option>
            <option value="CLEAN" class="dark:bg-gray-900">Status: Clean</option>
            <option value="STOLEN" class="dark:bg-gray-900">Status: Flagged</option>
         </select>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="i in 6" :key="i" class="h-48 mac-glass animate-pulse"></div>
    </div>
    
    <div v-else-if="filteredDevices.length === 0" class="text-center py-32 mac-card">
      <div class="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-400">
         <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="3"></path></svg>
      </div>
      <p class="text-gray-400 font-black uppercase tracking-widest text-xs mb-4">No assets match your search</p>
      <button @click="resetFilters" class="text-blue-500 font-black uppercase tracking-widest text-[10px] hover:underline">Reset Protocols</button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="device in filteredDevices" :key="device.id" 
           @click="$router.push('/report/' + encodeURIComponent(device.model_name))"
           class="mac-card group hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-48">
        
        <div class="p-8">
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-4">
              <BrandLogo :brand="device.brand" size="sm" class="text-blue-500 dark:text-white" />
              <div>
                <p class="text-[9px] font-black text-blue-500 uppercase tracking-widest">{{ device.brand }}</p>
                <h3 class="text-2xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">{{ device.model_name }}</h3>
              </div>
            </div>
            <span v-if="device.status === 'CLEAN'" class="px-2.5 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[9px] font-black uppercase tracking-widest shrink-0">CLEAN</span>
            <span v-else class="px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full text-[9px] font-black uppercase tracking-widest shrink-0">STOLEN</span>
          </div>
        </div>

        <div class="px-8 pb-8 flex items-center justify-between border-t border-white/5 pt-4">
          <div class="flex items-center gap-2">
            <div :class="['w-2 h-2 rounded-full', device.cves_count === 0 ? 'bg-green-500 shadow-[0_0_8px_rgba(52,199,89,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(255,59,48,0.5)]']"></div>
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {{ device.cves_count === 0 ? 'INTEGRITY VERIFIED' : device.cves_count + ' THREATS DETECTED' }}
            </span>
          </div>
          <svg class="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-width="3"></path></svg>
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
      devices: [],
      loading: true,
      filterBrand: '',
      filterStatus: '',
      filterYear: '',
      filterSecurity: ''
    }
  },
  computed: {
    filteredDevices() {
      return this.devices.filter(d => {
        if(this.filterBrand && d.brand !== this.filterBrand) return false;
        if(this.filterStatus && d.status !== this.filterStatus) return false;
        if(this.filterYear && !d.release_date.includes(this.filterYear.toString())) return false;
        if(this.filterSecurity && d.security_status !== this.filterSecurity) return false;
        return true;
      });
    }
  },
  async mounted() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/devices');
      const json = await res.json();
      if (json.status === 'success') {
        this.devices = json.data;
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    resetFilters() {
      this.filterBrand = '';
      this.filterStatus = '';
      this.filterYear = '';
      this.filterSecurity = '';
    }
  }
}
</script>
