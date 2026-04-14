<template>
  <header class="fixed top-0 left-0 right-0 h-14 mac-glass z-[100] flex items-center justify-between px-6 border-b border-gray-200/50 dark:border-white/5">
    <!-- macOS Traffic Lights Decor -->
    <div class="flex items-center gap-10">
      <div class="flex items-center gap-2 pr-4 border-r border-gray-200 dark:border-white/10">
        <div class="traffic-light tl-red"></div>
        <div class="traffic-light tl-yellow"></div>
        <div class="traffic-light tl-green"></div>
      </div>
      
      <router-link to="/" class="flex items-center gap-2 group">
        <div class="w-8 h-8 bg-[#007AFF] text-white rounded-lg flex items-center justify-center shadow-sm group-hover:bg-[#0063CC] transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>
        <span class="text-lg font-bold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">SecureVault</span>
      </router-link>
    </div>

    <!-- Center Navigation -->
    <nav class="hidden md:flex items-center bg-gray-100/50 dark:bg-white/5 rounded-lg p-1 border border-gray-200/50 dark:border-white/5">
      <router-link to="/devices" class="px-4 py-1.5 text-xs font-medium rounded-md hover:bg-white dark:hover:bg-white/10 transition-all" active-class="bg-white dark:bg-white/10 shadow-sm text-[#007AFF] dark:text-[#007AFF]">Devices</router-link>
      <router-link to="/threats" class="px-4 py-1.5 text-xs font-medium rounded-md hover:bg-white dark:hover:bg-white/10 transition-all" active-class="bg-white dark:bg-white/10 shadow-sm text-[#007AFF] dark:text-[#007AFF]">Threats</router-link>
      <router-link to="/compare" class="px-4 py-1.5 text-xs font-medium rounded-md hover:bg-white dark:hover:bg-white/10 transition-all" active-class="bg-white dark:bg-white/10 shadow-sm text-[#007AFF] dark:text-[#007AFF]">Compare</router-link>
      <router-link to="/archive" class="px-4 py-1.5 text-xs font-medium rounded-md hover:bg-white dark:hover:bg-white/10 transition-all" active-class="bg-white dark:bg-white/10 shadow-sm text-[#007AFF] dark:text-[#007AFF]">Archive</router-link>
      <router-link to="/api-tier" class="px-4 py-1.5 text-xs font-medium rounded-md hover:bg-white dark:hover:bg-white/10 transition-all" active-class="bg-white dark:bg-white/10 shadow-sm text-[#007AFF] dark:text-[#007AFF]">API</router-link>
    </nav>

    <!-- Right Controls -->
    <div class="flex items-center gap-4">
      <!-- Theme Switch -->
      <button @click="$emit('toggle-theme')" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-500 dark:text-gray-400">
        <svg v-if="!isDarkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
      </button>

      <template v-if="isAuthenticated">
        <router-link to="/admin" class="mac-button text-xs">Dashboard</router-link>
        <button @click="logout" class="mac-button-primary text-xs !bg-[#FF3B30] hover:!bg-[#E03127]">Logout</button>
      </template>
      <router-link v-else to="/login" class="mac-button-primary text-xs">Login</router-link>
    </div>
  </header>
</template>

<script>
export default {
  props: ['isDarkMode'],
  data() {
    return {
      isAuthenticated: false
    }
  },
  mounted() {
    this.checkAuth();
    this.$root.$on('authStateChanged', this.checkAuth);
  },
  destroyed() {
    this.$root.$off('authStateChanged', this.checkAuth);
  },
  methods: {
    checkAuth() {
      this.isAuthenticated = localStorage.getItem('securevault_auth') === 'true';
    },
    logout() {
      localStorage.removeItem('securevault_auth');
      this.checkAuth();
      if(this.$route.path === '/admin') {
        this.$router.push('/');
      }
    }
  }
}
</script>
