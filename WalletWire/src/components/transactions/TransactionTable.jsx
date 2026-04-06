import { motion, AnimatePresence } from 'framer-motion'
import { Pencil, Trash2, SearchX, ArrowUp, ArrowDown } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import CategoryBadge from '../ui/CategoryBadge'
import { fmtINR, fmtDate } from '../../utils/helpers'

/* Mobile transaction card */
function TxCard({ t, role, onEdit, onDelete, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, delay: index * 0.02 }}
      className="flex items-start justify-between p-3.5 border-t border-brand-border dark:border-dark-border"
    >
      <div className="flex flex-col gap-1.5 min-w-0">
        <p className="text-sm font-semibold text-brand-text dark:text-dark-text truncate">{t.description}</p>
        <div className="flex items-center gap-1.5 flex-wrap">
          <CategoryBadge category={t.category} />
          <span className={`badge inline-flex items-center gap-1 ${t.type === 'income' ? 'bg-brand-green-bg text-green-800' : 'bg-brand-red-bg text-red-800'}`}>
            {t.type === 'income' ? <ArrowUp size={10} strokeWidth={2.5}/> : <ArrowDown size={10} strokeWidth={2.5}/>}
            {t.type === 'income' ? 'Income' : 'Expense'}
          </span>
        </div>
        <p className="text-xs text-brand-muted dark:text-dark-muted">{fmtDate(t.date)}</p>
      </div>
      <div className="flex flex-col items-end gap-2 ml-3 shrink-0">
        <span className={`text-sm font-bold font-mono ${t.type === 'income' ? 'text-brand-green' : 'text-brand-red'}`}>
          {t.type === 'income' ? '+' : '−'}{fmtINR(t.amount)}
        </span>
        {role === 'admin' && (
          <div className="flex gap-1.5">
            <button onClick={() => onEdit(t)} className="btn-icon px-1.5 py-1"><Pencil size={12} strokeWidth={2}/></button>
            <button onClick={() => onDelete(t)} className="px-1.5 py-1 rounded-lg bg-brand-red-bg text-brand-red border-none cursor-pointer hover:bg-red-100 transition-colors flex items-center"><Trash2 size={12} strokeWidth={2}/></button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function TransactionTable() {
  const { filteredTxs, role, setModal, setDelTx } = useApp()

  if (filteredTxs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center px-4">
        <SearchX size={40} className="text-brand-muted mb-4" strokeWidth={1.5} />
        <p className="text-base font-semibold text-brand-text dark:text-dark-text mb-1">No transactions found</p>
        <p className="text-sm text-brand-muted dark:text-dark-muted">Try adjusting your filters or add a new transaction.</p>
      </div>
    )
  }

  return (
    <>
      {/* Mobile card list */}
      <div className="md:hidden">
        <AnimatePresence initial={false}>
          {filteredTxs.map((t, i) => (
            <TxCard key={t.id} t={t} role={role} index={i} onEdit={setModal} onDelete={setDelTx} />
          ))}
        </AnimatePresence>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[580px]">
          <thead>
            <tr className="bg-brand-bg/80 dark:bg-dark-alt/80">
              <th className="th">Date</th>
              <th className="th">Description</th>
              <th className="th">Category</th>
              <th className="th">Type</th>
              <th className="th th-right">Amount</th>
              {role === 'admin' && <th className="th th-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {filteredTxs.map((t, i) => (
                <motion.tr
                  key={t.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.18, delay: i * 0.012 }}
                  className="tr-hover"
                >
                  <td className="td text-brand-muted dark:text-dark-muted whitespace-nowrap text-xs">{fmtDate(t.date)}</td>
                  <td className="td font-medium">{t.description}</td>
                  <td className="td"><CategoryBadge category={t.category} /></td>
                  <td className="td">
                    <span className={`badge inline-flex items-center gap-1 ${t.type === 'income' ? 'bg-brand-green-bg text-green-800' : 'bg-brand-red-bg text-red-800'}`}>
                      {t.type === 'income' ? <ArrowUp size={11} strokeWidth={2.5}/> : <ArrowDown size={11} strokeWidth={2.5}/>}
                      {t.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </td>
                  <td className="td text-right font-bold font-mono tabular-nums">
                    <span className={t.type === 'income' ? 'text-brand-green' : 'text-brand-red'}>
                      {t.type === 'income' ? '+' : '−'}{fmtINR(t.amount)}
                    </span>
                  </td>
                  {role === 'admin' && (
                    <td className="td text-right">
                      <div className="flex gap-1.5 justify-end">
                        <button onClick={() => setModal(t)} className="btn-icon px-2 py-1.5" title="Edit"><Pencil size={13} strokeWidth={2}/></button>
                        <button onClick={() => setDelTx(t)} className="px-2 py-1.5 rounded-lg bg-brand-red-bg text-brand-red border-none cursor-pointer hover:bg-red-100 transition-colors flex items-center" title="Delete"><Trash2 size={13} strokeWidth={2}/></button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </>
  )
}
