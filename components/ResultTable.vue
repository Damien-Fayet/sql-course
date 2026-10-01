<script setup lang="ts">
withDefaults(defineProps<{
  columns: string[]
  rows: unknown[][]
  /** column index to highlight (-1 = none) */
  hlCol?: number
  /** row index to highlight (-1 = none) */
  hlRow?: number
  /** fade rows in one after the other */
  animate?: boolean
  /** dim the row/col that are NOT highlighted */
  title?: string
}>(), { hlCol: -1, hlRow: -1, animate: false })

function isNum(v: unknown) {
  return typeof v === 'number'
}
</script>

<template>
  <div class="rt">
    <div v-if="title" class="rt-title">{{ title }}</div>
    <table>
      <thead>
        <tr>
          <th v-for="(c, ci) in columns" :key="ci" :class="{ hl: ci === hlCol }">
            {{ c }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, ri) in rows"
          :key="ri"
          :class="{ hlrow: ri === hlRow, anim: animate }"
          :style="animate ? { animationDelay: `${Math.min(ri, 12) * 40}ms` } : undefined"
        >
          <td
            v-for="(v, ci) in row"
            :key="ci"
            :class="{
              hl: ci === hlCol,
              cell: ci === hlCol && ri === hlRow,
              num: isNum(v),
              nul: v === null,
            }"
          >
            <template v-if="v === null">NULL</template>
            <template v-else>{{ v }}</template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.rt { display: inline-block; max-width: 100%; }
.rt-title {
  font-weight: 800; font-size: .8em; letter-spacing: .04em; text-transform: uppercase;
  color: var(--pp-brown); margin-bottom: .25rem; text-align: left;
}
table {
  border-collapse: separate; border-spacing: 0; font-size: .74em; line-height: 1.15;
  background: #fff; border-radius: 10px; overflow: hidden;
  box-shadow: 0 2px 10px rgb(80 40 0 / 12%); margin: 0;
}
th {
  background: var(--pp-brown); color: #fff; text-align: left; font-weight: 700;
  padding: .26rem .7rem; white-space: nowrap; transition: background .3s;
}
td {
  padding: .17rem .7rem; border-top: 1px solid #f1e6d3; white-space: nowrap;
  text-align: left; transition: background .3s, opacity .3s; color: #3b2a1a;
}
td.num { font-family: var(--slidev-code-font-family); color: #b5541c; }
td.nul { color: #aaa; font-style: italic; }
th.hl { background: var(--pp-red); }
td.hl { background: #ffe9c2; }
td.cell { background: var(--pp-cheese); font-weight: 800; outline: 2px solid var(--pp-red); outline-offset: -2px; }
tr.hlrow td { background: #ffe9c2; }
tr.hlrow td.cell { background: var(--pp-cheese); }
tr.anim { animation: rowIn .35s ease-out both; }
@keyframes rowIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
</style>
