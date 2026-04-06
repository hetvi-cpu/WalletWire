import { motion } from 'framer-motion'
import { Wallet, TrendingUp, DollarSign, PiggyBank } from 'lucide-react'
import { useApp } from '../context/AppContext'
import SummaryCard from '../components/ui/SummaryCard'
import BalanceTrendChart from '../components/charts/BalanceTrendChart'
import SpendingPieChart from '../components/charts/SpendingPieChart'
import { fmtINRShort } from '../utils/helpers'

export default function DashboardPage() {
  const { stats, monthlyStats } = useApp()
  const { thisMonth, lastMonth, expChange } = monthlyStats

  const incomeChange  = lastMonth.income   > 0 ? Math.round(((thisMonth.income   - lastMonth.income)   / lastMonth.income)   * 100) : 0
  const balanceChange = (lastMonth.income - lastMonth.expenses) !== 0
    ? Math.round((((thisMonth.income - thisMonth.expenses) - (lastMonth.income - lastMonth.expenses)) / Math.abs(lastMonth.income - lastMonth.expenses)) * 100)
    : 0
  const savRateThis = thisMonth.income  > 0 ? Math.round(((thisMonth.income  - thisMonth.expenses)  / thisMonth.income)  * 100) : 0
  const savRateLast = lastMonth.income  > 0 ? Math.round(((lastMonth.income  - lastMonth.expenses)  / lastMonth.income)  * 100) : 0
  const savRateChange = savRateLast !== 0 ? savRateThis - savRateLast : 0

  return (
    <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

      {/* Page title — mobile only (desktop handled by TopBar) */}
      <div className="lg:hidden mb-5">
        <h1 className="text-2xl font-extrabold text-brand-text dark:text-dark-text tracking-tight">Financial Overview</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5">
        <SummaryCard
          title="Total Balance"  value={fmtINRShort(stats.balance)}
          sub="lifetime net worth" delta={balanceChange}
          icon={<Wallet    size={20} strokeWidth={1.8}/>} accentColor="#1230C4" delay={0}
        />
        <SummaryCard
          title="Total Income"   value={fmtINRShort(stats.income)}
          sub="all time earnings" delta={incomeChange}
          icon={<TrendingUp size={20} strokeWidth={1.8}/>} accentColor="#15803D" delay={70}
        />
        <SummaryCard
          title="Total Expenses" value={fmtINRShort(stats.expenses)}
          sub="all time spending" delta={-Math.abs(Number(expChange.toFixed(0)))}
          icon={<DollarSign size={20} strokeWidth={1.8}/>} accentColor="#DC2626" delay={140}
        />
        <SummaryCard
          title="Savings Rate"   value={`${stats.savRate}%`}
          sub="of income preserved" delta={savRateChange}
          icon={<PiggyBank  size={20} strokeWidth={1.8}/>} accentColor="#B45309" delay={210}
        />
      </div>

      {/* Charts */}
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-4">
        <BalanceTrendChart />
        <SpendingPieChart />
      </div>
    </motion.div>
  )
}