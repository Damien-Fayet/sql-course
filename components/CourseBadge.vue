<script setup lang="ts">
import logoUrl from '../assets/esc-clermont-logo.svg'
</script>

<template>
  <div class="badge-top">
    <img :src="logoUrl" alt="ESC Clermont — École Supérieure de Commerce de Clermont-Ferrand" class="logo">
  </div>
  <div class="badge-bottom">
    <div class="course">📚 Advanced Data Discovery</div>
    <div class="who">Damien FAYET · ESC Clermont</div>
  </div>
</template>

<style scoped>
.badge-top { position: absolute; top: 1.1rem; left: 2rem; }
.logo { height: 3.6rem; width: auto; display: block; }
.badge-bottom {
  position: absolute; left: 0; right: 0; bottom: 1.1rem; text-align: center; line-height: 1.5;
}
.course {
  display: inline-block; font-weight: 800; font-size: 1.05rem; color: var(--pp-brown);
  background: #fff; border: 2px solid var(--pp-cheese); border-radius: 999px; padding: 0.1rem 1rem;
  box-shadow: 0 3px 8px rgb(80 40 0 / 10%);
}
.who { font-size: 0.9rem; opacity: 0.8; margin-top: 0.25rem; }
</style>
