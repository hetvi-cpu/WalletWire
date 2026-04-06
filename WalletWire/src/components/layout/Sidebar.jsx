import { X, LayoutDashboard, ArrowLeftRight, BarChart2, ChevronRight, Shield, Eye } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import logo from '../../assets/WalletWire-logo.png'

const NAV = [
  { id: 'dashboard',    label: 'Dashboard',    Icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', Icon: ArrowLeftRight  },
  { id: 'insights',     label: 'Insights',     Icon: BarChart2       },
]

export default function Sidebar({ mobileOpen, onClose }) {
  const { page, setPage, role, setRole } = useApp()
  const handleNav = (id) => { setPage(id); onClose?.() }

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed top-0 left-0 h-full z-[90] w-[252px] shrink-0 flex flex-col
        sidebar-glass border-r border-brand-border/40 dark:border-dark-border
        transition-all duration-300 lg:static lg:translate-x-0 lg:z-auto
        ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>

        {/* ── Logo + close ── */}
        <div className="px-5 pt-6 pb-5 border-b border-brand-border/40 dark:border-dark-border flex items-center justify-between">
          <div className="flex items-center gap-3">
              <img src={logo} alt="WalletWire" className="w-10 h-10 object-contain" />
            <div>
              <p className="font-extrabold text-[16px] leading-none tracking-tight">
                <span className="text-brand-text dark:text-white">Wallet</span>
                <span className="text-primary">Wire</span>
              </p>
              <p className="text-[9px] text-brand-muted dark:text-dark-muted mt-0.5 font-semibold tracking-[0.1em] uppercase">Personal Finance</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden btn-icon p-1.5">
            <X size={14} />
          </button>
        </div>

        {/* ── Nav label ── */}
        <div className="px-5 pt-5 pb-2">
          <p className="section-label">Main Menu</p>
        </div>

        {/* ── Nav Items ── */}
        <nav className="flex-1 px-3 flex flex-col gap-0.5 overflow-y-auto scrollbar-hide">
          {NAV.map(({ id, label, Icon }) => {
            const active = page === id
            return (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className={`nav-item w-full text-left group ${active ? 'nav-item-active' : 'nav-item-inactive'}`}
              >
                <span className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${
                  active ? 'bg-white/20' : 'group-hover:bg-brand-border/50 dark:group-hover:bg-dark-border/60'
                }`}>
                  <Icon size={15} strokeWidth={active ? 2.2 : 1.8} />
                </span>
                <span className="text-[13px] leading-none">{label}</span>
                {active && <ChevronRight size={12} className="ml-auto opacity-50 shrink-0" />}
              </button>
            )
          })}
        </nav>

        {/* ── Role selector ── */}
        <div className="px-3 pt-3 pb-5 border-t border-brand-border/40 dark:border-dark-border">
          <div className="rounded-xl bg-brand-bg dark:bg-dark-alt border border-brand-border/50 dark:border-dark-border p-3">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Shield size={10} className="text-brand-muted dark:text-dark-muted" />
              <p className="section-label">Access Role</p>
            </div>
            <div className="flex gap-1.5">
              {[
                { r: 'viewer', RIcon: Eye,    label: 'Viewer' },
                { r: 'admin',  RIcon: Shield, label: 'Admin'  },
              ].map(({ r, RIcon, label }) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    role === r
                      ? 'bg-primary text-white'
                      : 'text-brand-muted dark:text-dark-muted hover:bg-brand-border/60 dark:hover:bg-dark-border/60'
                  }`}
                >
                  <RIcon size={11} strokeWidth={2} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}