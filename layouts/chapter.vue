<script setup lang="ts">
defineProps<{
  number?: string | number
  emoji?: string
  subtitle?: string
}>()
</script>

<template>
  <div class="slidev-layout chapter">
    <div class="emoji">{{ emoji }}</div>
    <div class="num">Chapter {{ number }}</div>
    <div class="ttl"><slot /></div>
    <div v-if="subtitle" class="sub">{{ subtitle }}</div>
  </div>
</template>

<style scoped>
.chapter {
  display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
  background: radial-gradient(circle at 20% 20%, #ffd166 0, transparent 45%),
    radial-gradient(circle at 85% 80%, #ff8c69 0, transparent 50%), #e63946;
  color: #fff;
}
.emoji { font-size: 6rem; animation: bob 2.4s ease-in-out infinite; filter: drop-shadow(0 8px 10px rgb(0 0 0 / 25%)); }
.num { text-transform: uppercase; letter-spacing: .3em; font-weight: 800; opacity: .85; margin-top: .6rem; }
.ttl :deep(h1) { color: #fff; font-size: 3.2rem; margin: .3rem 0 0; font-weight: 900; }
.sub { font-size: 1.3rem; opacity: .95; margin-top: .6rem; }
@keyframes bob { 0%, 100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-14px) rotate(4deg); } }
</style>
