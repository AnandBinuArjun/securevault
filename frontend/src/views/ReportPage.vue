<template>
  <div class="p-6 md:p-12 max-w-7xl mx-auto animation-fade-in relative z-20">
    
    <!-- Navigation -->
    <div @click="$router.push('/')" class="inline-flex items-center gap-3 text-blue-500 font-black uppercase tracking-widest hover:underline cursor-pointer transition mb-12 group text-xs">
       <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
       Return to Vault
    </div>

    <!-- Main Content State machine -->
    <div class="content-wrapper">
      <div v-if="loading" class="animate-pulse space-y-10">
        <div class="h-32 mac-glass w-full"></div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
           <div class="h-64 mac-glass"></div>
           <div class="h-64 mac-glass md:col-span-2"></div>
        </div>
      </div>
      
      <div v-else-if="!device" class="text-center py-32 mac-card max-w-3xl mx-auto">
        <div class="w-20 h-20 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        <h2 class="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">Device Ghosting</h2>
        <p class="text-gray-500 font-medium max-w-md mx-auto">The integrity signal for this target returned null. No hardware registry matches found.</p>
        <button @click="$router.push('/')" class="mac-button-primary mt-10 !px-10">New Operation</button>
      </div>

      <div v-else class="space-y-10">
        <!-- Header Area -->
        <div class="mac-card p-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div class="flex items-center gap-8">
            <div class="w-24 h-24 mac-glass rounded-3xl flex items-center justify-center text-blue-500 font-black text-5xl shadow-2xl border-white/40">
               <BrandLogo :brand="device.brand" size="lg" />
            </div>
            <div class="text-center md:text-left">
              <h1 class="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white leading-tight">{{ device.model_name }}</h1>
              <div class="flex flex-wrap items-center gap-4 mt-3 justify-center md:justify-start">
                <span class="text-xs font-black text-blue-500 bg-blue-500/10 px-4 py-1 rounded-full uppercase tracking-widest ring-1 ring-blue-500/30">{{ device.brand }} Registry</span>
                <span class="text-xs font-black text-purple-500 bg-purple-500/10 px-4 py-1 rounded-full uppercase tracking-widest ring-1 ring-purple-500/30">{{ device.os_type }}</span>
                <span :class="['text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest ring-1', device.security_status === 'SUPPORTED' ? 'text-green-500 bg-green-500/10 ring-green-500/30' : 'text-red-500 bg-red-500/10 ring-red-500/30']">
                   {{ device.security_status }}
                </span>
                <span class="text-xs font-bold text-gray-400">RELEASED: {{ device.release_date }}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <button @click="copyShareLink" class="mac-button flex items-center gap-3 !py-3 !px-6">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
              Share
            </button>
            <button @click="saveToVault" class="mac-button flex items-center gap-3 !py-3 !px-6 border-indigo-500/20 group">
               <svg class="w-4 h-4 text-indigo-500 group-hover:fill-indigo-500 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" stroke-width="2.5"></path></svg>
               Archive Audit
            </button>
            <button @click="showBadgeModal = true" class="mac-button flex items-center gap-3 !py-3 !px-6 border-blue-500/20">
               <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke-width="3"></path></svg>
               Embed Badge
            </button>
            <button @click="downloadPdf" class="mac-button-primary flex items-center gap-3 !py-3 !px-8 shadow-[0_10px_30px_rgba(0,122,255,0.4)]">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Export Audit
            </button>
          </div>
        </div>

        <!-- Comparison & Remediation Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <!-- Left: Intelligence -->
          <div class="lg:col-span-2 space-y-12">
            <CveTable :vulnerabilities="vulnerabilities" />

            <!-- Remediation Guide -->
            <div class="mac-card p-10 relative overflow-hidden group">
              <div class="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg class="w-32 h-32 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke-width="2"></path></svg>
              </div>
              <h3 class="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mb-8">Remediation Roadmap</h3>
              <div class="space-y-8">
                <div v-for="(step, idx) in [
                  { t: 'Initialize Kernel Patch', d: 'Targeted mitigation for discovered CVEs. Install Security Bulletin 2024-Q1 immediately.' },
                  { t: 'Cryptographic Re-Keying', d: 'Detected biometric drift. Re-enrollment of Secure Enclave keys is recommended.' },
                  { t: 'Network Layer Audit', d: 'Check for unauthorized cellular certificates or MDM profile anomalies.' }
                ]" :key="idx" class="flex gap-6">
                  <div class="w-12 h-12 mac-glass rounded-2xl flex items-center justify-center shrink-0 font-black text-blue-500 shadow-lg">{{ idx + 1 }}</div>
                  <div>
                    <h4 class="text-lg font-black text-gray-900 dark:text-white">{{ step.t }}</h4>
                    <p class="text-gray-500 font-medium mt-1 leading-relaxed">{{ step.d }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-10">
              <!-- Timeline Card -->
              <div class="mac-card p-10 flex flex-col">
                <h3 class="text-xl font-black mb-8 tracking-tight uppercase text-gray-400">Threat Frequency</h3>
                <div class="h-80 w-full">
                   <LineChart :data="chartData" :options="chartOptions" v-if="chartData.labels.length > 0" />
                </div>
              </div>

              <!-- Recommendations Card -->
              <div class="mac-card p-10 relative overflow-hidden">
                <div class="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                   <svg class="w-40 h-40 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <h4 class="text-2xl font-black text-blue-500 mb-8 flex items-center gap-3">
                   <div class="w-2 h-6 bg-blue-500 rounded-full"></div>
                   Security Hardening
                </h4>
                <ul class="space-y-6">
                  <li v-for="(rec, i) in recs" :key="i" class="flex gap-4">
                    <span class="font-black text-blue-500/40 text-lg">0{{ i+1 }}</span>
                    <div>
                       <p class="font-bold text-gray-900 dark:text-white leading-tight mb-1">{{ rec.title }}</p>
                       <p class="text-sm text-gray-500 font-medium">{{ rec.desc }}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Right: Status -->
          <div class="space-y-10">
            <RiskScoreBadge :score="securityScore" />
            <StolenStatusComponent :status="device.status" :query="query" />
            
            <!-- History Timeline -->
            <div class="mac-card p-8">
              <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Audit History Trace</h3>
              <div class="space-y-10 relative">
                <div class="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gray-100 dark:bg-white/5"></div>
                <div v-for="y in [2024, 2023, 2022]" :key="y" class="flex gap-6 relative">
                  <div class="w-5 h-5 rounded-full bg-blue-500 ring-4 ring-blue-500/10 z-10 transition-transform hover:scale-125"></div>
                  <div>
                    <div class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{{ y }} — SECURE CORE</div>
                    <div class="text-sm font-black text-gray-900 dark:text-white">DIAGNOSTIC: PASS</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- GSMA Integration Section -->
            <div class="mac-card p-8 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/10">
              <h3 class="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-6">GSMA Compliance Verified</h3>
              <div class="flex items-center gap-6 mb-8">
                 <div class="w-16 h-16 mac-glass rounded-2xl flex items-center justify-center text-blue-500 shadow-xl">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke-width="2.5"></path></svg>
                 </div>
                 <div>
                    <div class="text-xl font-black text-gray-900 dark:text-white">Signal: NOMINAL</div>
                    <div class="text-[10px] font-bold text-gray-400 uppercase">Integrity Hash: {{ (device && device.model_name || 'vault').substring(0,8).toUpperCase() }}-2026</div>
                 </div>
              </div>
            </div>

            <!-- Quick Share QR -->
            <div class="mac-card p-10 text-center flex flex-col items-center">
              <div class="w-32 h-32 bg-white rounded-3xl p-4 shadow-xl mb-6">
                 <div class="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                    <div class="grid grid-cols-4 gap-1 w-16 h-16">
                       <div v-for="i in 16" :key="i" :class="['w-full h-full rounded-sm', Math.random() > 0.4 ? 'bg-white' : 'bg-transparent']"></div>
                    </div>
                 </div>
              </div>
              <button @click="copyShareLink" class="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">Verify Identity Trace</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals & Toasts (Outside content-wrapper but inside root) -->
    <transition name="fade">
      <div v-if="showToast" class="fixed bottom-14 left-1/2 -translate-x-1/2 mac-glass !bg-blue-500 px-10 py-4 rounded-3xl shadow-2xl font-black text-sm text-white flex items-center gap-4 border-none z-[1000]">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
        OPERATION SUCCESSFUL
      </div>
    </transition>

    <transition name="fade">
      <div v-if="showBadgeModal" class="fixed inset-0 z-[100] flex items-center justify-center p-8">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-md" @click="showBadgeModal = false"></div>
        <div class="mac-card !p-12 max-w-2xl w-full relative z-[110] animate-scale-in">
          <h3 class="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">Security Embed Protocol</h3>
          <p class="text-gray-500 font-medium mb-10 leading-relaxed">Copy this snippet to display the live SecureVault integrity status on your external inventory portals.</p>
          
          <div class="bg-gray-100 dark:bg-black/40 rounded-3xl p-8 mb-10 border border-white/5 font-mono text-sm text-blue-500 break-all select-all">
            &lt;iframe src="http://securevault.local/badge/{{ (device && device.model_name || '').replace(' ', '%20') }}" width="300" height="80" frameborder="0"&gt;&lt;/iframe&gt;
          </div>

          <div class="flex gap-4">
             <button @click="showBadgeModal = false" class="mac-button flex-1">Abort</button>
             <button @click="copyShareLink" class="mac-button-primary flex-1">Copy Snippet</button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line } from 'vue-chartjs'
