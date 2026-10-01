<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from 'vue'
import { createDb, execSql, friendlyTip, listTables, sameRows } from '../lib/db'
import type { ExecResult, TableInfo } from '../lib/db'
import ResultTable from './ResultTable.vue'

const props = defineProps<{
  /** starting query */
  query?: string
  /** after INSERT/UPDATE/DELETE, show the result of this SELECT */
  thenShow?: string
  /** challenge mode: a SELECT whose result the student must match */
  solution?: string
  /** challenge mode for INSERT/UPDATE...: a SELECT whose first cell must be > 0 when the goal is reached */
  verify?: string
  hint?: string
  title?: string
  /** do not run the query when the slide opens */
  manual?: boolean
  /** open the "Tables" panel at start */
  schema?: boolean
  /** max height (px) of the result area */
  maxHeight?: number
}>()

const sql = ref((props.query ?? '').replace(/^\n+|\s+$/g, ''))
const db = shallowRef<any>(null)
const loading = ref(true)
const result = ref<ExecResult | null>(null)
const resultLabel = ref('')
const error = ref('')
const verdict = ref<{ ok: boolean, msg: string } | null>(null)
const showHint = ref(false)
const showSchema = ref(!!props.schema)
const tables = ref<TableInfo[]>([])
const runCount = ref(0)

const isChallenge = computed(() => !!props.solution || !!props.verify)
const autorun = computed(() => !props.manual && !isChallenge.value)

const highlighted = computed(() => highlight(sql.value) + '\n ')

const KEYWORDS = new Set(`SELECT FROM WHERE AND OR NOT IN BETWEEN LIKE IS NULL ORDER BY GROUP HAVING LIMIT OFFSET AS DISTINCT ASC DESC
JOIN INNER LEFT RIGHT OUTER CROSS ON INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE DROP ALTER ADD COLUMN PRIMARY KEY
FOREIGN REFERENCES DEFAULT UNIQUE CASE WHEN THEN ELSE END INTEGER TEXT REAL`.split(/\s+/))
const FUNCTIONS = new Set('COUNT SUM AVG MIN MAX ROUND UPPER LOWER LENGTH'.split(' '))

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function highlight(src: string) {
  return esc(src).replace(
    /(--[^\n]*)|('(?:[^']|'')*'?)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]+\b)/g,
    (m, comment, str, num, word) => {
      if (comment) return `<span class="t-com">${m}</span>`
      if (str) return `<span class="t-str">${m}</span>`
      if (num) return `<span class="t-num">${m}</span>`
      const up = word.toUpperCase()
      if (KEYWORDS.has(up)) return `<span class="t-kw">${m}</span>`
      if (FUNCTIONS.has(up)) return `<span class="t-fn">${m}</span>`
      return m
    },
  )
}

function refreshSchema() {
  if (db.value) tables.value = listTables(db.value)
}

async function init() {
  loading.value = true
  try {
    db.value?.close()
    db.value = await createDb()
    refreshSchema()
  }
  catch (e: any) {
    error.value = `Could not start the database: ${e?.message ?? e}`
  }
  loading.value = false
}

function run() {
  if (!db.value) return
  error.value = ''
  verdict.value = null
  result.value = null
  resultLabel.value = ''
  runCount.value++
  try {
    const res = execSql(db.value, sql.value)
    result.value = res
    const mutated = ['INSERT', 'UPDATE', 'DELETE'].includes(res.kind)
    if (mutated && props.thenShow) {
      result.value = { ...execSql(db.value, props.thenShow), kind: res.kind, changes: res.changes, ms: res.ms }
      resultLabel.value = `✅ ${res.changes} row${res.changes === 1 ? '' : 's'} changed. Here is the table now:`
    }
    else if (mutated) {
      resultLabel.value = `✅ ${res.changes} row${res.changes === 1 ? '' : 's'} changed.`
    }
    else if (['CREATE', 'DROP', 'ALTER'].includes(res.kind)) {
      resultLabel.value = '✅ Done! The structure of the database changed.'
    }
    refreshSchema()
    check(res)
  }
  catch (e: any) {
    error.value = String(e?.message ?? e)
  }
}

