<template>
  <div class="mac-card p-8 flex items-center gap-8 border-l-4"
       :class="isStolen ? '!border-l-[#FF3B30]' : '!border-l-[#34C759]'">
    
    <div class="shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl shadow-inner border border-gray-100 dark:border-white/10"
          :class="isStolen ? 'bg-[#FF3B30]/10 text-[#FF3B30]' : 'bg-[#34C759]/10 text-[#34C759]'">
      <svg v-if="!isStolen" class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
      <svg v-else class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
    </div>

    <div class="flex-1">
      <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">
        {{ isStolen ? 'Global Registry Blacklist detected' : 'GSMA Compliance Verified' }}
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
        Integrity check against international stolen device registries and carrier network blocks for <span class="font-bold text-gray-800 dark:text-gray-200">{{ query }}</span>.
      </p>
      
      <div v-if="isStolen" class="p-3 bg-red-500/5 rounded-lg border border-red-500/10 text-[11px] uppercase font-black tracking-widest text-[#FF3B30]">
        Critical: Target unusable on cellular networks
      </div>
      <div v-else class="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        <svg class="w-4 h-4 text-[#34C759]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
        Whitelisting confirmed by GSMA Database
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: { type: String, required: true },
    query: { type: String }
  },
  computed: {
    isStolen() { return this.status === 'STOLEN'; }
  }
}
</script>
</script>
