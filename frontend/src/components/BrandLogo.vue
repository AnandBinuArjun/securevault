<template>
  <div class="inline-flex items-center justify-center" :class="sizeClass">
    <!-- Apple -->
    <svg v-if="brand === 'Apple'" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
      <path d="M17.05 20.28c-.98.95-2.05 1.72-3.2 1.72-1.14 0-1.53-.73-2.93-.73s-1.83.7-2.9.7c-1.12 0-2.26-.8-3.3-1.83-2.15-2.13-2.8-6.1-2.8-8.8 0-4.32 2.76-6.62 5.37-6.62 1.34 0 2.5.83 3.3 1.4.8-.57 2.1-1.4 3.55-1.4 2.8 0 4.25 1.83 4.93 2.92-2.3 1.38-1.92 4.47.45 5.56-.55 1.4-1.2 2.72-2.13 4.08-.13.2-.26.4-.44.6zM11.97 4.1c1-.14 2.06-.82 2.72-1.63.66-.8 1-1.88 1-2.96-.92 0-1.93.58-2.6 1.4-.67.8-.93 1.9-.93 2.8.06.1.18.3.26.38z"></path>
    </svg>
    <!-- Samsung (Text-based / Stylized S) -->
    <div v-else-if="brand === 'Samsung'" class="font-black italic tracking-tighter text-[0.6em] whitespace-nowrap leading-none">
      SAMSUNG
    </div>
    <!-- Google -->
    <svg v-else-if="brand === 'Google'" viewBox="0 0 24 24" class="w-full h-full">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"></path>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"></path>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83c.87-2.6 3.3-4.52 6.16-4.52z"></path>
    </svg>
    <!-- OnePlus (Stylized 1+) -->
    <div v-else-if="brand === 'OnePlus'" class="border-2 border-red-500 text-red-500 font-black flex items-center justify-center rounded-sm leading-none" style="width: 100%; height: 100%; font-size: 0.6em;">
      1+
    </div>
    <!-- Xiaomi (Mi logo) -->
    <div v-else-if="brand === 'Xiaomi'" class="bg-orange-500 text-white font-black rounded-lg flex items-center justify-center leading-none" style="width: 100%; height: 100%; font-size: 0.5em;">
      mi
    </div>
    <!-- Others -->
    <div v-else class="w-full h-full bg-gray-200 dark:bg-white/10 rounded-full flex items-center justify-center text-[10px] font-black uppercase text-gray-500">
      {{ brand.charAt(0) }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    brand: { type: String, required: true },
    size: { type: String, default: 'md' }
  },
  computed: {
    sizeClass() {
      switch(this.size) {
        case 'xs': return 'w-4 h-4';
        case 'sm': return 'w-6 h-6';
        case 'lg': return 'w-12 h-12';
        case 'xl': return 'w-24 h-24';
        default: return 'w-8 h-8';
      }
    }
  }
}
</script>