function check(res: ExecResult) {
  if (props.solution) {
    const expected = execSql(db.value, props.solution)
    if (!res.hasRows) {
      verdict.value = { ok: false, msg: 'This challenge needs a SELECT query that returns a table.' }
      return
    }
    const ordered = /order\s+by/i.test(props.solution)
    const ok = sameRows(res.rows, expected.rows, ordered)
    verdict.value = ok
      ? { ok, msg: '🎉 Correct! That is exactly what we wanted. Well done!' }
      : {
          ok,
          msg: `Not quite yet. You got ${res.rows.length} row(s) × ${res.columns.length} column(s); `
            + `we expected ${expected.rows.length} row(s) × ${expected.columns.length} column(s). `
            + `${ordered ? 'The order of the rows matters here. ' : ''}Try again!`,
        }
  }
  else if (props.verify) {
    const v = execSql(db.value, props.verify)
    const ok = Number(v.rows[0]?.[0]) > 0
    verdict.value = ok
      ? { ok, msg: '🎉 Mission accomplished! The database is exactly how we wanted it.' }
      : { ok, msg: 'Not quite yet. Run your query, then look at the result again. You can press ↺ Reset and retry.' }
  }
}

async function reset() {
  error.value = ''
  verdict.value = null
  result.value = null
  resultLabel.value = ''
  await init()
  if (autorun.value) run()
}

function onKey(e: KeyboardEvent) {
  e.stopPropagation() // keep Slidev shortcuts (space, arrows...) out of the editor
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault()
    run()
  }
  else if (e.key === 'Tab') {
    e.preventDefault()
    const el = e.target as HTMLTextAreaElement
    const { selectionStart: s, selectionEnd: en } = el
    sql.value = `${sql.value.slice(0, s)}  ${sql.value.slice(en)}`
    requestAnimationFrame(() => el.setSelectionRange(s + 2, s + 2))
  }
}

onMounted(async () => {
  await init()
  if (autorun.value) run()
})
</script>

<template>
  <div class="pg" :class="{ ok: verdict?.ok }">
    <div class="pg-bar">
      <span class="dots"><i /><i /><i /></span>
      <span class="pg-title">{{ title ?? (isChallenge ? '🎯 Challenge' : 'SQL Playground') }}</span>
      <span class="spacer" />
      <button v-if="hint" @click="showHint = !showHint">💡 Hint</button>
      <button @click="showSchema = !showSchema">🗂 Tables</button>
      <button @click="reset">↺ Reset</button>
      <button class="run" @click="run">▶ Run <small>Ctrl+Enter</small></button>
    </div>

    <div v-if="showSchema" class="pg-schema">
      <div v-for="t in tables" :key="t.name" class="tbl">
        <b>{{ t.name }}</b>
        <span v-for="c in t.columns" :key="c.name" class="col" :class="{ pk: c.pk }">
          {{ c.name }}<small>{{ c.pk ? '🔑' : '' }}</small>
        </span>
      </div>
    </div>

    <div class="pg-editor">
      <pre aria-hidden="true" v-html="highlighted" />
      <textarea
        v-model="sql"
        spellcheck="false"
        autocapitalize="off"
        autocomplete="off"
        aria-label="SQL editor"
        @keydown="onKey"
        @keyup.stop
        @keypress.stop
      />
    </div>

    <div v-if="showHint && hint" class="pg-hint">💡 {{ hint }}</div>

    <div class="pg-out" :style="{ maxHeight: `${maxHeight ?? 200}px` }">
      <div v-if="loading" class="msg dim">⏳ Starting the database…</div>
      <div v-else-if="error" class="msg err">
        <div>❌ {{ error }}</div>
        <div v-if="friendlyTip(error)" class="tip">👉 {{ friendlyTip(error) }}</div>
      </div>
      <template v-else-if="result">
        <div v-if="verdict" class="verdict" :class="verdict.ok ? 'good' : 'bad'">{{ verdict.msg }}</div>
        <div v-if="resultLabel" class="msg good-text">{{ resultLabel }}</div>
        <template v-if="result.hasRows">
          <ResultTable :key="runCount" :columns="result.columns" :rows="result.rows" animate />
          <div class="meta">{{ result.rows.length }} row{{ result.rows.length === 1 ? '' : 's' }}</div>
        </template>
        <div v-else-if="!resultLabel" class="msg dim">Query executed. (No table to show.)</div>
      </template>
      <div v-else class="msg dim">Press <b>▶ Run</b> to see the result ✨</div>
    </div>
  </div>
</template>

