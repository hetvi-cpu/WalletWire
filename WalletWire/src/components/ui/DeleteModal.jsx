import { motion } from 'framer-motion'
import { Trash2, AlertTriangle } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { fmtINR } from '../../utils/helpers'

export default function DeleteModal() {
  const { delTx, setDelTx, deleteTx } = useApp()
  if (!delTx) return null

  const handleDelete = () => { deleteTx(delTx.id); setDelTx(null) }

  return (
    <div className="backdrop" onClick={e => e.target === e.currentTarget && setDelTx(null)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.22, ease: [0.22, 0.68, 0, 1.2] }}
        className="bg-white dark:bg-dark-card rounded-2xl p-6 w-full max-w-sm mx-4 border border-brand-border/60 dark:border-dark-border"
        style={{ boxShadow: '0 24px 80px rgba(10,22,40,0.2)' }}
      >
        <div className="flex items-start gap-4 mb-5">
          <div className="w-11 h-11 rounded-xl bg-red-50 dark:bg-red-900/25 flex items-center justify-center shrink-0 border border-red-100 dark:border-red-800/40">
            <AlertTriangle size={18} className="text-brand-red" strokeWidth={2} />
          </div>
          <div>
            <p className="text-base font-bold text-brand-text dark:text-dark-text mb-1">Delete Transaction?</p>
            <p className="text-sm text-brand-muted dark:text-dark-muted">
              "<span className="font-semibold text-brand-text dark:text-dark-text">{delTx.description}</span>" · {fmtINR(delTx.amount)}
            </p>
            <p className="text-xs text-brand-muted/70 dark:text-dark-muted/60 mt-1">This action cannot be undone.</p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <button onClick={() => setDelTx(null)} className="btn-ghost flex-1">Cancel</button>
          <button onClick={handleDelete} className="btn-danger flex-1 flex items-center justify-center gap-2">
            <Trash2 size={13} strokeWidth={2} /> Delete
          </button>
        </div>
      </motion.div>
    </div>
  )
}
