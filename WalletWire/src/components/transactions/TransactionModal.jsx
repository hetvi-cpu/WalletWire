import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pencil, Plus, X, TrendingUp, TrendingDown } from 'lucide-react'
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../../data/mockData'
import { uid } from '../../utils/helpers'

const today = () => new Date().toISOString().split('T')[0]

export default function TransactionModal({ tx, onSave, onClose }) {
  const isEdit = !!tx?.id
  const [form, setForm] = useState(
    tx || {
      description: '', amount: '',
      category: 'Food & Dining', type: 'expense', date: today(),
    }
  )
  const [errors, setErrors] = useState({})

  const set = (k) => (v) => setForm(p => ({ ...p, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.description.trim()) e.description = 'Required'
    if (!form.amount || Number(form.amount) <= 0) e.amount = 'Enter a valid amount'
    if (!form.date) e.date = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    onSave({ ...form, amount: Number(form.amount), id: tx?.id || uid() })
    onClose()
  }

  const switchType = (t) => {
    setForm(p => ({
      ...p, type: t,
      category: t === 'income' ? 'Salary' : 'Food & Dining',
    }))
  }

  const cats = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  return (
    <div className="backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.25, ease: [0.22, 0.68, 0, 1.2] }}
        className="bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-7 w-full max-w-md shadow-modal border border-brand-border dark:border-dark-border mx-4"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[17px] font-bold text-brand-text dark:text-dark-text flex items-center gap-2">
            {isEdit ? <><Pencil size={16} strokeWidth={2} /> Edit Transaction</> : <><Plus size={16} strokeWidth={2} /> New Transaction</>}
          </h3>
          <button onClick={onClose} className="btn-icon w-8 h-8 flex items-center justify-center">
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Description */}
          <div>
            <label className="section-label block mb-1.5">Description</label>
            <input
              className={`input-base ${errors.description ? 'border-brand-red' : ''}`}
              value={form.description}
              onChange={e => set('description')(e.target.value)}
              placeholder="e.g. Grocery Store"
            />
            {errors.description && <p className="text-xs text-brand-red mt-1">{errors.description}</p>}
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="section-label block mb-1.5">Amount (₹)</label>
              <input
                type="number" min="1"
                className={`input-base ${errors.amount ? 'border-brand-red' : ''}`}
                value={form.amount}
                onChange={e => set('amount')(e.target.value)}
                placeholder="0"
              />
              {errors.amount && <p className="text-xs text-brand-red mt-1">{errors.amount}</p>}
            </div>
            <div>
              <label className="section-label block mb-1.5">Date</label>
              <input
                type="date"
                className={`input-base ${errors.date ? 'border-brand-red' : ''}`}
                value={form.date}
                onChange={e => set('date')(e.target.value)}
              />
            </div>
          </div>

          {/* Type toggle */}
          <div>
            <label className="section-label block mb-1.5">Type</label>
            <div className="flex gap-2">
              {[
                { key: 'income',  label: 'Income',  Icon: TrendingUp  },
                { key: 'expense', label: 'Expense', Icon: TrendingDown },
              ].map(({ key, label, Icon }) => (
                <button
                  key={key}
                  onClick={() => switchType(key)}
                  className={`
                    flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border-2 transition-all duration-150
                    flex items-center justify-center gap-2
                    ${form.type === key
                      ? key === 'income'
                        ? 'border-brand-green bg-brand-green-bg text-green-800'
                        : 'border-brand-red bg-brand-red-bg text-red-800'
                      : 'border-brand-border dark:border-dark-border bg-transparent text-brand-muted dark:text-dark-muted'}
                  `}
                >
                  <Icon size={14} strokeWidth={2} /> {label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="section-label block mb-1.5">Category</label>
            <select
              className="input-base cursor-pointer"
              value={form.category}
              onChange={e => set('category')(e.target.value)}
            >
              {cats.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-1">
            <button onClick={onClose} className="btn-ghost flex-1">Cancel</button>
            <button onClick={handleSave} className="btn-primary flex-1">
              {isEdit ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
