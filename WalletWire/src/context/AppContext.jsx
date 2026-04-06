import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { MOCK_TRANSACTIONS } from '../data/mockData'
import { storage, sumByType, groupByCategory, filterByMonth, pctChange } from '../utils/helpers'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // ── Persisted state ──────────────────────────────────────────────
  const [dark,  setDarkRaw]  = useState(() => storage.get('fiq_dark',  false))
  const [role,  setRoleRaw]  = useState(() => storage.get('fiq_role',  'viewer'))
  const [txs,   setTxsRaw]   = useState(() => storage.get('fiq_txs',   MOCK_TRANSACTIONS))

  // ── UI state ─────────────────────────────────────────────────────
  const [page,   setPage]   = useState('dashboard')
  const [modal,  setModal]  = useState(null)   // null | 'new' | transaction object
  const [delTx,  setDelTx]  = useState(null)   // transaction to confirm-delete

  // ── Filter state ─────────────────────────────────────────────────
  const [search,  setSearch]  = useState('')
  const [fType,   setFType]   = useState('all')
  const [fCat,    setFCat]    = useState('all')
  const [sort,    setSort]    = useState('date_desc')

  // ── Persist on change ────────────────────────────────────────────
  const setDark = v => { setDarkRaw(v); storage.set('fiq_dark', v) }
  const setRole = v => { setRoleRaw(v); storage.set('fiq_role', v) }
  const setTxs  = fn => {
    setTxsRaw(prev => {
      const next = typeof fn === 'function' ? fn(prev) : fn
      storage.set('fiq_txs', next)
      return next
    })
  }

  // ── Dark mode class on <html> ────────────────────────────────────
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  // ── CRUD helpers ─────────────────────────────────────────────────
  const addTx    = tx  => setTxs(p => [tx,                              ...p])
  const updateTx = tx  => setTxs(p => p.map(t => t.id === tx.id ? tx : t))
  const deleteTx = id  => setTxs(p => p.filter(t => t.id !== id))
  const saveTx   = tx  => txs.find(t => t.id === tx.id) ? updateTx(tx) : addTx(tx)

  // ── Derived stats ────────────────────────────────────────────────
  const stats = useMemo(() => {
    const income   = sumByType(txs, 'income')
    const expenses = sumByType(txs, 'expense')
    const balance  = income - expenses
    const savRate  = income > 0 ? Math.round((balance / income) * 100) : 0
    return { income, expenses, balance, savRate }
  }, [txs])

  const spendByCat = useMemo(() => groupByCategory(txs), [txs])

  const monthlyStats = useMemo(() => {
    const now  = new Date()
    const lm   = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const this_ = filterByMonth(txs, now.getFullYear(), now.getMonth())
    const last_ = filterByMonth(txs, lm.getFullYear(),  lm.getMonth())
    return {
      thisMonth: {
        income:   sumByType(this_, 'income'),
        expenses: sumByType(this_, 'expense'),
      },
      lastMonth: {
        income:   sumByType(last_, 'income'),
        expenses: sumByType(last_, 'expense'),
      },
      expChange: pctChange(
        sumByType(this_, 'expense'),
        sumByType(last_, 'expense')
      ),
    }
  }, [txs])

  // ── Monthly chart data (last 6 months) ───────────────────────────
  const monthlyChartData = useMemo(() => {
    const now = new Date()
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
      const month_txs = filterByMonth(txs, d.getFullYear(), d.getMonth())
      return {
        month: d.toLocaleString('en-IN', { month: 'short', year: '2-digit' }),
        income:   sumByType(month_txs, 'income'),
        expenses: sumByType(month_txs, 'expense'),
      }
    })
  }, [txs])

  // ── Filtered + sorted transactions ───────────────────────────────
  const filteredTxs = useMemo(() => {
    let r = [...txs]
    if (search) {
      const q = search.toLowerCase()
      r = r.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      )
    }
    if (fType !== 'all') r = r.filter(t => t.type === fType)
    if (fCat  !== 'all') r = r.filter(t => t.category === fCat)
    const [by, dir] = sort.split('_')
    r.sort((a, b) => {
      const diff =
        by === 'date'   ? new Date(a.date) - new Date(b.date)   :
        by === 'amount' ? a.amount - b.amount : 0
      return dir === 'asc' ? diff : -diff
    })
    return r
  }, [txs, search, fType, fCat, sort])

  const value = {
    // theme / role
    dark, setDark, role, setRole,
    // page nav
    page, setPage,
    // modals
    modal, setModal, delTx, setDelTx,
    // filters
    search, setSearch, fType, setFType, fCat, setFCat, sort, setSort,
    // data
    txs, saveTx, deleteTx,
    // derived
    stats, spendByCat, monthlyStats, monthlyChartData, filteredTxs,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
