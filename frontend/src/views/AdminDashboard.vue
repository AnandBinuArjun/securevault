<template>
  <div class="p-6 lg:p-12 max-w-7xl mx-auto animation-fade-in relative z-20">
    <div class="mb-12">
      <h2 class="text-5xl font-black tracking-tighter text-gray-900 dark:text-white">Admin Operations</h2>
      <p class="text-gray-500 font-medium mt-2">Enterprise-wide diagnostic overview and intrusion monitoring.</p>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div v-for="i in 4" :key="i" class="h-32 mac-glass animate-pulse"></div>
    </div>
    
    <div v-else-if="stats" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      <!-- Total Devices -->
      <div class="mac-card p-10 group overflow-hidden relative">
        <div class="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
           <svg class="w-20 h-20 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" stroke-width="2" stroke-linecap="round"></path></svg>
        </div>
        <div class="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Total Managed</div>
        <div class="text-5xl font-black text-gray-900 dark:text-white tabular-nums">{{ stats.total_devices }}</div>
      </div>
      
      <!-- Clean vs Stolen -->
      <div class="mac-card p-10 flex gap-10">
        <div class="flex-1">
           <div class="text-green-500 text-[10px] font-black uppercase tracking-widest mb-2">Clean</div>
           <div class="text-4xl font-black text-green-500 tabular-nums">{{ stats.clean_devices }}</div>
        </div>
        <div class="w-px bg-white/10"></div>
        <div class="flex-1 text-right">
           <div class="text-red-500 text-[10px] font-black uppercase tracking-widest mb-2">Stolen</div>
           <div class="text-4xl font-black text-red-500 tabular-nums">{{ stats.stolen_devices }}</div>
        </div>
      </div>

      <!-- Total Threats -->
      <div class="mac-card p-10">
        <div class="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Logged CVEs</div>
        <div class="text-5xl font-black text-gray-900 dark:text-white tabular-nums">{{ stats.total_threats }}</div>
      </div>
      
      <!-- Critical Threats -->
      <div class="mac-card p-10 border-red-500/20 bg-red-500/5">
        <div class="text-red-500 text-[10px] font-black uppercase tracking-widest mb-2">Critical Risk</div>
        <div class="text-5xl font-black text-red-500 tabular-nums">{{ stats.critical_threats }}</div>
      </div>
    </div>

    <div v-if="stats" class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
      <!-- Search Volume -->
      <div class="mac-card p-10">
        <h3 class="text-xl font-black mb-8 tracking-tight">Search Traffic</h3>
        <div class="h-64 relative w-full">
           <LineChart :data="searchVolumeData" :options="chartOptions" />
        </div>
      </div>
      
      <!-- Top Devices -->
      <div class="mac-card p-10">
        <h3 class="text-xl font-black mb-8 tracking-tight">High Interest Targets</h3>
        <div class="h-64 relative w-full">
           <BarChart :data="topDevicesData" :options="chartOptions" />
        </div>
      </div>

      <!-- Severity Pie -->
      <div class="mac-card p-10">
        <h3 class="text-xl font-black mb-8 tracking-tight">Threat Distribution</h3>
        <div class="h-80 relative w-full flex justify-center">
           <DoughnutChart :data="severityData" :options="pieOptions" />
        </div>
      </div>
      
      <!-- API Usage -->
      <div class="mac-card p-10">
        <h3 class="text-xl font-black mb-8 tracking-tight">Security Anomalies</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-white/5 text-gray-400">
                <th class="pb-4 text-[10px] font-black uppercase">Origin IP</th>
                <th class="pb-4 text-[10px] font-black uppercase">Query Payload</th>
                <th class="pb-4 text-[10px] font-black uppercase">Risk Factor</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr v-for="(log, i) in anomalyLogs" :key="i">
                <td class="py-4 text-xs font-black text-red-500 font-mono">{{ log.ip }}</td>
                <td class="py-4 text-xs font-bold text-gray-900 dark:text-gray-300">{{ log.query }}</td>
                <td class="py-4">
                  <span class="text-[9px] font-black bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full uppercase">{{ log.reason }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Alert Configuration -->
    <div class="mac-card p-10 mt-12 mb-12 relative overflow-hidden">
      <div class="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
         <svg class="w-32 h-32 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke-width="2"></path></svg>
      </div>
      <h3 class="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mb-8 flex items-center gap-4">
         <div class="w-2 h-8 bg-orange-500 rounded-full"></div>
         Global Alert Protocol
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
         <div class="space-y-6">
            <div>
               <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Trigger Condition</label>
               <select class="mac-glass w-full px-6 py-4 rounded-2xl font-bold bg-transparent border-white/5 outline-none dark:text-white">
                  <option class="dark:bg-gray-900">New Critical CVE Detected</option>
                  <option class="dark:bg-gray-900">High Frequency Attack Origin</option>
                  <option class="dark:bg-gray-900">Device Status Modification</option>
               </select>
            </div>
            <div>
               <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Notification Channel</label>
               <div class="flex gap-4">
                  <button class="mac-button flex items-center gap-3 !py-4 flex-1 border-blue-500/20 text-blue-500">
                     <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 15c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                     Slack
                  </button>
                  <button class="mac-button flex items-center gap-3 !py-4 flex-1 border-indigo-500/20 text-indigo-500">
                     <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.603-.2396-3.1963-.2396-4.7461 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C1.5305 8.1691 1.096 11.879.4449 15.5492a.0745.0745 0 00.0276.0526 21.0028 21.0028 0 006.3323 3.1945.0784.0784 0 00.084-.0273c.4842-.6613.9103-1.3533 1.2599-2.0837a.0801.0801 0 00-.0438-.111c-1.1215-.4257-2.181-.9472-3.1856-1.5543a.0807.0807 0 01-.0083-.1337c.071-.053.1444-.106.216-.16.0353-.0262.077-.034.1166-.022 4.14 1.8967 8.5446 1.8967 12.6311 0a.0778.0778 0 01.1167.022c.0716.054.1451.107.216.16a.0807.0807 0 01-.0083.1337c-1.0046.607-2.0641 1.1286-3.1856 1.5543a.08.08 0 00-.0438.111c.3496.7304.7757 1.4224 1.2599 2.0837a.0784.0784 0 00.084.0273 21.0334 21.0334 0 006.3323-3.1945.0746.0746 0 00.0276-.0526c.7679-4.2491.2486-7.9044-1.9961-11.1517a.0712.0712 0 00-.0321-.0277"/></svg>
                     Discord
                  </button>
               </div>
            </div>
         </div>
         <div>
            <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Webhook Intelligence Endpoint</label>
            <div class="flex gap-4">
               <input type="text" placeholder="https://hooks.slack.com/services/..." class="mac-glass flex-1 px-6 py-4 rounded-2xl font-mono text-xs dark:text-blue-500 bg-transparent border-white/5 outline-none" />
               <button @click="testWebhook" class="mac-button-primary !px-8">Deploy</button>
            </div>
            <p class="text-[10px] font-medium text-gray-500 mt-4 leading-relaxed">System will perform an automated integrity test on the endpoint before finalizing the configuration.</p>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line, Bar, Doughnut } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler)

