import { Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { CATEGORIES } from '../../data/mockData'

export default function TransactionFilters() {
  const { search, setSearch, fType, setFType, fCat, setFCat, sort, setSort } = useApp()
  const [showFilters, setShowFilters] = useState(false)

  const selectCls = `input-base bg-white dark:bg-dark-alt cursor-pointer text-brand-text dark:text-dark-text text-sm w-full`

  return (
    <div className="border-b border-brand-border dark:border-dark-border bg-brand-bg/40 dark:bg-dark-alt/40">
      {/* Search row — always visible */}
      <div className="flex items-center gap-2 p-3 sm:p-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none">
            <Search size={14} strokeWidth={2.5} />
          </span>
          <input
            className="input-base pl-8 bg-white dark:bg-dark-alt"
            placeholder="Search transactions…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Desktop filters inline */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <div className="h-8 w-px bg-brand-border dark:bg-dark-border" />
          <select className={`${selectCls} w-[140px]`} value={fType} onChange={e => setFType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select className={`${selectCls} w-[155px]`} value={fCat} onChange={e => setFCat(e.target.value)}>
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className={`${selectCls} w-[148px]`} value={sort} onChange={e => setSort(e.target.value)}>
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
            <option value="amount_desc">Highest Amount</option>
            <option value="amount_asc">Lowest Amount</option>
          </select>
        </div>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowFilters(v => !v)}
          className={`md:hidden btn-icon p-2.5 shrink-0 ${showFilters ? 'bg-primary/10 text-primary border-primary/30' : ''}`}
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>

      {/* Mobile expanded filters */}
      {showFilters && (
        <div className="md:hidden flex flex-col gap-2.5 px-3 pb-3">
          <select className={selectCls} value={fType} onChange={e => setFType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select className={selectCls} value={fCat} onChange={e => setFCat(e.target.value)}>
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className={selectCls} value={sort} onChange={e => setSort(e.target.value)}>
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
            <option value="amount_desc">Highest Amount</option>
            <option value="amount_asc">Lowest Amount</option>
          </select>
        </div>
      )}
    </div>
  )
}
