# 🍕 SQL for Beginners — Welcome to Pizza Planet

Un cours d'introduction à SQL pour des **élèves internationaux, débutants en informatique**,
sous forme de présentation [Slidev](https://sli.dev) interactive (≈ 80 slides, en anglais simple).

Le fil rouge : une pizzeria, **Pizza Planet**, avec 3 tables (`pizzas`, `customers`, `orders`).
Tous les exemples tournent dans une **vraie base SQLite dans le navigateur** (via [sql.js](https://sql.js.org)) :
rien à installer pour les élèves, ils modifient et exécutent les requêtes directement dans les slides.

## Lancer le cours

```bash
npm install
npm run dev        # ouvre http://localhost:3030
```

Autres commandes :

| Commande               | Effet                                                  |
| ---------------------- | ------------------------------------------------------ |
| `npm run build`        | site statique dans `dist/` (à héberger où vous voulez) |
| `npm run export`       | export PDF (nécessite `playwright-chromium`)           |
| `npm run export-notes` | export des notes de présentateur                       |

Raccourcis utiles en présentation : `Espace`/`→` suivant · `O` vue d'ensemble · `F` plein écran ·
`P` mode présentateur (notes) · `Ctrl/⌘ + Entrée` exécute la requête quand on est dans un éditeur SQL.

## Plan du cours

| Fichier                  | Chapitre                                                |
| ------------------------ | ------------------------------------------------------- |
| `pages/00-welcome.md`    | Accueil, parcours, mode d'emploi                        |
| `pages/01-data.md`       | Données, tables, bases de données, qu'est-ce que SQL    |
| `pages/02-select.md`     | `SELECT`, `FROM`, alias, `DISTINCT`                     |
| `pages/03-filter.md`     | `WHERE`, `AND/OR/NOT`, `IN`, `BETWEEN`, `LIKE`, `NULL`  |
| `pages/04-sort-limit.md` | `ORDER BY`, `LIMIT`                                     |
| `pages/05-aggregate.md`  | `COUNT/SUM/AVG/MIN/MAX`, `GROUP BY`, `HAVING`           |
| `pages/06-joins.md`      | Clés primaires/étrangères, `INNER JOIN`, `LEFT JOIN`    |
| `pages/07-change.md`     | `INSERT`, `UPDATE`, `DELETE`, `CREATE TABLE`, types     |
| `pages/08-wrap.md`       | Antisèche, chasse aux bugs, « boss levels », ressources |

`slides.md` ne contient que la couverture et l'import des chapitres (`src: ./pages/...`).

## Écrire du contenu

### Un playground SQL

```md
<SqlPlayground
  query="SELECT name, price
FROM pizzas
WHERE price < 10;"
  :max-height="200"
/>
```

> ⚠️ Pas de **ligne vide** dans `query="..."` (elle casserait le Markdown), et pas de guillemets doubles `"` dans le SQL.

| Prop         | Rôle                                                                                  |
| ------------ | ------------------------------------------------------------------------------------- |
| `query`      | requête de départ (exécutée à l'ouverture de la slide, sauf `manual` ou défi)         |
| `manual`     | ne pas exécuter automatiquement (utile pour `INSERT/UPDATE/DELETE`)                   |
| `then-show`  | après un `INSERT/UPDATE/DELETE`, affiche le résultat de ce `SELECT`                   |
| `solution`   | **mode défi** : un `SELECT` de référence ; la réponse de l'élève est comparée (valeurs seulement : les alias/noms de colonnes sont ignorés, l'ordre ne compte que si la solution contient `ORDER BY`) |
| `verify`     | mode défi pour les modifications : un `SELECT` dont la 1ʳᵉ cellule doit être > 0      |
| `hint`       | bouton 💡 avec un indice                                                              |
| `schema`     | ouvre le panneau « 🗂 Tables » au départ                                              |
| `title`      | titre de la barre                                                                     |
| `max-height` | hauteur maximale (px) de la zone de résultat                                          |

Chaque playground a **sa propre copie** de la base : ce qu'un élève casse sur une slide n'affecte pas les autres.
Le bouton **↺ Reset** la remet à zéro.

### Autres composants

```md
<Quiz question="..." :options="['A', 'B', 'C']" :answer="1" explain="..." />

<Callout type="chef">Message</Callout>   <!-- tip | warn | chef | bug | info -->

<ResultTable :columns="['id','name']" :rows="[[1,'Margherita']]" :hl-col="1" />
```

Le layout `chapter` (page de titre de chapitre) se règle dans le frontmatter :
`layout: chapter`, `number`, `emoji`, `subtitle`.

### Modifier les données de l'exemple

Tout est dans `lib/seed.ts` (SQL de création + `INSERT`). Si vous changez les données, vérifiez que
les solutions des défis donnent toujours un résultat non ambigu (pas d'ex æquo dans un `ORDER BY ... LIMIT`).

## Publier sur GitHub Pages (optionnel)

Le workflow `.github/workflows/deploy.yml` construit et publie le site à chaque push sur `main`.
Il faut activer **Settings → Pages → Source : GitHub Actions** dans le dépôt.
(Le `--base /sql-course/` du workflow doit correspondre au nom du dépôt.)

## À savoir

- Les slides sont en **anglais volontairement simple** (phrases courtes, beaucoup d'emojis) pour un public international.
  Pas de drapeaux en emoji (ils s'affichent en lettres sous Windows).
- Les polices (Nunito, Fira Code) sont chargées depuis Google Fonts ; sans connexion, le navigateur utilise une police par défaut.
- La couverture affiche le cours, le nom du professeur et le logo de l'école (`assets/esc-clermont-logo.svg`, logo officiel récupéré sur esc-clermont.fr, où l'école apparaît désormais sous le nom « Clermont School of Business »). Le texte est dans `components/CourseBadge.vue`.
- Dialecte : **SQLite**. Les différences avec MySQL/PostgreSQL/SQL Server sont mentionnées (ex. `LIMIT` vs `TOP`).
