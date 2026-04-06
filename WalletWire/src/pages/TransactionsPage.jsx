import { motion } from 'framer-motion'
import { Download, Plus } from 'lucide-react'
import { useApp } from '../context/AppContext'
import TransactionFilters from '../components/transactions/TransactionFilters'
import TransactionTable from '../components/transactions/TransactionTable'
import { exportCSV, exportJSON } from '../utils/helpers'

export default function TransactionsPage() {
  const { filteredTxs, role, setModal } = useApp()

  return (
    <motion.div key="transactions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* Header */}
      <div className="flex justify-between items-start sm:items-end mb-5 gap-3">
        <div>
          <h1 className="lg:hidden text-xl sm:text-[22px] font-bold text-brand-text dark:text-dark-text tracking-tight">Transactions</h1>
          <p className="text-sm text-brand-muted dark:text-dark-muted mt-1">{filteredTxs.length} records found</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          <button onClick={() => exportCSV(filteredTxs)} className="btn-ghost text-xs px-3 py-2 flex items-center gap-1.5">
            <Download size={13} strokeWidth={2} /> CSV
          </button>
          <button onClick={() => exportJSON(filteredTxs)} className="btn-ghost text-xs px-3 py-2 flex items-center gap-1.5">
            <Download size={13} strokeWidth={2} /> JSON
          </button>
          {role === 'admin' && (
            <button onClick={() => setModal('new')} className="btn-primary flex items-center gap-1.5 text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5">
              <Plus size={14} strokeWidth={2.5} />
              <span className="hidden sm:inline">Add Transaction</span>
              <span className="sm:hidden">Add</span>
            </button>
          )}
        </div>
      </div>

      <div className="card-base overflow-hidden">
        <TransactionFilters />
        <TransactionTable />
      </div>
    </motion.div>
  )
}