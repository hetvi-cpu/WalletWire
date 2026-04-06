import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function SummaryCard({ title, value, sub, delta = null, icon, accentColor, delay = 0 }) {
  const isPos = delta == null || Number(delta) >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: delay / 1000, ease: [0.22, 0.68, 0, 1.2] }}
      className="summary-card p-5 group"
    >
      {/* Gradient top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)` }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 20% 20%, ${accentColor}0a 0%, transparent 65%)` }}
      />

      {/* Corner watermark */}
      <div
        className="absolute bottom-3 right-3 w-14 h-14 rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: accentColor }}
      />

      <div className="relative flex justify-between items-start mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
          style={{ background: `${accentColor}18`, color: accentColor }}
        >
          {icon}
        </div>

        {delta != null && (
          <span className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full ${
            isPos
              ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/25'
              : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/25'
          }`}>
            {isPos
              ? <TrendingUp size={10} strokeWidth={2.5} />
              : <TrendingDown size={10} strokeWidth={2.5} />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>

      <div className="relative">
        <p className="section-label mb-1.5">{title}</p>
        <h2 className="text-[22px] sm:text-2xl font-extrabold text-brand-text dark:text-dark-text leading-none tracking-tight mb-1.5">
          {value}
        </h2>
        <p className="text-[11px] text-brand-muted dark:text-dark-muted font-medium">{sub}</p>
      </div>
    </motion.div>
  )
}
