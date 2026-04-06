import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Menu, LayoutDashboard, ArrowLeftRight, BarChart2, Sun, Moon, Calendar, Zap } from 'lucide-react'
import { AppProvider, useApp } from './context/AppContext'
import logo from './assets/WalletWire-logo.png'
import Sidebar from './components/layout/Sidebar'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import InsightsPage from './pages/InsightsPage'
import TransactionModal from './components/transactions/TransactionModal'
import DeleteModal from './components/ui/DeleteModal'

const BOTTOM_NAV = [
  { id: 'dashboard',    label: 'Home',     Icon: LayoutDashboard },
  { id: 'transactions', label: 'Txns',     Icon: ArrowLeftRight  },
  { id: 'insights',     label: 'Insights', Icon: BarChart2       },
]

const PAGE_META = {
  dashboard:    { title: 'Financial Overview',  sub: 'Your complete financial summary' },
  transactions: { title: 'Transactions',        sub: 'All your financial activity'     },
  insights:     { title: 'Insights',            sub: 'Spending patterns & analytics'   },
}

function TopBar({ dark, setDark, page, role }) {
  const now = new Date()
  const meta = PAGE_META[page] || PAGE_META.dashboard
  return (
    <header className="topbar">
      {/* Left: page title */}
      <div>
        <h1 className="text-[26px] font-extrabold text-brand-text dark:text-dark-text tracking-tight leading-none">
          {meta.title}
        </h1>
      </div>

      {/* Right: chips + toggle */}
      <div className="flex items-center gap-2.5">
        <div className="stat-chip">
          <Calendar size={12} className="text-primary" />
          <span className="text-xs font-semibold text-brand-muted dark:text-dark-muted">
            {now.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </span>
        </div>
        {role === 'admin' && (
          <div className="stat-chip">
            <Zap size={11} className="text-amber-500" strokeWidth={2} />
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">Admin</span>
          </div>
        )}
        {/* ── Theme toggle ── */}
        <button
          onClick={() => setDark(!dark)}
          className="btn-icon p-2"
          aria-label="Toggle theme"
        >
          {dark
            ? <Sun  size={16} className="text-amber-400" strokeWidth={2} />
            : <Moon size={16} className="text-primary"   strokeWidth={2} />
          }
        </button>
      </div>
    </header>
  )
}

function Inner() {
  const { page, setPage, modal, setModal, saveTx, delTx, dark, setDark, role } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-full overflow-hidden bg-brand-bg dark:bg-dark-bg transition-colors duration-300">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* ── Desktop top bar (lg+) ── */}
        <TopBar dark={dark} setDark={setDark} page={page} role={role} />

        {/* ── Mobile top bar ── */}
        <header
          className="lg:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-dark-card border-b border-brand-border/40 dark:border-dark-border shrink-0 z-10"
          style={{ boxShadow: '0 1px 8px rgba(7,16,42,0.07)' }}
        >
          <button onClick={() => setSidebarOpen(true)} className="btn-icon p-2">
            <Menu size={17} />
          </button>

          <div className="flex items-center gap-2">
            <img src={logo} alt="WalletWire" className="w-7 h-7 object-contain" />
            <span className="font-extrabold text-[15px] tracking-tight">
              <span className="text-brand-text dark:text-white">Wallet</span>
              <span className="text-primary">Wire</span>
            </span>
          </div>

          {/* Mobile: clean icon toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="btn-icon p-2"
            aria-label="Toggle theme"
          >
            {dark
              ? <Sun  size={16} className="text-amber-400" strokeWidth={2} />
              : <Moon size={16} className="text-primary"   strokeWidth={2} />
            }
          </button>
        </header>

        {/* ── Main content ── */}
        <main className="flex-1 overflow-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-6 pb-24 lg:pb-8 transition-colors duration-300">
          <AnimatePresence mode="wait">
            {page === 'dashboard'    && <DashboardPage    key="dashboard"    />}
            {page === 'transactions' && <TransactionsPage key="transactions" />}
            {page === 'insights'     && <InsightsPage     key="insights"     />}
          </AnimatePresence>
        </main>
      </div>

      {/* ── Mobile bottom nav ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[70] bg-white/95 dark:bg-dark-card/95 backdrop-blur-md border-t border-brand-border/40 dark:border-dark-border flex">
        {BOTTOM_NAV.map(({ id, label, Icon }) => {
          const active = page === id
          return (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-bold tracking-wide transition-all duration-150
                ${active ? 'text-primary' : 'text-brand-muted dark:text-dark-muted'}`}
            >
              <span className={`p-1.5 rounded-xl transition-all duration-150 ${active ? 'bg-primary/10' : ''}`}>
                <Icon size={19} strokeWidth={active ? 2.3 : 1.8} />
              </span>
              {label}
            </button>
          )
        })}
      </nav>

      <AnimatePresence>
        {modal && <TransactionModal key="tx-modal" tx={modal === 'new' ? null : modal} onSave={saveTx} onClose={() => setModal(null)} />}
        {delTx  && <DeleteModal key="del-modal" />}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return <AppProvider><Inner /></AppProvider>
}