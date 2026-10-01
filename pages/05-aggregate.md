---
layout: chapter
number: 5
emoji: 🧮
subtitle: Many rows in, one answer out
---

# COUNT, SUM, AVG…

---
clicks: 5
---

# Aggregate functions 🧮

They take **many rows** and give **one answer**.

<div class="mt-6 grid-auto cols-5">
  <div v-click="1" class="card text-center"><div class="big">🔢</div><h3>COUNT</h3><span class="text-sm">how many?</span></div>
  <div v-click="2" class="card red text-center"><div class="big">➕</div><h3>SUM</h3><span class="text-sm">the total</span></div>
  <div v-click="3" class="card green text-center"><div class="big">⚖️</div><h3>AVG</h3><span class="text-sm">the average</span></div>
  <div v-click="4" class="card blue text-center"><div class="big">⬇️</div><h3>MIN</h3><span class="text-sm">the smallest</span></div>
  <div v-click="5" class="card purple text-center"><div class="big">⬆️</div><h3>MAX</h3><span class="text-sm">the biggest</span></div>
</div>

---

# Count and sum 🍕

How many orders? How many pizzas were sold?

<SqlPlayground
  query="SELECT COUNT(*) AS total_orders,
       SUM(quantity) AS pizzas_sold
FROM orders;"
  :max-height="120"
/>

<Callout type="chef">

<code>COUNT(*)</code> counts <b>rows</b>. <code>SUM(quantity)</code> adds up the <b>values</b> of a column.

</Callout>

---

# Average, minimum, maximum 📏

<SqlPlayground
  query="SELECT ROUND(AVG(price), 2) AS average_price,
       MIN(price) AS cheapest,
       MAX(price) AS most_expensive
FROM pizzas;"
  :max-height="110"
/>

<Callout type="chef" title="Round it, filter it!">

<code>ROUND(x, 2)</code> keeps 2 decimals. And <code>WHERE</code> works first: add <code>WHERE is_vegetarian = 1</code> to get the numbers for vegetarian pizzas only!

</Callout>

<!--
Order of work: WHERE keeps the vegetarian rows first, then the aggregate functions calculate on those rows.
-->

---
clicks: 3
---

# `GROUP BY`: one answer per group 🗂️

<div class="mt-2 text-lg">Question: <b>how many customers per country?</b></div>

<div class="grid-auto cols-3 mt-6" style="align-items: start">

<div v-click="1" class="card">
  <h3>🌏 Japan</h3>
  <span class="chip show !opacity-100">Aiko</span><span class="chip show !opacity-100">Yuki</span>
  <div v-click="2" class="mt-2 text-xl">→ <b class="text-[var(--pp-red)]">COUNT = 2</b></div>
</div>

<div v-click="1" class="card green">
  <h3>🌎 Brazil</h3>
  <span class="chip show !opacity-100">Sofia</span><span class="chip show !opacity-100">Lucas</span>
  <div v-click="2" class="mt-2 text-xl">→ <b class="text-[var(--pp-red)]">COUNT = 2</b></div>
</div>

<div v-click="1" class="card blue">
  <h3>🌍 Spain</h3>
  <span class="chip show !opacity-100">Elena</span>
  <div v-click="2" class="mt-2 text-xl">→ <b class="text-[var(--pp-red)]">COUNT = 1</b></div>
</div>

</div>

<div v-click="3" class="mt-6 text-center text-lg">
SQL puts the rows in <b>buckets</b> (one per country), then runs <code>COUNT</code> in each bucket. 🪣
</div>

---

# `GROUP BY` in action 🪣

<SqlPlayground
  query="SELECT country, COUNT(*) AS customers
FROM customers
GROUP BY country;"
  :max-height="250"
/>

<Callout type="warn" title="The golden rule">

Every column in <code>SELECT</code> must be in <code>GROUP BY</code> <b>or</b> inside an aggregate function (<code>COUNT</code>, <code>SUM</code>…).

</Callout>

---

# `HAVING`: filter the groups 🎚️

Which countries have **more than one** customer?

<SqlPlayground
  query="SELECT country, COUNT(*) AS customers
FROM customers
GROUP BY country
HAVING COUNT(*) > 1;"
  :max-height="140"
/>

<div class="grid-auto cols-2 mt-3">
  <div class="card green"><h3><code>WHERE</code></h3>filters <b>rows</b><br><span class="text-sm opacity-70">BEFORE grouping</span></div>
  <div class="card purple"><h3><code>HAVING</code></h3>filters <b>groups</b><br><span class="text-sm opacity-70">AFTER grouping</span></div>
</div>

---

# 🎯 Challenge 7

How many pizzas are there **in each category**? Show `category` and the count as `pizzas`.

<SqlPlayground
  title="🎯 Challenge 7 — GROUP BY"
  query="-- write your query here
"
  solution="SELECT category, COUNT(*) AS pizzas FROM pizzas GROUP BY category;"
  hint="SELECT category, COUNT(*) ... FROM pizzas GROUP BY category"
  :max-height="200"
/>

---

# 🎯 Challenge 8

Which **pizza categories** have an **average price above 10**? Show `category` and the average as `avg_price`.

<SqlPlayground
  title="🎯 Challenge 8 — GROUP BY + HAVING"
  query="-- write your query here
"
  solution="SELECT category, AVG(price) AS avg_price FROM pizzas GROUP BY category HAVING AVG(price) > 10;"
  hint="You can use AVG(price) in the HAVING line too."
  :max-height="200"
/>

---

<Quiz
  question="You want only the countries with at least 2 customers. Which keyword do you need?"
  :options="['WHERE', 'HAVING', 'LIMIT', 'DISTINCT']"
  :answer="1"
  explain="HAVING filters groups after GROUP BY. WHERE filters rows before the grouping."
/>
