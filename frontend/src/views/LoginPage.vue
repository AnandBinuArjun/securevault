<template>
  <div class="min-h-[80vh] flex items-center justify-center p-6 animation-fade-in relative">
    <div class="mac-card max-w-sm w-full shadow-2xl overflow-hidden">
      <!-- Decor macOS Header -->
      <div class="h-10 bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 flex items-center px-4 gap-2">
        <div class="traffic-light tl-red"></div>
        <div class="traffic-light tl-yellow"></div>
        <div class="traffic-light tl-green"></div>
        <span class="ml-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Secure Login</span>
      </div>

      <div class="p-8">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-[#007AFF] text-white rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Administrator</h2>
          <p class="text-sm text-gray-500 mt-1">Sign in to manage the vault.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Identity</label>
            <input 
              v-model="email" 
              type="text" 
              class="mac-input" 
              placeholder="admin@securevault.local"
              required
            />
          </div>
          <div>
             <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Credential</label>
             <input 
               v-model="password" 
               type="password" 
               class="mac-input" 
               placeholder="••••••••"
               required
             />
          </div>

          <div v-if="error" class="bg-red-500/10 text-red-500 text-xs font-bold p-3 rounded-lg text-center border border-red-500/20">
            {{ error }}
          </div>

          <button type="submit" class="w-full mac-button-primary !py-3 !text-base shadow-lg shadow-blue-500/20">
            Sign In
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: 'admin@securevault.local',
      password: 'password',
      error: ''
    }
  },
  methods: {
    handleLogin() {
      if (this.email === 'admin@securevault.local' && this.password === 'password') {
         localStorage.setItem('securevault_auth', 'true');
         this.$root.$emit('authStateChanged');
         this.$router.push('/admin');
      } else {
         this.error = 'Access Denied. Check credentials.';
      }
    }
  }
}
</script>
