<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** tip | warn | chef | bug | info */
  type?: 'tip' | 'warn' | 'chef' | 'bug' | 'info'
  title?: string
}>(), { type: 'tip' })

const meta = {
  tip: { icon: '💡', title: 'Tip' },
  warn: { icon: '⚠️', title: 'Careful!' },
  chef: { icon: '🧑‍🍳', title: 'Chef Tony says' },
  bug: { icon: '🐛', title: 'Try to break it!' },
  info: { icon: '📌', title: 'Remember' },
}
</script>

<template>
  <div class="callout" :class="type">
    <div class="icon">{{ meta[props.type].icon }}</div>
    <div class="body">
      <div class="ttl">{{ title ?? meta[props.type].title }}</div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.callout {
  display: flex; gap: .7rem; align-items: flex-start; text-align: left; font-size: .88em;
  padding: .6rem .9rem; border-radius: 14px; border-left: 6px solid; margin: .5rem 0;
}
.icon { font-size: 1.7em; line-height: 1; }
.ttl { font-weight: 800; margin-bottom: .1rem; }
.body :deep(p) { margin: 0; }
.body { flex: 1; line-height: 1.4; }
.tip { background: #fff3bf; border-color: #f2b705; color: #5c4a00; }
.warn { background: #fde4e1; border-color: #e63946; color: #7a1f17; }
.chef { background: #e2f5f1; border-color: #2a9d8f; color: #12514a; }
.bug { background: #ece5ff; border-color: #7c5cd6; color: #3d2a85; }
.info { background: #e3efff; border-color: #3b82d6; color: #17406e; }
.body :deep(code) { background: rgb(255 255 255 / 70%); padding: 0 .3em; border-radius: 4px; }
</style>
