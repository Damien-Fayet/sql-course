---
layout: chapter
number: 2
emoji: 🔍
subtitle: Ask your very first question
---

# SELECT

---
layout: two-cols
clicks: 3
---

# Your first query 🎉

```sql {1|2|all}
SELECT *
FROM pizzas;
```

<div class="mt-4 leading-loose">
  <div v-click="1">👉 <code>SELECT *</code> = <b>show</b> everything (<code>*</code> means "all columns")</div>
  <div v-click="2">👉 <code>FROM pizzas</code> = <b>from</b> which table</div>
  <div v-click="3">👉 <code>;</code> = the end of the sentence</div>
</div>

::right::

<div class="pl-6 pt-4">

<SqlPlayground
  query="SELECT *
FROM pizzas;"
  :max-height="290"
/>

</div>

<!--
Highlight each line while explaining. In English: "select ... from ..." reads like a sentence.
-->

---

# Customers, please! 🌍

Same idea, another table. What do you see?

<SqlPlayground
  query="SELECT *
FROM customers;"
  schema
  :max-height="270"
/>

---

# Pick your columns 🎯

Don't want everything? **Name the columns**, separated by commas.

<SqlPlayground
  query="SELECT name, price
FROM pizzas;"
  :max-height="230"
/>

<Callout type="bug">

Add a comma after <code>price,</code> and run. Then try <code>SELECT nam</code>. Read the error message!

</Callout>

---

# SQL is (almost) English 🗣️

````md magic-move {lines: true}
```sql
SELECT *
FROM pizzas;
```

```sql
SELECT name, price
FROM pizzas;
```

```sql
SELECT name, price AS euros
FROM pizzas;
```

```sql
SELECT name, price * 2 AS price_for_two
FROM pizzas;
```
````

<div class="mt-6 text-lg flex gap-4">
  <span
    v-for="(label, i) in ['① All columns', '② Choose columns', '③ Give a nickname', '④ Do math!']"
    :key="i"
    :style="{ opacity: $clicks >= i ? 1 : 0.25, fontWeight: $clicks === i ? 900 : 500, transition: 'all .3s' }"
  >{{ label }}</span>
</div>

---

# Nicknames with `AS` 🏷️

`AS` gives a **new name** (an *alias*) to a column in the result. You can also do **math**: `+ - * /`

<SqlPlayground
  query="SELECT name AS pizza,
       price AS euros,
       price * 2 AS price_for_two
FROM pizzas;"
  :max-height="150"
/>

<Callout type="tip">

Aliases do not change the table. They only change the <b>result</b>.

</Callout>

---

# `DISTINCT`: no duplicates, please 🧹

Which countries do our customers come from?

<SqlPlayground
  query="SELECT country
FROM customers;"
  :max-height="240"
/>

<Callout v-click type="chef">

Brazil and Japan appear twice. Add <code>DISTINCT</code> after <code>SELECT</code> and run again!

</Callout>

---

# 🎯 Challenge 1

Show **the name and the age** of all customers.

<SqlPlayground
  title="🎯 Challenge 1 — names and ages"
  query="-- write your query here
"
  solution="SELECT name, age FROM customers;"
  hint="You need 2 columns (name, age) and the table customers."
  :max-height="220"
/>

---

# 🎯 Challenge 2

Show **all the different categories** of pizza (each category only once).

<SqlPlayground
  title="🎯 Challenge 2 — categories"
  query="-- write your query here
"
  solution="SELECT DISTINCT category FROM pizzas;"
  hint="Remember the magic word that removes duplicates."
  :max-height="220"
/>

---

<Quiz
  question="Which query shows ONLY the names of the customers?"
  :options="['SELECT * FROM customers;', 'SELECT name FROM customers;', 'SELECT customers FROM name;', 'SHOW name OF customers;']"
  :answer="1"
  code
  explain="SELECT + column, FROM + table. In that order!"
/>
