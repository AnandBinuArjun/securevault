<template>
  <div :class="[isDarkMode ? 'dark' : '', 'min-h-screen flex flex-col transition-colors duration-500 relative bg-[#F5F5F7] dark:bg-[#0A0A0B] text-[#1D1D1F] dark:text-[#F5F5F7] overflow-x-hidden']">
    
    <!-- Liquid Background Blobs -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
      <div class="bg-liquid-blob w-[500px] h-[500px] bg-blue-500/20 top-[-10%] left-[-10%] animate-[blob_18s_infinite]"></div>
      <div class="bg-liquid-blob w-[600px] h-[600px] bg-purple-500/20 bottom-[-10%] right-[-10%] animate-[blob_25s_infinite_reverse]"></div>
      <div class="bg-liquid-blob w-[400px] h-[400px] bg-indigo-500/15 top-[30%] right-[10%] animate-[blob_20s_infinite_linear]"></div>
    </div>

    <GlobalNavbar :isDarkMode="isDarkMode" @toggle-theme="toggleTheme" />
    <main class="flex-grow pt-20 relative z-10">
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="border-t border-gray-200 dark:border-white/5 py-8 text-center text-xs text-gray-400 dark:text-gray-500 mt-20 mac-glass !rounded-none z-10">
      <p class="font-bold tracking-widest uppercase mb-2">SecureVault &bull; Enterprise 2026</p>
      <p>&copy; ANAND BINU ARJUN. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import GlobalNavbar from './components/GlobalNavbar.vue'

export default {
  components: { GlobalNavbar },
  data() {
    return {
      isDarkMode: true
    }
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
    }
  },
  watch: {
    isDarkMode: {
      handler(val) {
        if (val) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      immediate: true
    }
  }
}
</script>

<style>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