<style scoped>
.pg {
  container-type: inline-size;
  --bg: #1e1e2e; --fg: #cdd6f4;
  text-align: left; font-size: 14px; border-radius: 14px; overflow: hidden;
  background: #fffaf0; box-shadow: 0 6px 24px rgb(80 40 0 / 22%);
  border: 2px solid var(--pp-brown); transition: border-color .3s, box-shadow .3s;
}
.pg.ok { border-color: #2a9d5c; box-shadow: 0 0 0 4px rgb(42 157 92 / 25%), 0 6px 24px rgb(42 157 92 / 30%); }
.pg-bar {
  display: flex; align-items: center; gap: .4rem; padding: .35rem .6rem;
  background: var(--pp-brown); color: #fff;
}
.dots { display: flex; gap: 5px; margin-right: .4rem; }
.dots i { width: 10px; height: 10px; border-radius: 50%; background: #ff5f57; }
.dots i:nth-child(2) { background: #febc2e; }
.dots i:nth-child(3) { background: #28c840; }
.pg-title { font-weight: 800; font-size: .85em; letter-spacing: .03em; }
.spacer { flex: 1; }
button {
  font: inherit; font-size: .8em; font-weight: 700; cursor: pointer; color: #fff;
  background: rgb(255 255 255 / 15%); border: 0; border-radius: 8px; padding: .22rem .6rem;
  transition: background .15s, transform .1s;
}
button:hover { background: rgb(255 255 255 / 30%); }
button:active { transform: scale(.95); }
button.run { background: var(--pp-green); }
button.run:hover { background: #3ab5a5; }
button small { opacity: .7; font-weight: 500; margin-left: .25rem; }

.pg-out :deep(.rt) { margin-top: 0; }
@container (max-width: 520px) {
  button small, .dots, .pg-title { display: none; }
  button { padding: .22rem .45rem; }
  .pg-editor { font-size: 13px; }
}
.pg-schema { display: flex; flex-wrap: wrap; gap: .4rem 1.2rem; padding: .45rem .8rem; background: #fff1d6; font-size: .8em; }
.tbl { display: flex; flex-wrap: wrap; gap: .25rem; align-items: baseline; }
.tbl b { color: var(--pp-red); margin-right: .15rem; font-family: var(--slidev-code-font-family); }
.col { background: #fff; border-radius: 6px; padding: 0 .35rem; font-family: var(--slidev-code-font-family); font-size: .92em; }
.col.pk { background: var(--pp-cheese); font-weight: 700; }

.pg-editor {
  display: grid; background: var(--bg); color: var(--fg);
  font-family: var(--slidev-code-font-family); font-size: 15px; line-height: 1.55;
}
.pg-editor pre, .pg-editor textarea {
  grid-area: 1 / 1; margin: 0; padding: .55rem 1rem; border: 0; outline: 0;
  font: inherit; letter-spacing: normal; white-space: pre-wrap; overflow-wrap: anywhere;
  font-variant-ligatures: none; tab-size: 2; min-height: 3.2em; box-sizing: border-box; width: 100%;
}
.pg-editor pre { pointer-events: none; background: transparent; color: var(--fg); }
.pg-editor textarea {
  background: transparent; color: transparent; -webkit-text-fill-color: transparent;
  caret-color: #fff; resize: none; overflow: hidden;
}
.pg-editor textarea::selection { background: rgb(255 255 255 / 25%); -webkit-text-fill-color: transparent; }
.pg-editor :deep(.t-kw) { color: #ffb703; font-weight: 700; }
.pg-editor :deep(.t-fn) { color: #8bd5ca; }
.pg-editor :deep(.t-str) { color: #a6e3a1; }
.pg-editor :deep(.t-num) { color: #fab387; }
.pg-editor :deep(.t-com) { color: #7f849c; font-style: italic; }

.pg-hint { padding: .4rem .9rem; background: #fff3bf; color: #5c4a00; font-size: .85em; }
.pg-out { padding: .45rem .8rem; overflow: auto; min-height: 3.2rem; }
.msg { font-size: .9em; }
.msg.dim { color: #9a8670; }
.msg.err { color: #b3261e; font-weight: 600; }
.msg.err .tip { color: #6b4e00; font-weight: 500; margin-top: .25rem; }
.good-text { color: #1c7a43; font-weight: 700; margin-bottom: .4rem; }
.meta { margin-top: .3rem; font-size: .75em; color: #9a8670; }
.verdict { font-weight: 800; padding: .4rem .7rem; border-radius: 8px; margin-bottom: .5rem; font-size: .9em; }
.verdict.good { background: #d8f5e3; color: #146c37; animation: pop .5s ease-out; }
.verdict.bad { background: #fde4e1; color: #9a2a1f; animation: shake .4s; }
@keyframes pop { 0% { transform: scale(.8); } 60% { transform: scale(1.06); } 100% { transform: scale(1); } }
@keyframes shake { 20%, 60% { transform: translateX(-5px); } 40%, 80% { transform: translateX(5px); } }
</style>
