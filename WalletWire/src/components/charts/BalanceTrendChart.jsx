import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import { TrendingUp } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { fmtINRShort, fmtINR } from '../../utils/helpers'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border rounded-2xl px-4 py-3 shadow-card-hover text-xs">
      <p className="font-bold text-brand-text dark:text-dark-text mb-2 text-[13px]">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-brand-muted dark:text-dark-muted">{p.name}:</span>
          <span className="font-semibold text-brand-text dark:text-dark-text">{fmtINR(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

function EmptyChart() {
  return (
    <div className="flex flex-col items-center justify-center h-[230px] gap-3">
      <div className="w-14 h-14 rounded-2xl bg-brand-bg dark:bg-dark-alt border border-dashed border-brand-border dark:border-dark-border flex items-center justify-center">
        <TrendingUp size={22} className="text-brand-muted dark:text-dark-muted" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-semibold text-brand-text dark:text-dark-text">No trend data yet</p>
      <p className="text-xs text-brand-muted dark:text-dark-muted">Add transactions to start tracking your balance trend.</p>
    </div>
  )
}

export default function BalanceTrendChart() {
  const { dark, monthlyChartData } = useApp()
  const gridColor = dark ? '#1E3358' : '#EEF2FF'
  const tickColor = dark ? '#8B9DC4' : '#94A3B8'
  const data = (monthlyChartData || []).map(d => ({
    ...d,
    balance: d.income - d.expenses,
  }))

  const legend = [
    { label: 'Balance',  color: '#1B3FE4' },
    { label: 'Income',   color: '#22C55E' },
    { label: 'Expenses', color: '#EF4444' },
  ]

  return (
    <div className="card-base p-5">
      <div className="flex justify-between items-start mb-5 gap-3 flex-wrap">
        <div>
          <h3 className="font-bold text-[15px] text-brand-text dark:text-dark-text">Balance Trend</h3>
          <p className="text-xs text-brand-muted dark:text-dark-muted mt-0.5">Last 6 months</p>
        </div>
        {data.length > 0 && (
          <div className="flex gap-3">
            {legend.map(({ label, color }) => (
              <span key={label} className="flex items-center gap-1.5 text-[11px] text-brand-muted dark:text-dark-muted">
                <span className="w-6 h-0.5 rounded-full inline-block" style={{ background: color }} />
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      {data.length === 0 ? <EmptyChart /> : (
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -14, bottom: 0 }}>
            <defs>
              <linearGradient id="gradBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#1B3FE4" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#1B3FE4" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#22C55E" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: tickColor, fontWeight: 500 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} tickFormatter={fmtINRShort} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="income"   name="Income"   stroke="#22C55E" strokeWidth={1.8} fill="url(#gradIncome)"  dot={false} />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#EF4444" strokeWidth={1.6} fill="none" strokeDasharray="5 3" dot={false} />
            <Area type="monotone" dataKey="balance"  name="Balance"  stroke="#1B3FE4" strokeWidth={2.5} fill="url(#gradBalance)" dot={{ r: 3.5, fill: '#1B3FE4', strokeWidth: 0 }} activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
