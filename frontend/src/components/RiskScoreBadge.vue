<template>
  <div class="mac-card p-8 flex flex-col items-center justify-center relative overflow-hidden h-full">
    <h3 class="text-sm font-bold mb-6 text-gray-400 uppercase tracking-widest z-10 w-full text-center">Security Rating</h3>
    
    <div class="relative w-40 h-40 flex items-center justify-center z-10">
      <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" class="stroke-gray-100 dark:stroke-white/10" stroke-width="6"></circle>
        <circle cx="50" cy="50" r="45" fill="none" :class="colorClass.stroke" stroke-width="6" stroke-linecap="round"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="circumference - (animatedScore / 100) * circumference"
                class="transition-all duration-1000 ease-out"></circle>
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <span class="text-5xl font-black tracking-tighter" :class="colorClass.text">{{ animatedScore }}</span>
      </div>
    </div>
    
    <div class="mt-6 font-bold text-xs uppercase tracking-wider" :class="colorClass.text">
      {{ statusText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    score: { type: Number, required: true }
  },
  data() {
    return {
      animatedScore: 0,
      circumference: 2 * Math.PI * 45
    }
  },
  computed: {
    colorClass() {
      if (this.animatedScore >= 86) return { stroke: 'stroke-[#34C759]', text: 'text-[#34C759]' };
      if (this.animatedScore >= 61) return { stroke: 'stroke-[#FFCC00]', text: 'text-[#FFCC00]' };
      if (this.animatedScore >= 31) return { stroke: 'stroke-[#FF9500]', text: 'text-[#FF9500]' };
      return { stroke: 'stroke-[#FF3B30]', text: 'text-[#FF3B30]' };
    },
    statusText() {
      if (this.animatedScore >= 86) return 'Secure Target';
      if (this.animatedScore >= 61) return 'Moderate Threat';
      if (this.animatedScore >= 31) return 'High Exposure';
      return 'Critical Failure';
    }
  },
  mounted() {
    this.animateValue();
  },
  methods: {
    animateValue() {
      const duration = 1200;
      const start = performance.now();
      const step = (timestamp) => {
        const progress = Math.min((timestamp - start) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        this.animatedScore = Math.floor(easeProgress * this.score);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          this.animatedScore = this.score;
        }
      };
      window.requestAnimationFrame(step);
    }
  }
}
</script>
