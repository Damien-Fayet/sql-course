<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  question: string
  options: string[]
  /** index of the correct option (0 = first) */
  answer: number
  explain?: string
  /** show options as code */
  code?: boolean
}>()

const picked = ref<number[]>([])
const solved = computed(() => picked.value.includes(props.answer))

function pick(i: number) {
  if (solved.value || picked.value.includes(i)) return
  picked.value.push(i)
}
</script>

<template>
  <div class="quiz">
    <div class="q-head">🧠 <b>Quick quiz</b></div>
    <div class="q-text">{{ question }}</div>
    <div class="q-opts">
      <button
        v-for="(o, i) in options"
        :key="i"
        class="opt"
        :class="{
          wrong: picked.includes(i) && i !== answer,
          right: solved && i === answer,
          code,
        }"
        @click="pick(i)"
      >
        <span class="letter">{{ 'ABCD'[i] }}</span>
        <span class="label">{{ o }}</span>
        <span class="mark">{{ solved && i === answer ? '✅' : picked.includes(i) ? '❌' : '' }}</span>
      </button>
    </div>
    <Transition name="fade" mode="out-in">
      <div v-if="solved" key="ok" class="q-explain">🎉 <b>Yes!</b> {{ explain }}</div>
      <div v-else-if="picked.length" key="bad" class="q-explain bad">Not this one. Try another answer! 💪</div>
    </Transition>
  </div>
</template>

<style scoped>
.quiz { text-align: left; }
.q-head { font-size: .9em; color: var(--pp-red); margin-bottom: .3rem; }
.q-text { font-size: 1.25em; font-weight: 800; margin-bottom: .9rem; color: var(--pp-brown); }
.q-opts { display: grid; gap: .5rem; }
.opt {
  display: flex; align-items: center; gap: .8rem; text-align: left; cursor: pointer;
  font: inherit; font-size: 1em; padding: .55rem .9rem; border-radius: 12px; color: var(--pp-brown);
  background: #fff; border: 2px solid #ecd9b8; transition: transform .12s, border-color .2s, background .2s;
}
.opt:hover { transform: translateX(4px); border-color: var(--pp-cheese); }
.opt.code .label { font-family: var(--slidev-code-font-family); font-size: .9em; }
.letter {
  display: inline-grid; place-items: center; width: 1.7em; height: 1.7em; border-radius: 50%;
  background: var(--pp-cheese); font-weight: 800; flex: none;
}
.label { flex: 1; }
.opt.wrong { background: #fde4e1; border-color: #e5877d; animation: shake .4s; opacity: .8; }
.opt.right { background: #d8f5e3; border-color: #2a9d5c; animation: pop .5s; }
.q-explain { margin-top: .8rem; padding: .6rem .9rem; border-radius: 12px; background: #d8f5e3; color: #146c37; }
.q-explain.bad { background: #fff3bf; color: #5c4a00; }
.fade-enter-active, .fade-leave-active { transition: all .25s; }
.fade-leave-to { opacity: 0; }
.fade-enter-from { opacity: 0; transform: translateY(8px); }
@keyframes pop { 0% { transform: scale(.95); } 60% { transform: scale(1.04); } 100% { transform: scale(1); } }
@keyframes shake { 20%, 60% { transform: translateX(-5px); } 40%, 80% { transform: translateX(5px); } }
</style>
