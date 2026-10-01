// The "Pizza Planet" database used by every playground in the course.
// SQLite dialect (runs in the browser through sql.js / WebAssembly).
export const SEED_SQL = `
CREATE TABLE pizzas (
  id            INTEGER PRIMARY KEY,
  name          TEXT NOT NULL,
  category      TEXT,
  price         REAL,
  is_vegetarian INTEGER
);

CREATE TABLE customers (
  id      INTEGER PRIMARY KEY,
  name    TEXT NOT NULL,
  country TEXT,
  age     INTEGER,
  phone   TEXT
);

CREATE TABLE orders (
  id          INTEGER PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  pizza_id    INTEGER REFERENCES pizzas(id),
  quantity    INTEGER,
  order_date  TEXT
);

INSERT INTO pizzas VALUES
  (1, 'Margherita',       'classic', 8.0,  1),
  (2, 'Pepperoni',        'meat',    10.5, 0),
  (3, 'Quattro Formaggi', 'veggie',  11.0, 1),
  (4, 'Hawaiian',         'classic', 10.0, 0),
  (5, 'Diavola',          'spicy',   11.5, 0),
  (6, 'Veggie Supreme',   'veggie',  10.5, 1),
  (7, 'BBQ Chicken',      'meat',    12.0, 0),
  (8, 'Marinara',         'classic', 7.0,  1),
  (9, 'Truffle Royale',   'premium', 16.0, 1);

INSERT INTO customers VALUES
  (1,  'Aiko',   'Japan',     24, '+81-90-1111'),
  (2,  'Mateo',  'Argentina', 31, NULL),
  (3,  'Fatima', 'Morocco',   28, '+212-6-2222'),
  (4,  'Liam',   'Ireland',   22, NULL),
  (5,  'Priya',  'India',     35, '+91-98-3333'),
  (6,  'Chen',   'China',     27, '+86-139-4444'),
  (7,  'Sofia',  'Brazil',    29, NULL),
  (8,  'Omar',   'Egypt',     41, '+20-10-5555'),
  (9,  'Elena',  'Spain',     19, '+34-61-6666'),
  (10, 'Kwame',  'Ghana',     33, '+233-24-7777'),
  (11, 'Anna',   'Poland',    26, NULL),
  (12, 'Lucas',  'Brazil',    30, '+55-11-8888'),
  (13, 'Yuki',   'Japan',     23, '+81-80-9999');

INSERT INTO orders VALUES
  (1,  1,  1, 2, '2026-09-01'),
  (2,  1,  3, 1, '2026-09-03'),
  (3,  2,  2, 1, '2026-09-01'),
  (4,  2,  5, 2, '2026-09-05'),
  (5,  3,  6, 1, '2026-09-02'),
  (6,  3,  3, 1, '2026-09-06'),
  (7,  4,  4, 3, '2026-09-02'),
  (8,  4,  2, 1, '2026-09-04'),
  (9,  5,  6, 2, '2026-09-03'),
  (10, 5,  1, 1, '2026-09-07'),
  (11, 6,  7, 1, '2026-09-03'),
  (12, 6,  2, 2, '2026-09-08'),
  (13, 7,  2, 1, '2026-09-04'),
  (14, 7,  5, 1, '2026-09-09'),
  (15, 8,  7, 2, '2026-09-05'),
  (16, 8,  9, 1, '2026-09-10'),
  (17, 9,  1, 1, '2026-09-06'),
  (18, 9,  3, 2, '2026-09-11'),
  (19, 11, 4, 1, '2026-09-07'),
  (20, 12, 2, 3, '2026-09-08'),
  (21, 13, 1, 2, '2026-09-09'),
  (22, 13, 6, 1, '2026-09-12'),
  (23, 6,  9, 3, '2026-09-12'),
  (24, 3,  2, 3, '2026-09-13');
`
