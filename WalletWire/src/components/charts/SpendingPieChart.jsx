import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { PieChart as PieIcon } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { CHART_COLORS } from '../../data/mockData'
import { fmtINR, fmtINRShort } from '../../utils/helpers'
import { CATEGORY_META } from '../../data/mockData'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border rounded-xl px-3.5 py-2.5 shadow-card-hover text-xs">
      <p className="font-bold text-brand-text dark:text-dark-text">{payload[0].name}</p>
      <p className="text-brand-muted dark:text-dark-muted mt-0.5">{fmtINR(payload[0].value)}</p>
    </div>
  )
}

function EmptyPie() {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-3">
      <div className="w-14 h-14 rounded-full border-4 border-dashed border-brand-border dark:border-dark-border flex items-center justify-center">
        <PieIcon size={22} className="text-brand-muted dark:text-dark-muted" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-semibold text-brand-text dark:text-dark-text">No spending yet</p>
      <p className="text-xs text-brand-muted dark:text-dark-muted text-center">Add expense transactions to see your spending breakdown.</p>
    </div>
  )
}

export default function SpendingPieChart() {
  const { spendByCat, dark, stats } = useApp()
  const data = spendByCat.slice(0, 6)
  const isEmpty = data.length === 0

  return (
    <div className="card-base p-5 flex flex-col">
      <div className="mb-3">
        <h3 className="font-bold text-[15px] text-brand-text dark:text-dark-text">Spending Breakdown</h3>
        <p className="text-xs text-brand-muted dark:text-dark-muted mt-0.5">By category · all time</p>
      </div>

      {isEmpty ? <EmptyPie /> : (
        <>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie
                data={data} cx="50%" cy="50%"
                innerRadius={50} outerRadius={78}
                paddingAngle={2} dataKey="value"
                strokeWidth={0}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip dark={dark} />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-col gap-2 mt-2">
            {data.map((c, i) => {
              const pct = stats.expenses > 0 ? Math.round((c.value / stats.expenses) * 100) : 0
              return (
                <div key={c.name} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                    <span className="text-xs text-brand-muted dark:text-dark-muted truncate">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-brand-muted/70 dark:text-dark-muted/70">{pct}%</span>
                    <span className="text-xs font-semibold text-brand-text dark:text-dark-text">{fmtINRShort(c.value)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
