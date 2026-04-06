// ── Number Formatting ───────────────────────────────────────────────
export const fmtINR = (n) =>
  '₹' + Number(n).toLocaleString('en-IN')

export const fmtINRShort = (n) => {
  if (n >= 100000) return '₹' + (n / 100000).toFixed(1) + 'L'
  if (n >= 1000)   return '₹' + (n / 1000).toFixed(0) + 'K'
  return '₹' + n
}

export const fmtPct = (n) => (n >= 0 ? '+' : '') + n.toFixed(1) + '%'

// ── Date Formatting ──────────────────────────────────────────────────
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export const fmtDate = (d) => {
  const date  = new Date(d + 'T00:00:00')
  const day   = String(date.getDate()).padStart(2, '0')
  const month = MONTHS_SHORT[date.getMonth()]
  const year  = String(date.getFullYear()).slice(-2)
  return `${day} ${month} '${year}`
}

export const fmtMonthYear = (d) => {
  const date = new Date(d + 'T00:00:00')
  return `${MONTHS_SHORT[date.getMonth()]} '${String(date.getFullYear()).slice(-2)}`
}

// ── LocalStorage helpers ─────────────────────────────────────────────
export const storage = {
  get: (key, fallback) => {
    try {
      const v = localStorage.getItem(key)
      return v != null ? JSON.parse(v) : fallback
    } catch {
      return fallback
    }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
  },
}

// ── Transaction helpers ──────────────────────────────────────────────
export const sumByType = (txs, type) =>
  txs.filter(t => t.type === type).reduce((s, t) => s + t.amount, 0)

export const groupByCategory = (txs) => {
  const map = {}
  txs.filter(t => t.type === 'expense').forEach(t => {
    map[t.category] = (map[t.category] || 0) + t.amount
  })
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }))
}

export const filterByMonth = (txs, year, month) =>
  txs.filter(t => {
    const d = new Date(t.date + 'T00:00:00')
    return d.getFullYear() === year && d.getMonth() === month
  })

export const pctChange = (current, previous) =>
  previous > 0 ? ((current - previous) / previous) * 100 : 0

// ── Export ───────────────────────────────────────────────────────────
export const exportCSV = (txs, filename = 'transactions.csv') => {
  const rows = ['Date,Description,Category,Type,Amount']
  txs.forEach(t =>
    rows.push(`"${fmtDate(t.date)}","${t.description}",${t.category},${t.type},${t.amount}`)
  )
  download(rows.join('\n'), filename, 'text/csv')
}

export const exportJSON = (txs, filename = 'transactions.json') => {
  download(JSON.stringify(txs, null, 2), filename, 'application/json')
}

const download = (content, filename, type) => {
  const blob = new Blob([content], { type })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}

// ── Unique ID ────────────────────────────────────────────────────────
export const uid = () => Date.now() + Math.random().toString(36).slice(2)