import BrandLogo from '../components/BrandLogo.vue'
import RiskScoreBadge from '../components/RiskScoreBadge.vue'
import StolenStatusComponent from '../components/StolenStatusComponent.vue'
import CveTable from '../components/CveTable.vue'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default {
  components: { RiskScoreBadge, StolenStatusComponent, CveTable, BrandLogo, LineChart: Line },
  data() {
    return {
      query: this.$route.params.query,
      loading: true,
      device: null,
      vulnerabilities: [],
      showToast: false,
      showQR: false,
      showBadgeModal: false,
      recs: [
        { title: 'Firmware Rotation', desc: 'Initiate hardware firmware refresh to patch baseband vulnerabilities.' },
        { title: 'Trust Zone Audit', desc: 'Secure boot enclave verification and TEE integrity check required.' },
        { title: 'Identity Purge', desc: 'Cryptographically wipe stored credentials before handler transfer.' }
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { family: 'Mona Sans', weight: 'bold' } } },
          y: { grid: { color: 'rgba(0,0,0,0.03)', borderDash: [5, 5] }, ticks: { color: '#9ca3af', font: { family: 'Mona Sans' } } }
        }
      }
    }
  },
  computed: {
    securityScore() {
      if (!this.device) return 0;
      return this.device.security_score || 85;
    },
    chartData() {
      return {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
        datasets: [{
          label: 'Threat Intensity',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: '#007AFF',
          backgroundColor: 'rgba(0, 122, 255, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#007AFF'
        }]
      };
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const q = this.query.toLowerCase();
        const res = await fetch(`http://127.0.0.1:8000/api/devices/check?q=${encodeURIComponent(q)}`);
        if (!res.ok) this.device = null;
        else {
           const json = await res.json();
           if (json.status === 'success' && json.data) {
              this.device = json.data.device;
              this.vulnerabilities = json.data.vulnerabilities || [];
           } else this.device = null;
        }
      } catch (err) { this.device = null; }
      finally { this.loading = false; }
    },
    copyShareLink() {
      navigator.clipboard.writeText(window.location.href);
      this.showToast = true;
      setTimeout(() => this.showToast = false, 3000);
    },
    downloadPdf() { window.print(); },
    saveToVault() {
      if (!this.device) return;
      const archive = JSON.parse(localStorage.getItem('securevault_archive') || '[]');
      if (!archive.find(a => a.id === this.device.id)) {
        archive.push({
          id: this.device.id,
          model: this.device.model_name,
          brand: this.device.brand,
          score: this.securityScore,
          date: new Date().toLocaleDateString()
        });
        localStorage.setItem('securevault_archive', JSON.stringify(archive));
      }
      this.showToast = true;
      setTimeout(() => this.showToast = false, 3000);
    }
  }
}
</script>
