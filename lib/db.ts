import initSqlJs from 'sql.js'
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url'
import { SEED_SQL } from './seed'

// sql.js types are not installed on purpose (keeps the project light).
type Database = any

let sqlPromise: Promise<any> | null = null

function getSql() {
  return (sqlPromise ??= initSqlJs({ locateFile: () => wasmUrl }))
}

/** A fresh in-memory Pizza Planet database. */
export async function createDb(): Promise<Database> {
  const SQL = await getSql()
  const db = new SQL.Database()
  db.run(SEED_SQL)
  return db
}

export interface ExecResult {
  columns: string[]
  rows: unknown[][]
  /** true when the last statement returned a result set (SELECT...) */
  hasRows: boolean
  /** first keyword of the last statement, upper-cased (SELECT, INSERT...) */
  kind: string
  /** rows modified by INSERT / UPDATE / DELETE */
  changes: number
  ms: number
}

function lastStatementKind(sql: string): string {
  const withoutComments = sql.replace(/--[^\n]*/g, '')
  const statements = withoutComments.split(';').map(s => s.trim()).filter(Boolean)
  const last = statements[statements.length - 1] ?? ''
  return (last.match(/^[A-Za-z]+/)?.[0] ?? '').toUpperCase()
}

export function execSql(db: Database, sql: string): ExecResult {
  const t0 = performance.now()
  const sets = db.exec(sql)
  const ms = performance.now() - t0
  const last = sets[sets.length - 1]
  return {
    columns: last?.columns ?? [],
    rows: last?.values ?? [],
    hasRows: !!last,
    kind: lastStatementKind(sql),
    changes: db.getRowsModified(),
    ms,
  }
}

export interface TableInfo {
  name: string
  columns: { name: string, type: string, pk: boolean }[]
}

export function listTables(db: Database): TableInfo[] {
  const names = db.exec(
    `SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name`,
  )[0]?.values.map((r: unknown[]) => String(r[0])) ?? []
  return names.map((name: string) => ({
    name,
    columns: (db.exec(`PRAGMA table_info(${name})`)[0]?.values ?? []).map((c: unknown[]) => ({
      name: String(c[1]),
      type: String(c[2]),
      pk: Number(c[5]) > 0,
    })),
  }))
}

/** Compare two result sets (values only: column names may differ because of aliases). */
export function sameRows(a: unknown[][], b: unknown[][], ordered: boolean): boolean {
  const norm = (rows: unknown[][]) =>
    rows.map(r => JSON.stringify(r.map(v => (typeof v === 'number' ? Math.round(v * 1e4) / 1e4 : v))))
  const x = norm(a)
  const y = norm(b)
  if (x.length !== y.length) return false
  if (!ordered) {
    x.sort()
    y.sort()
  }
  return x.every((v, i) => v === y[i])
}

const TIPS: [RegExp, string][] = [
  [/syntax error/i, 'Syntax error: check your spelling, your commas (,) and the order of the keywords.'],
  [/no such column/i, 'This column does not exist. Click "🗂 Tables" to see the real column names.'],
  [/no such table/i, 'This table does not exist. Click "🗂 Tables" to see the table names.'],
  [/UNIQUE constraint failed/i, 'That id already exists! A primary key must be unique. Try another id.'],
  [/ambiguous column/i, 'Two tables have a column with this name. Add the table name: tablename.column'],
  [/incomplete input/i, 'The query looks unfinished. Did you forget something at the end?'],
]

export function friendlyTip(message: string): string {
  return TIPS.find(([re]) => re.test(message))?.[1] ?? ''
}
