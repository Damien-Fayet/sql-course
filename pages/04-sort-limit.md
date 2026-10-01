---
layout: chapter
number: 4
emoji: 🏆
subtitle: Sort the results and keep the top ones
---

# ORDER BY & LIMIT

---

# `ORDER BY`: put things in order 📶

<SqlPlayground
  query="SELECT name, price
FROM pizzas
ORDER BY price;"
  :max-height="230"
/>

<Callout type="chef">

Default = <code>ASC</code> (small → big). Add <code>DESC</code> after <code>price</code> to reverse the order. Try it!

</Callout>

---

# Sort by several columns 🥇🥈

First by category, then (inside each category) by price, most expensive first.

<SqlPlayground
  query="SELECT category, name, price
FROM pizzas
ORDER BY category, price DESC;"
  :max-height="240"
/>

<!--
Text columns are sorted alphabetically (A→Z). Dates written as YYYY-MM-DD also sort correctly: a good reason to use this format!
-->

---

# `LIMIT`: just the top N 🏅

The **3 most expensive** pizzas:

<SqlPlayground
  query="SELECT name, price
FROM pizzas
ORDER BY price DESC
LIMIT 3;"
  :max-height="170"
/>

<Callout type="info" title="Dialects! 🗣️">

<code>LIMIT 3</code> works in SQLite, MySQL and PostgreSQL. SQL Server says <code>SELECT TOP 3</code>. Oracle says <code>FETCH FIRST 3 ROWS ONLY</code>. Same idea!

</Callout>

---
clicks: 5
---

# Your SQL sentence so far 🧱

The keywords always come in **this order**:

<div class="mt-4" style="max-width: 640px; margin-inline: auto">
  <span v-click="1" class="lego select">SELECT <small>what do I want to see?</small></span>
  <span v-click="2" class="lego from">FROM <small>which table?</small></span>
  <span v-click="3" class="lego where">WHERE <small>which rows?</small></span>
  <span v-click="4" class="lego order">ORDER BY <small>in which order?</small></span>
  <span v-click="5" class="lego limit">LIMIT <small>how many?</small></span>
</div>

<Callout v-click="5" type="chef">

Like a pizza 🍕: dough first, then sauce, then cheese. Wrong order = a mess!

</Callout>

---

# 🎯 Challenge 5

Show **name and age** of the **3 youngest** customers.

<SqlPlayground
  title="🎯 Challenge 5 — the youngest"
  query="-- write your query here
"
  solution="SELECT name, age FROM customers ORDER BY age LIMIT 3;"
  hint="Sort by age (smallest first), then keep only 3 rows."
  :max-height="200"
/>

---

# 🎯 Challenge 6

Show **name and price** of the **vegetarian** pizzas, **most expensive first**.

<SqlPlayground
  title="🎯 Challenge 6 — WHERE + ORDER BY"
  query="-- write your query here
"
  solution="SELECT name, price FROM pizzas WHERE is_vegetarian = 1 ORDER BY price DESC;"
  hint="WHERE comes before ORDER BY. Remember the lego order! 🧱"
  :max-height="200"
/>
