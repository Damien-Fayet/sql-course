---
layout: chapter
number: 6
emoji: 🔗
subtitle: Connect your tables
---

# JOIN

---
clicks: 1
---

# Why many tables? 🤔

<div class="mt-1 text-lg">Imagine <b>one giant table</b> for everything:</div>

<div class="mt-2">
<ResultTable
  :columns="['order', 'customer', 'country', 'phone', 'pizza', 'price']"
  :rows="[[1, 'Aiko', 'Japan', '+81-90-1111', 'Margherita', 8], [2, 'Aiko', 'Japan', '+81-90-1111', 'Quattro Formaggi', 11], [9, 'Aiko', 'Japan', '+81-90-1111', 'Margherita', 8], [3, 'Mateo', 'Argentina', null, 'Pepperoni', 10.5]]"
  :hl-col="$clicks >= 1 ? 2 : -1"
  style="font-size: 1.1rem"
/>
</div>

<div class="mt-5 text-lg leading-loose">
  <div>😵 Aiko's data is <b>repeated</b> again and again</div>
  <div v-click="1">😱 Aiko moves to Spain? We must fix <b>every row</b>... and one typo breaks everything</div>
</div>

<Callout type="chef">

Solution: <b>one table per topic</b>, then <b>connect</b> them with a JOIN.

</Callout>

---
clicks: 4
---

# Keys connect the tables 🔑

<div class="grid-auto mt-2" style="grid-template-columns: 1.3fr 1fr; gap: 2rem; align-items: start">

<ResultTable
  title="orders"
  :columns="['id', 'customer_id', 'pizza_id', 'quantity']"
  :rows="[[1, 1, 1, 2], [3, 2, 2, 1], [5, 3, 6, 1]]"
  :hl-row="$clicks === 1 || $clicks === 2 ? 0 : $clicks >= 3 ? 2 : -1"
  :hl-col="$clicks >= 1 ? 1 : -1"
  style="font-size: 1.1rem"
/>

<ResultTable
  title="customers"
  :columns="['id', 'name', 'country']"
  :rows="[[1, 'Aiko', 'Japan'], [2, 'Mateo', 'Argentina'], [3, 'Fatima', 'Morocco']]"
  :hl-row="$clicks === 2 ? 0 : $clicks === 4 ? 2 : -1"
  :hl-col="$clicks >= 2 ? 0 : -1"
  style="font-size: 1.1rem"
/>

</div>

<div class="mt-6 text-lg leading-loose">
  <div v-click="1">① Order 1 says: <code>customer_id = 1</code></div>
  <div v-click="2">② Customer <b>id 1</b> is <b>Aiko</b> 🎉</div>
  <div v-click="3">③ Order 5 says: <code>customer_id = 3</code> ...</div>
  <div v-click="4">④ ...that is <b>Fatima</b>!</div>
</div>

<div class="absolute bottom-6 right-10 text-right text-sm opacity-80">
🔑 <b>Primary key</b> (<code>customers.id</code>): identifies a row<br>
🔗 <b>Foreign key</b> (<code>orders.customer_id</code>): points to another table
</div>

---

# `INNER JOIN`: glue two tables 🧩

<SqlPlayground
  query="SELECT customers.name, orders.order_date, orders.quantity
FROM orders
INNER JOIN customers
  ON orders.customer_id = customers.id;"
  :max-height="185"
/>

<div class="mt-2 text-base">
<span v-click>🧩 <code>JOIN customers</code> = add this table &nbsp;&nbsp;</span>
<span v-click>📏 <code>ON ...</code> = the <b>matching rule</b> (foreign key = primary key)</span>
</div>

---

# Table nicknames save time ⌨️

Write less: give each table a short alias (`o`, `c`, `p`).

<SqlPlayground
  query="SELECT c.name, c.country, o.order_date
FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE c.country = 'Japan';"
  :max-height="140"
/>

<Callout type="tip">

<code>JOIN</code> alone means <code>INNER JOIN</code>. Everything you learned (WHERE, ORDER BY, LIMIT…) still works!

</Callout>

---

# Three tables, one story 📖

Who ordered which pizza?

<SqlPlayground
  query="SELECT c.name AS customer,
       p.name AS pizza,
       o.quantity
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN pizzas p ON o.pizza_id = p.id
ORDER BY c.name;"
  :max-height="190"
/>

<!--
Both customers and pizzas have a "name" column: that is why we use aliases (AS customer / AS pizza).
-->

---

# JOIN + GROUP BY = superpower 🦸

How much did each customer spend?

<SqlPlayground
  query="SELECT c.name,
       SUM(o.quantity * p.price) AS total_spent
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN pizzas p ON o.pizza_id = p.id
GROUP BY c.name
ORDER BY total_spent DESC
LIMIT 5;"
  :max-height="185"
/>

---
clicks: 2
---

# `LEFT JOIN`: keep everyone 👈

<div class="grid-auto" style="grid-template-columns: 1fr 1.4fr; align-items: center; gap: 1.5rem">

<div class="text-center">
  <div style="position: relative; height: 170px; width: 280px; margin: 0 auto;">
    <div :style="{ position: 'absolute', left: 0, top: 0, width: '170px', height: '170px', borderRadius: '50%', background: $clicks >= 2 ? '#ffc233' : '#ffe2b0', opacity: 0.9, transition: 'all .4s' }" />
    <div style="position: absolute; right: 0; top: 0; width: 170px; height: 170px; border-radius: 50%; background: #2a9d8f55;" />
    <div style="position: absolute; left: 22px; top: 70px; font-weight: 800;">customers</div>
    <div style="position: absolute; right: 22px; top: 70px; font-weight: 800;">orders</div>
  </div>
  <div class="mt-3"><span v-click="1">🧩 INNER = only the <b>match</b></span></div>
  <div><span v-click="2">👈 LEFT = <b>all</b> the left + match</span></div>
</div>

<div>

Kwame (Ghana) **never ordered**. `INNER JOIN` forgets him. `LEFT JOIN` keeps him, with `NULL`.

<SqlPlayground
  class="mt-2"
  query="SELECT c.name, o.id AS order_id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL;"
  :max-height="110"
/>

</div>

</div>

<Callout type="bug">

Delete the <code>WHERE</code> line to see everybody. Then change <code>LEFT JOIN</code> to <code>JOIN</code>: Kwame disappears!

</Callout>

---

# 🎯 Challenge 9

Which **pizzas** did **Aiko** order? Show the pizza `name` only.

<SqlPlayground
  title="🎯 Challenge 9 — JOIN"
  query="-- write your query here
"
  solution="SELECT p.name FROM orders o JOIN customers c ON o.customer_id = c.id JOIN pizzas p ON o.pizza_id = p.id WHERE c.name = 'Aiko';"
  hint="orders → customers (who?) and orders → pizzas (what?). Then WHERE c.name = 'Aiko'."
  :max-height="200"
/>

---

<Quiz
  question="You want ALL customers, even the ones with zero orders. Which join do you use?"
  :options="['INNER JOIN', 'LEFT JOIN customers → orders', 'CROSS JOIN', 'ORDER JOIN']"
  :answer="1"
  explain="With customers on the left, LEFT JOIN keeps every customer. Missing orders become NULL."
/>
