---
layout: center
class: text-center
clicks: 1
---

# Hello! 👋

<div class="mt-6" style="max-width: 760px; margin-inline: auto;">
  <span
    v-for="(g, i) in ['Hello', 'Bonjour', 'Hola', '你好', 'こんにちは', 'مرحبا', 'नमस्ते', 'Olá', 'Привет', 'Merhaba', 'Hallo', 'Ciao']"
    :key="g"
    class="chip"
    :class="{ show: $clicks >= 1 }"
    :style="{ transitionDelay: `${i * 90}ms` }"
  >{{ g }}</span>
</div>

<div v-click="1" class="mt-8 text-2xl">
Whatever your language: today we learn a <b class="text-[var(--pp-red)]">new one</b> — the language of data.
</div>

<!--
Ask students to say hello in their own language. Click once: the greetings pop in.
Goal of the opening: make the room feel international and relaxed. Keep the English very simple.
-->

---
layout: default
clicks: 7
---

# Our journey today 🗺️

<div class="mt-10 grid-auto cols-4" style="row-gap: 1.6rem">
  <div v-click="1" class="card"><div class="big">🗄️</div><h3>1 · Data</h3>Tables, rows, columns</div>
  <div v-click="2" class="card red"><div class="big">🔍</div><h3>2 · SELECT</h3>Ask your first question</div>
  <div v-click="3" class="card green"><div class="big">🧑‍🍳</div><h3>3 · WHERE</h3>Filter like a chef</div>
  <div v-click="4" class="card blue"><div class="big">🏆</div><h3>4 · ORDER BY</h3>Sort and rank</div>
  <div v-click="5" class="card purple"><div class="big">🧮</div><h3>5 · COUNT, SUM…</h3>Group and calculate</div>
  <div v-click="6" class="card"><div class="big">🔗</div><h3>6 · JOIN</h3>Connect tables</div>
  <div v-click="7" class="card red"><div class="big">✏️</div><h3>7 · Change data</h3>INSERT, UPDATE, DELETE</div>
  <div class="card green"><div class="big">🎁</div><h3>8 · Boss level</h3>Final challenges</div>
</div>

---
layout: two-cols-header
---

# How this course works 🎮

::left::

<div class="pr-6">

<div class="mb-5">

### 🍕 It is a real database
Every example runs **live** in your browser. No installation!

</div>

<div v-click class="mb-5">

### ✏️ Edit everything
Change the query. Press **▶ Run**. See what happens.

</div>

<div v-click>

### 💥 Break things on purpose
Errors are not failures. **Errors are teachers.**

</div>

</div>

::right::

<div class="pl-2">

<div v-click class="mb-3">

### 🎯 Challenges
Green box = you got it. 🎉

</div>

<SqlPlayground
  v-click
  title="Try me!"
  query="SELECT 'Hello, Pizza Planet!' AS message;"
  :max-height="110"
/>

<Callout v-click type="info" title="Shortcuts">

<kbd>Ctrl</kbd> + <kbd>Enter</kbd> runs the query (<kbd>⌘</kbd> + <kbd>Enter</kbd> on Mac).

</Callout>

</div>

<!--
Let students click inside the editor and change the text between quotes. Show that errors are fine.
-->
