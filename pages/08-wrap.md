---
layout: chapter
number: 8
emoji: 🎁
subtitle: Cheat sheet, bug hunt and boss level
---

# Wrap-up

---
layout: two-cols-header
---

# Cheat sheet 1/2 — Reading data 🔍

::left::

```sql
SELECT DISTINCT col1, col2 AS nickname
FROM table
WHERE col > 10
  AND col2 IN ('a', 'b')
  AND col3 LIKE 'P%'
  AND col4 IS NULL
ORDER BY col1 DESC
LIMIT 5;
```

::right::

<div class="pl-6">

```sql
SELECT col, COUNT(*), AVG(col2)
FROM table
GROUP BY col
HAVING COUNT(*) > 1;
```

```sql
SELECT a.x, b.y
FROM a
JOIN b ON a.b_id = b.id;
```

</div>

---
layout: two-cols-header
---

# Cheat sheet 2/2 — Changing data ✏️

::left::

```sql
INSERT INTO table (col1, col2)
VALUES ('x', 42);

UPDATE table
SET col1 = 'y'
WHERE id = 1;

DELETE FROM table
WHERE id = 1;
```

::right::

<div class="pl-6">

```sql
CREATE TABLE drinks (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL
);

DROP TABLE drinks;
```

<Callout type="warn">

UPDATE and DELETE without <code>WHERE</code> = <b>all rows</b>!

</Callout>

</div>

---

# 🐛 Bug hunt!

This query has **3 bugs**. Fix them all! Read the error messages. 🔦

<SqlPlayground
  title="🐛 Fix the query"
  query="SELEC name, price
FORM pizzas
WHERE category = meat;"
  solution="SELECT name, price FROM pizzas WHERE category = 'meat';"
  hint="1) a keyword is misspelled  2) another keyword is misspelled  3) text needs 'quotes'"
  :max-height="200"
/>

---

# 🏆 Boss level 1

Who are the **top 3 customers** by number of pizzas ordered?
Show `name` and `pizzas` (the total quantity).

<SqlPlayground
  title="🏆 Boss 1"
  query="-- JOIN + SUM + GROUP BY + ORDER BY + LIMIT
"
  solution="SELECT c.name, SUM(o.quantity) AS pizzas FROM customers c JOIN orders o ON o.customer_id = c.id GROUP BY c.name ORDER BY pizzas DESC LIMIT 3;"
  hint="Join customers and orders. Group by the customer name. Sort by the total, biggest first."
  :max-height="200"
/>

---

# 🏆 Boss level 2

Which **pizzas have never been ordered**? Show the pizza `name`.

<SqlPlayground
  title="🏆 Boss 2"
  query="-- Think: LEFT JOIN + IS NULL (like Kwame!)
"
  solution="SELECT p.name FROM pizzas p LEFT JOIN orders o ON o.pizza_id = p.id WHERE o.id IS NULL;"
  hint="Start FROM pizzas, LEFT JOIN orders, then keep the rows where the order is NULL."
  :max-height="200"
/>

---

# 🏆 Boss level 3

What is the **revenue** (quantity × price) of **each pizza category**? Show `category` and `revenue`, best category first.

<SqlPlayground
  title="🏆 Boss 3"
  query="-- JOIN orders and pizzas, then GROUP BY category
"
  solution="SELECT p.category, SUM(o.quantity * p.price) AS revenue FROM orders o JOIN pizzas p ON o.pizza_id = p.id GROUP BY p.category ORDER BY revenue DESC;"
  hint="You do not need the customers table for this one."
  :max-height="200"
/>

---
layout: center
class: text-center
---

# 🎓 You speak SQL now!

<div class="mt-6 text-xl leading-loose" style="max-width: 720px; margin-inline: auto">
<v-clicks>

🔍 You can **ask** questions with `SELECT`

🧑‍🍳 You can **filter**, **sort** and **limit** results

🧮 You can **count** and **group**

🔗 You can **join** tables

✏️ You can **change** data (carefully!)

</v-clicks>
</div>

---

# Free play 🎢

Everything is yours. Invent your own questions!

<SqlPlayground
  manual
  title="🧪 Sandbox"
  query="SELECT * FROM pizzas;"
  schema
  :max-height="240"
/>

---

# Keep learning 📚

<div class="grid-auto cols-2 mt-4">
  <div class="card"><h3>🧪 SQLBolt</h3>Short interactive lessons.<br><span class="text-sm opacity-70">sqlbolt.com</span></div>
  <div class="card red"><h3>🕵️ SQL Murder Mystery</h3>Solve a crime with SQL!<br><span class="text-sm opacity-70">mystery.knightlab.com</span></div>
  <div class="card green"><h3>⭐ Select Star SQL</h3>Learn with a real dataset.<br><span class="text-sm opacity-70">selectstarsql.com</span></div>
  <div class="card blue"><h3>🌐 SQLZoo</h3>Many exercises, many levels.<br><span class="text-sm opacity-70">sqlzoo.net</span></div>
</div>

<Callout type="chef">

The best way to learn SQL: <b>practice a little every day</b>. 10 minutes is enough! 🍕

</Callout>

---
layout: end
class: text-center
---

<div class="pizza-spin" style="font-size: 5rem">🍕</div>

# <span class="pizza-title">Thank you! Grazie! Merci! ありがとう! شكرا!</span>

Questions? 🙋
