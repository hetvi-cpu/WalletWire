import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { FileText, TrendingUp, TrendingDown, Target, ArrowUp, ArrowDown, BarChart2, LayoutList } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CATEGORY_META, CHART_COLORS } from '../data/mockData'
import CategoryIcon from '../utils/categoryIcons'
import { fmtINR, fmtINRShort } from '../utils/helpers'

function ProgressBar({ pct, color }) {
  return (
    <div className="progress-bar w-full">
      <motion.div className="progress-fill" style={{ background: color }} initial={{ width: '0%' }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 0.68, 0, 1.2] }} />
    </div>
  )
}

function StatRow({ icon, label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-brand-muted dark:text-dark-muted flex items-center gap-1.5">{icon} {label}</span>
      <span className="text-xs font-semibold text-brand-text dark:text-dark-text">{value}</span>
    </div>
  )
}

function EmptyCard({ icon: Icon, message, hint }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-2 text-center px-4">
      <Icon size={28} className="text-brand-muted dark:text-dark-muted" strokeWidth={1.5} />
      <p className="text-sm font-semibold text-brand-text dark:text-dark-text">{message}</p>
      <p className="text-xs text-brand-muted dark:text-dark-muted">{hint}</p>
    </div>
  )
}

export default function InsightsPage() {
  const { spendByCat, stats, monthlyStats, monthlyChartData, txs, dark } = useApp()
  const { thisMonth, lastMonth, expChange } = monthlyStats
  const top = spendByCat[0]
  const topMeta = top ? CATEGORY_META[top.name] : null

  const gridColor = dark ? '#1E3358' : '#F0F4FF'
  const tickColor = dark ? '#8B9DC4' : '#9CA3AF'

  const hasExpenses    = spendByCat.length > 0
  const hasChartData   = monthlyChartData.some(d => d.income > 0 || d.expenses > 0)

  return (
    <motion.div key="insights" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="lg:hidden mb-5">
        <h1 className="text-2xl font-bold text-brand-text dark:text-dark-text tracking-tight">Insights</h1>
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5">

        {/* Top spending category */}
        <div className="card-base card-hover p-4 sm:p-5">
          <p className="section-label mb-3">Top Spending Category</p>
          {hasExpenses ? (
            <>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ background: topMeta?.bg || '#F1F5F9', color: topMeta?.color || '#6B7280' }}>
                {topMeta && <CategoryIcon iconName={topMeta.iconName} size={18} color={topMeta.color}/>}
              </div>
              <p className="font-bold text-[15px] text-brand-text dark:text-dark-text">{top.name}</p>
              <p className="text-brand-red font-bold text-sm mt-1">{fmtINR(top.value)}</p>
              <p className="text-xs text-brand-muted dark:text-dark-muted mt-1">
                {stats.expenses > 0 ? Math.round((top.value / stats.expenses) * 100) : 0}% of total expenses
              </p>
            </>
          ) : (
            <EmptyCard icon={TrendingDown} message="No expenses yet" hint="Add expense transactions to see your top category." />
          )}
        </div>

        {/* Monthly comparison */}
        <div className="card-base card-hover p-4 sm:p-5">
          <p className="section-label mb-3">Monthly Comparison</p>
          {(thisMonth.expenses > 0 || lastMonth.expenses > 0) ? (
            <>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <p className="text-xs text-brand-muted dark:text-dark-muted mb-0.5">This Month</p>
                  <p className="font-bold text-lg text-brand-red">{fmtINR(thisMonth.expenses)}</p>
                </div>
                <div>
                  <p className="text-xs text-brand-muted dark:text-dark-muted mb-0.5">Last Month</p>
                  <p className="font-bold text-lg text-brand-text dark:text-dark-text">{fmtINR(lastMonth.expenses)}</p>
                </div>
              </div>
              <span className={`badge text-xs font-bold inline-flex items-center gap-1 ${expChange > 0 ? 'bg-brand-red-bg text-red-800' : 'bg-brand-green-bg text-green-800'}`}>
                {expChange > 0 ? <ArrowUp size={11} strokeWidth={2.5}/> : <ArrowDown size={11} strokeWidth={2.5}/>}
                {Math.abs(expChange).toFixed(1)}% vs last month
              </span>
            </>
          ) : (
            <EmptyCard icon={BarChart2} message="No monthly data" hint="Transactions will appear here once you add some." />
          )}
        </div>

        {/* Quick stats */}
        <div className="card-base card-hover p-4 sm:p-5">
          <p className="section-label mb-3">Quick Stats</p>
          {txs.length > 0 ? (() => {
            const distinctMonths = new Set(txs.map(t => t.date.slice(0, 7))).size || 1
            return (
            <div className="flex flex-col gap-2.5">
              <StatRow icon={<FileText size={13} strokeWidth={2}/>}     label="Total Transactions"  value={txs.length}/>
              <StatRow icon={<TrendingUp size={13} strokeWidth={2}/>}   label="Avg Monthly Income"  value={fmtINRShort(Math.round(stats.income / distinctMonths))}/>
              <StatRow icon={<TrendingDown size={13} strokeWidth={2}/>} label="Avg Monthly Spend"   value={fmtINRShort(Math.round(stats.expenses / distinctMonths))}/>
              <StatRow icon={<Target size={13} strokeWidth={2}/>}       label="Overall Savings Rate" value={`${stats.savRate}%`}/>
            </div>
          )})() : (
            <EmptyCard icon={FileText} message="No transactions" hint="Stats will populate as you add transactions." />
          )}
        </div>
      </div>

      {/* Bar chart */}
      <div className="card-base p-4 sm:p-5 mb-4 sm:mb-5">
        <h3 className="font-bold text-[15px] text-brand-text dark:text-dark-text mb-4">Monthly Income vs Expenses</h3>
        {hasChartData ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyChartData} margin={{ top: 4, right: 8, left: -14, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false}/>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} tickFormatter={fmtINRShort}/>
              <Tooltip formatter={v => [fmtINR(v)]} contentStyle={{ background: dark ? '#0D1A33' : '#fff', border: `1px solid ${dark ? '#1E3358' : '#E5E7EB'}`, borderRadius: 10, fontSize: 12 }}/>
              <Bar dataKey="income"   name="Income"   fill="#22C55E" radius={[5,5,0,0]}/>
              <Bar dataKey="expenses" name="Expenses" fill="#EF4444" radius={[5,5,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-[200px] gap-3">
            <BarChart2 size={32} className="text-brand-muted dark:text-dark-muted" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-brand-text dark:text-dark-text">No monthly data to display</p>
            <p className="text-xs text-brand-muted dark:text-dark-muted">Add income or expense transactions to see monthly trends.</p>
          </div>
        )}
      </div>

      {/* Category breakdown */}
      <div className="card-base p-4 sm:p-5">
        <h3 className="font-bold text-[15px] text-brand-text dark:text-dark-text mb-4">Category Breakdown</h3>
        {hasExpenses ? (
          <div className="flex flex-col gap-3.5">
            {spendByCat.map((c, i) => {
              const pct = stats.expenses > 0 ? Math.round((c.value / stats.expenses) * 100) : 0
              const meta = CATEGORY_META[c.name] || CATEGORY_META['Other']
              return (
                <div key={c.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-brand-text dark:text-dark-text flex items-center gap-1.5">
                      <CategoryIcon iconName={meta.iconName} size={14} color={meta.color}/>{c.name}
                    </span>
                    <span className="text-sm font-semibold text-brand-text dark:text-dark-text">{fmtINRShort(c.value)} · {pct}%</span>
                  </div>
                  <ProgressBar pct={pct} color={CHART_COLORS[i % CHART_COLORS.length]}/>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <LayoutList size={32} className="text-brand-muted dark:text-dark-muted" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-brand-text dark:text-dark-text">No spending categories yet</p>
            <p className="text-xs text-brand-muted dark:text-dark-muted">Your spending breakdown will appear here once you add expense transactions.</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
