<template>
  <div class="p-6 md:p-12 max-w-7xl mx-auto animation-fade-in relative z-20">
    <div class="mb-16">
      <h2 class="text-5xl font-black tracking-tighter text-gray-900 dark:text-white mb-4">Differential Analysis</h2>
      <p class="text-gray-500 font-medium">Side-by-side hardware integrity comparison for fleet procurement.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Device A -->
      <div class="space-y-8">
        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Asset Alpha</label>
        <div class="mac-glass p-1 rounded-2xl flex items-center shadow-xl">
          <input v-model="queryA" @input="searchA" placeholder="Search Device A..." class="bg-transparent border-none outline-none px-6 py-4 flex-1 font-bold text-gray-900 dark:text-white" />
        </div>
        
        <div v-if="deviceA" class="mac-card p-10 animate-fade-in border-blue-500/20">
          <div class="flex items-center gap-6 mb-8">
            <BrandLogo :brand="deviceA.brand" size="lg" />
            <div>
              <h3 class="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">{{ deviceA.model_name }}</h3>
              <p class="text-blue-500 font-bold text-xs uppercase">{{ deviceA.brand }} Registry</p>
            </div>
          </div>
          <RiskScoreBadge :score="deviceA.security_score" />
          <div class="mt-8 pt-8 border-t border-white/5 space-y-4">
             <div class="flex justify-between text-sm"><span class="text-gray-400 font-medium">Audit Status</span><span class="text-green-500 font-black">{{ deviceA.security_status }}</span></div>
             <div class="flex justify-between text-sm"><span class="text-gray-400 font-medium">Vulnerabilities</span><span class="text-red-500 font-black">{{ deviceA.cves_count }}</span></div>
             <div class="flex justify-between text-sm"><span class="text-gray-400 font-medium">Lifecycle</span><span class="text-gray-100 font-black">{{ deviceA.release_date }}</span></div>
          </div>
        </div>
      </div>

      <!-- Device B -->
      <div class="space-y-8">
        <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Asset Beta</label>
        <div class="mac-glass p-1 rounded-2xl flex items-center shadow-xl">
          <input v-model="queryB" @input="searchB" placeholder="Search Device B..." class="bg-transparent border-none outline-none px-6 py-4 flex-1 font-bold text-gray-900 dark:text-white" />
        </div>

        <div v-if="deviceB" class="mac-card p-10 animate-fade-in border-purple-500/20">
          <div class="flex items-center gap-6 mb-8">
            <BrandLogo :brand="deviceB.brand" size="lg" />
            <div>
              <h3 class="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">{{ deviceB.model_name }}</h3>
              <p class="text-purple-500 font-bold text-xs uppercase">{{ deviceB.brand }} Registry</p>
            </div>
          </div>
          <RiskScoreBadge :score="deviceB.security_score" />
          <div class="mt-8 pt-8 border-t border-white/5 space-y-4">
             <div class="flex justify-between text-sm"><span class="text-gray-400 font-medium">Audit Status</span><span class="text-green-500 font-black">{{ deviceB.security_status }}</span></div>
             <div class="flex justify-between text-sm"><span class="text-gray-400 font-medium">Vulnerabilities</span><span class="text-red-500 font-black">{{ deviceB.cves_count }}</span></div>
             <div class="flex justify-between text-sm"><span class="text-gray-400 font-medium">Lifecycle</span><span class="text-gray-100 font-black">{{ deviceB.release_date }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BrandLogo from '../components/BrandLogo.vue';
import RiskScoreBadge from '../components/RiskScoreBadge.vue';

export default {
  components: { BrandLogo, RiskScoreBadge },
  data() {
    return {
      queryA: '',
      queryB: '',
      deviceA: null,
      deviceB: null,
      timeoutA: null,
      timeoutB: null
    }
  },
  methods: {
    searchA() {
      clearTimeout(this.timeoutA);
      this.timeoutA = setTimeout(() => this.fetchDevice('A'), 300);
    },
    searchB() {
      clearTimeout(this.timeoutB);
      this.timeoutB = setTimeout(() => this.fetchDevice('B'), 300);
    },
    async fetchDevice(target) {
      const q = target === 'A' ? this.queryA : this.queryB;
      if (q.length < 2) return;
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/devices/check?q=${encodeURIComponent(q)}`);
        const json = await res.json();
        if (json.status === 'success' && json.data) {
          if (target === 'A') this.deviceA = { ...json.data.device, cves_count: json.data.vulnerabilities?.length || 0 };
          else this.deviceB = { ...json.data.device, cves_count: json.data.vulnerabilities?.length || 0 };
        }
      } catch (e) { console.error(e); }
    }
  }
}
</script>
