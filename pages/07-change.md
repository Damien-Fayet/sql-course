---
layout: chapter
number: 7
emoji: ✏️
subtitle: Add, edit and remove data
---

# Change the data

---
clicks: 4
---

# SQL can write, too! ✍️

<div class="mt-4 grid-auto cols-4">
  <div v-click="1" class="card green"><div class="big">➕</div><h3>INSERT</h3>Add a new row<br><span class="text-sm opacity-70">Create</span></div>
  <div class="card blue"><div class="big">🔍</div><h3>SELECT</h3>Read rows<br><span class="text-sm opacity-70">Read</span></div>
  <div v-click="2" class="card"><div class="big">✏️</div><h3>UPDATE</h3>Edit rows<br><span class="text-sm opacity-70">Update</span></div>
  <div v-click="3" class="card red"><div class="big">🗑️</div><h3>DELETE</h3>Remove rows<br><span class="text-sm opacity-70">Delete</span></div>
</div>

<div v-click="4" class="mt-8 text-center text-xl">
Together they make <b class="text-[var(--pp-red)]">CRUD</b>: Create · Read · Update · Delete.<br>
<span class="text-base opacity-80">Almost every app in the world is built on CRUD.</span>
</div>

---

# `INSERT`: add a row ➕

<SqlPlayground
  manual
  query="INSERT INTO customers (id, name, country, age)
VALUES (14, 'Zara', 'Kenya', 27);"
  then-show="SELECT * FROM customers WHERE id >= 12;"
  :max-height="185"
/>

<Callout type="bug" title="Run it twice!">

Second run = <b>error</b>. Why? The id <code>14</code> already exists. The <b>primary key</b> protects your data. 🛡️ (Phone was not given, so it is <code>NULL</code>.)

</Callout>

---

# `UPDATE`: edit rows ✏️

<SqlPlayground
  manual
  query="UPDATE pizzas
SET price = price + 1
WHERE name = 'Margherita';"
  then-show="SELECT name, price FROM pizzas;"
  :max-height="205"
/>

<Callout type="chef">

Run it two times: the price goes up each time! Use <b>↺ Reset</b> to go back.

</Callout>

---

# `DELETE`: remove rows 🗑️

<SqlPlayground
  manual
  query="DELETE FROM customers
WHERE name = 'Kwame';"
  then-show="SELECT * FROM customers;"
  :max-height="220"
/>

---

# ⚠️ The most dangerous mistake in SQL

<SqlPlayground
  manual
  title="💣 Do NOT do this at work. Here it is safe."
  query="DELETE FROM orders;"
  then-show="SELECT COUNT(*) AS orders_left FROM orders;"
  :max-height="110"
/>

<div class="grid-auto cols-2 mt-3">
  <div v-click class="card red">

### 😱 No `WHERE`?
`UPDATE` and `DELETE` change **ALL rows**. In a real database there is no Reset button!

  </div>
  <div v-click class="card green">

### 🛡️ Safe habit
1. Write a `SELECT ... WHERE ...` first
2. Check the rows
3. Change `SELECT` to `DELETE`

  </div>
</div>

---

# `CREATE TABLE`: build your own 🏗️

<SqlPlayground
  manual
  query="CREATE TABLE drinks (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL,
  is_cold INTEGER DEFAULT 1
);
INSERT INTO drinks (name, price) VALUES ('Lemonade', 3.5), ('Espresso', 2.2);
SELECT * FROM drinks;"
  schema
  :max-height="140"
/>

<Callout type="tip">

You can run several queries at once: end each one with <code>;</code>. Click <b>🗂 Tables</b>: the new table is there!

</Callout>

---

# Data types 🔠

Every column has a **type**: the database refuses wrong values.

<table class="plain mt-4" style="width: 100%; font-size: 1.05rem">
  <thead><tr><th>Type</th><th>For…</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td><code>INTEGER</code></td><td>whole numbers</td><td><code>42</code></td></tr>
    <tr v-click><td><code>REAL</code> / <code>DECIMAL</code></td><td>numbers with decimals</td><td><code>10.5</code></td></tr>
    <tr v-click><td><code>TEXT</code> / <code>VARCHAR</code></td><td>words, names</td><td><code>'Margherita'</code></td></tr>
    <tr v-click><td><code>DATE</code></td><td>dates</td><td><code>'2026-09-01'</code></td></tr>
    <tr v-click><td><code>BOOLEAN</code></td><td>true / false</td><td><code>1</code> / <code>0</code> in SQLite</td></tr>
  </tbody>
</table>

<Callout v-click type="info" title="Dates 📅">

Use the international format <b>YYYY-MM-DD</b> (2026-09-01). No confusion between 03/04 and 04/03!

</Callout>

---

# 🎯 Challenge 10

Add a new pizza: id `10`, name `'Spicy Mango'`, category `'spicy'`, price `13.5`, vegetarian (`1`).

<SqlPlayground
  manual
  title="🎯 Challenge 10 — INSERT"
  query="-- write your INSERT here
"
  verify="SELECT COUNT(*) FROM pizzas WHERE name = 'Spicy Mango' AND price = 13.5 AND is_vegetarian = 1;"
  then-show="SELECT * FROM pizzas;"
  hint="INSERT INTO pizzas (id, name, category, price, is_vegetarian) VALUES (...);"
  :max-height="220"
/>

---

# 🎯 Challenge 11

Pizza prices go up! Add **1.50** to the price of all `meat` pizzas.

<SqlPlayground
  manual
  title="🎯 Challenge 11 — UPDATE"
  query="-- write your UPDATE here
"
  verify="SELECT COUNT(*) FROM pizzas WHERE name = 'Pepperoni' AND price = 12 AND (SELECT price FROM pizzas WHERE name = 'BBQ Chicken') = 13.5 AND (SELECT price FROM pizzas WHERE name = 'Margherita') = 8;"
  then-show="SELECT name, category, price FROM pizzas;"
  hint="UPDATE pizzas SET price = price + 1.5 WHERE ... (do not forget the WHERE!)"
  :max-height="220"
/>
