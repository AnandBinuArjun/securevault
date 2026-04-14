<template>
  <div class="mac-card overflow-hidden">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5 text-[10px] uppercase font-black tracking-widest text-gray-400">
          <th class="p-4 cursor-pointer hover:text-gray-900 transition-colors" @click="sortBy('cve_id')">Vulnerability</th>
          <th class="p-4 cursor-pointer hover:text-gray-900 transition-colors" @click="sortBy('severity')">Threat Level</th>
          <th class="p-4 hidden md:table-cell">Discovered</th>
          <th class="p-4 text-center">Status</th>
          <th class="p-4"></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-50 dark:divide-white/5 text-sm">
        <template v-for="cve in sortedVulnerabilities">
          <tr :key="cve.id" class="group hover:bg-gray-50/80 dark:hover:bg-white/5 transition-all cursor-pointer" @click="toggleRow(cve.id)">
            <td class="p-4 font-bold text-gray-900 dark:text-white">{{ cve.cve_id }}</td>
            <td class="p-4">
              <span class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border transition-all"
                    :class="severityClass(cve.severity)">
                {{ cve.severity }}
              </span>
            </td>
            <td class="p-4 text-gray-400 font-medium hidden md:table-cell">{{ cve.date }}</td>
            <td class="p-4 text-center">
              <span v-if="cve.patch" class="px-2 py-1 bg-[#34C759]/10 text-[#34C759] text-[10px] font-bold rounded-full border border-[#34C759]/20 uppercase">Patched</span>
              <span v-else class="px-2 py-1 bg-[#FF3B30]/10 text-[#FF3B30] text-[10px] font-bold rounded-full border border-[#FF3B30]/20 uppercase">Open</span>
            </td>
            <td class="p-4 text-right">
              <svg class="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-all transform" :class="{ 'rotate-180': expandedRows.includes(cve.id) }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
            </td>
          </tr>
          <tr :key="cve.id + '-details'" v-if="expandedRows.includes(cve.id)" class="bg-gray-50/30 dark:bg-black/20">
            <td colspan="5" class="p-8 border-b border-gray-100 dark:border-white/5">
              <div class="flex flex-col md:flex-row gap-8">
                 <div class="flex-1">
                    <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Technical Summary</div>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{{ cve.description }}</p>
                 </div>
                 <div class="shrink-0 w-48 space-y-4">
                    <button class="w-full mac-button text-[11px] font-bold flex items-center justify-center gap-2">
                       <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                       NVD Database
                    </button>
                    <button class="w-full mac-button text-[11px] font-bold flex items-center justify-center gap-2">
                       <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                       Patch Log
                    </button>
                 </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    vulnerabilities: { type: Array, required: true }
  },
  data() {
    return {
      expandedRows: [],
      sortKey: 'severity',
      sortOrder: 1
    }
  },
  computed: {
    sortedVulnerabilities() {
      return [...this.vulnerabilities].sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        if (this.sortKey === 'severity') {
          const w = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
          return (w[valB] - w[valA]) * this.sortOrder;
        }
        return valA > valB ? 1 * this.sortOrder : -1 * this.sortOrder;
      });
    }
  },
  methods: {
    toggleRow(id) {
      if (this.expandedRows.includes(id)) {
        this.expandedRows = this.expandedRows.filter(r => r !== id);
      } else {
        this.expandedRows.push(id);
      }
    },
    severityClass(severity) {
      const map = {
        'CRITICAL': 'bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/20',
        'HIGH': 'bg-[#FF9500]/10 text-[#FF9500] border-[#FF9500]/20',
        'MEDIUM': 'bg-[#FFCC00]/10 text-[#FFCC00] border-[#FFCC00]/20',
        'LOW': 'bg-[#007AFF]/10 text-[#007AFF] border-[#007AFF]/20'
      };
      return map[severity] || 'bg-gray-100 text-gray-500 border-gray-200';
    },
    sortBy(key) {
      if (this.sortKey === key) this.sortOrder *= -1;
      else { this.sortKey = key; this.sortOrder = 1; }
    }
  }
}
</script>
