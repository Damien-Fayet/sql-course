---
layout: chapter
number: 3
emoji: 🧑‍🍳
subtitle: Keep only the rows you want
---

# WHERE

---

# `WHERE`: only the rows I want 🔎

<SqlPlayground
  query="SELECT name, price
FROM pizzas
WHERE price < 10;"
  :max-height="210"
/>

<Callout type="chef">

Change <code>10</code> to <code>9</code>, <code>12</code>, <code>7</code>… Which pizzas are left?

</Callout>

---
clicks: 2
---

# SQL thinks **row by row** 🧠

<div class="grid-auto mt-2" style="grid-template-columns: auto 1fr; gap: 2rem; align-items: center">

<table class="plain" style="font-size: 1.1rem">
  <thead><tr><th>name</th><th>price</th><th class="!bg-[var(--pp-red)]">price &lt; 10 ?</th></tr></thead>
  <tbody>
    <tr v-for="(p, i) in [['Margherita', 8], ['Pepperoni', 10.5], ['Hawaiian', 10], ['Marinara', 7], ['Truffle Royale', 16]]" :key="i"
        :style="{ opacity: $clicks >= 2 && p[1] >= 10 ? 0.25 : 1, transition: 'opacity .4s' }">
      <td>{{ p[0] }}</td>
      <td>{{ p[1] }}</td>
      <td class="text-center">
        <span v-if="$clicks >= 1">{{ p[1] < 10 ? '✅' : '❌' }}</span>
      </td>
    </tr>
  </tbody>
</table>

<div class="text-lg leading-loose">
  <div>For <b>every row</b>, SQL asks:</div>
  <div class="text-2xl text-center my-2">"Is <code>price &lt; 10</code> true?"</div>
  <div v-click="1">✅ true → <b>keep</b> the row</div>
  <div v-click="2">❌ false → <b>throw it away</b></div>
</div>

</div>

---

# Comparison operators ⚖️

<div class="grid-auto cols-2" style="align-items: start">

<table class="plain" style="font-size: 1.05rem">
  <thead><tr><th>Symbol</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td><code>=</code></td><td>equal to <span class="opacity-60 text-sm">(only ONE =)</span></td></tr>
    <tr><td><code>&lt;&gt;</code> or <code>!=</code></td><td>not equal to</td></tr>
    <tr><td><code>&lt;</code></td><td>less than</td></tr>
    <tr><td><code>&gt;</code></td><td>greater than</td></tr>
    <tr><td><code>&lt;=</code></td><td>less than or equal</td></tr>
    <tr><td><code>&gt;=</code></td><td>greater than or equal</td></tr>
  </tbody>
</table>

<div>

<Callout type="warn" title="Text needs 'single quotes'">

<code>WHERE country = 'Brazil'</code> ✅<br>
<code>WHERE country = Brazil</code> ❌

</Callout>

<Callout type="bug">

Remove the quotes in the next slide and read the error.

</Callout>

</div>

</div>

---

# Filter by text 🔤

<SqlPlayground
  query="SELECT name, country
FROM customers
WHERE country = 'Brazil';"
  :max-height="210"
/>

<Callout type="chef">

Try other countries: <code>'Japan'</code>, <code>'Spain'</code>, <code>'Ghana'</code>… Capital letters inside quotes can matter!

</Callout>

---
clicks: 2
---

# `AND`, `OR`, `NOT` 🚦

<div class="grid-auto cols-3">
  <div class="card green"><h3><code>AND</code> — strict</h3>Both must be true</div>
  <div v-click="1" class="card"><h3><code>OR</code> — flexible</h3>At least one is true</div>
  <div v-click="2" class="card red"><h3><code>NOT</code> — opposite</h3>Flip true ↔ false</div>
</div>

<SqlPlayground
  class="mt-4"
  query="SELECT name, category, price
FROM pizzas
WHERE category = 'meat'
  AND price < 12;"
  :max-height="140"
/>

<Callout type="bug" title="Try it!">

Replace <code>AND</code> by <code>OR</code>. More rows or fewer rows? Why? 🤔

</Callout>

---

# `IN` and `BETWEEN` 🎁

Shortcuts to write shorter queries.

<div class="grid-auto cols-2" style="align-items: start">

<div>

<div class="mb-2"><code>IN</code> = "is one of"</div>

<SqlPlayground
  query="SELECT name, country
FROM customers
WHERE country IN
  ('Japan', 'Spain', 'Ghana');"
  :max-height="170"
/>

</div>

<div>

<div class="mb-2"><code>BETWEEN</code> = from ... to ... (both included)</div>

<SqlPlayground
  query="SELECT name, age
FROM customers
WHERE age BETWEEN 25 AND 30;"
  :max-height="170"
/>

</div>

</div>

<!--
IN = "is one of". BETWEEN includes both ends (25 and 30 are included).
-->

---
layout: two-cols
---

# `LIKE`: search with wildcards 🔦

<v-clicks>

- <code>%</code> = **any** characters (even none)
- <code>_</code> = **exactly one** character

</v-clicks>

<table v-click class="plain mt-4">
  <thead><tr><th>Pattern</th><th>Matches</th></tr></thead>
  <tbody>
    <tr><td><code>'P%'</code></td><td>starts with P</td></tr>
    <tr><td><code>'%a'</code></td><td>ends with a</td></tr>
    <tr><td><code>'%cheese%'</code></td><td>contains "cheese"</td></tr>
    <tr><td><code>'_iam'</code></td><td>any letter + "iam"</td></tr>
  </tbody>
</table>

::right::

<div class="pl-4 pt-2">

<SqlPlayground
  query="SELECT name
FROM pizzas
WHERE name LIKE 'P%';"
  :max-height="230"
/>

<Callout type="chef">

Try <code>'%a'</code>, then <code>'%i%'</code>.

</Callout>

</div>

---

# `NULL`: the mystery value 🕵️

`NULL` means **"unknown"**: no value at all. It is **not** zero. It is **not** an empty text.

<SqlPlayground
  query="SELECT name, phone
FROM customers
WHERE phone IS NULL;"
  :max-height="200"
/>

<Callout type="warn" title="Use IS NULL, never = NULL">

<code>WHERE phone = NULL</code> returns <b>nothing</b>, without any error! (Unknown = unknown is... unknown 🤯)
Test it, then use <code>IS NOT NULL</code>.

</Callout>

---

# 🎯 Challenge 3

Find the **vegetarian pizzas** (`is_vegetarian = 1`) that cost **10 or less**. Show name and price.

<SqlPlayground
  title="🎯 Challenge 3 — cheap vegetarian pizzas"
  query="-- write your query here
"
  solution="SELECT name, price FROM pizzas WHERE is_vegetarian = 1 AND price <= 10;"
  hint="Two conditions joined by AND. 'or less' means <=, not <."
  :max-height="200"
/>

---

# 🎯 Challenge 4

Show **name and country** of the customers from **Japan, Brazil or Egypt** who are **over 25**.

<SqlPlayground
  title="🎯 Challenge 4 — a bit harder"
  query="-- write your query here
"
  solution="SELECT name, country FROM customers WHERE country IN ('Japan', 'Brazil', 'Egypt') AND age > 25;"
  hint="IN (...) for the countries, AND for the age. 'over 25' means > 25."
  :max-height="200"
/>

---

<Quiz
  question="How do you find the customers who have NO phone number?"
  :options="['WHERE phone = NULL', 'WHERE phone = 0', 'WHERE phone IS NULL', 'WHERE phone = \'\'']"
  :answer="2"
  code
  explain="NULL is special: we always test it with IS NULL or IS NOT NULL."
/>