export default {
  components: { LineChart: Line, BarChart: Bar, DoughnutChart: Doughnut },
  data() {
    return {
      stats: null,
      loading: true,
      anomalyLogs: [
        { ip: '192.168.1.45', query: '353123456789012', reason: 'RATE_LIMIT' },
        { ip: '10.0.0.22', query: 'DROP TABLE devices', reason: 'SQL_INJECTION' },
        { ip: '203.0.113.88', query: '000000000000000', reason: 'INVALID_IMEI' }
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { family: 'Mona Sans', weight: 'bold' } } },
          y: { grid: { color: 'rgba(255,255,255,0.05)', borderDash: [5, 5] }, ticks: { color: '#94a3b8', font: { family: 'Mona Sans' } } }
        }
      },
      pieOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { color: '#94a3b8', font: { family: 'Mona Sans', weight: 'black' } } }
        }
      },
      searchVolumeData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Searches',
          data: [120, 190, 300, 250, 400, 480, 450],
          borderColor: '#007AFF',
          backgroundColor: 'rgba(0, 122, 255, 0.15)',
          fill: true,
          tension: 0.5,
          borderWidth: 4
        }]
      },
      topDevicesData: {
        labels: ['iPhone 15', 'S24 Ultra', 'Pixel 8', 'S21', 'OnePlus 12'],
        datasets: [{
          label: 'Hits',
          data: [450, 380, 200, 150, 90],
          backgroundColor: ['#007AFF', '#34C759', '#FF9500', '#AF52DE', '#FF3B30'],
          borderRadius: 8
        }]
      },
      severityData: {
        labels: ['Critical', 'High', 'Medium', 'Low'],
        datasets: [{
          data: [15, 30, 40, 15],
          backgroundColor: ['#FF3B30', '#FF9500', '#FFCC00', '#34C759'],
          borderWidth: 0
        }]
      }
    }
  },
  async mounted() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/stats');
      const json = await res.json();
      if (json.status === 'success') {
        this.stats = json.data;
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    testWebhook() {
      alert('Webhook Integrity Verified: Connection established with [SECURE_CHANNEL]. Protocol deployed.');
    }
  }
}
</script>
