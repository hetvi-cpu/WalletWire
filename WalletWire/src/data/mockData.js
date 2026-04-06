export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Business',
  'Bonus',
  'Rental',
]

export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transport',
  'Entertainment',
  'Shopping',
  'Bills & Utilities',
  'Health & Fitness',
  'Other',
]

export const CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES]

export const CATEGORY_META = {
  // ── Income ──
  'Salary':           { iconName: 'BriefcaseBusiness', color: '#22C55E', bg: '#DCFCE7', text: '#166534' },
  'Freelance':        { iconName: 'Laptop',            color: '#06B6D4', bg: '#CFFAFE', text: '#155E75' },
  'Investment':       { iconName: 'TrendingUp',        color: '#1B3FE4', bg: '#EEF2FF', text: '#1B3FE4' },
  'Business':         { iconName: 'Building2',         color: '#8B5CF6', bg: '#F3E8FF', text: '#6B21A8' },
  'Bonus':            { iconName: 'Gift',              color: '#F59E0B', bg: '#FEF3C7', text: '#92400E' },
  'Rental':           { iconName: 'Home',              color: '#F97316', bg: '#FFF7ED', text: '#9A3412' },
  // ── Expense ──
  'Food & Dining':    { iconName: 'UtensilsCrossed',   color: '#F59E0B', bg: '#FEF3C7', text: '#92400E' },
  'Transport':        { iconName: 'Car',               color: '#3B82F6', bg: '#DBEAFE', text: '#1E40AF' },
  'Entertainment':    { iconName: 'Clapperboard',      color: '#8B5CF6', bg: '#F3E8FF', text: '#6B21A8' },
  'Shopping':         { iconName: 'ShoppingBag',       color: '#EC4899', bg: '#FCE7F3', text: '#9D174D' },
  'Bills & Utilities':{ iconName: 'Zap',               color: '#22C55E', bg: '#DCFCE7', text: '#065F46' },
  'Health & Fitness': { iconName: 'Dumbbell',          color: '#F97316', bg: '#FFF7ED', text: '#9A3412' },
  'Other':            { iconName: 'Package',           color: '#6B7280', bg: '#F1F5F9', text: '#475569' },
}

export const CHART_COLORS = [
  '#1B3FE4', '#22C55E', '#F59E0B', '#8B5CF6',
  '#EF4444', '#06B6D4', '#F97316', '#EC4899',
]

export const MOCK_TRANSACTIONS = [
  { id: 1,  date: '2026-04-03', description: 'Grocery Store',       amount: 2450,  category: 'Food & Dining',     type: 'expense' },
  { id: 2,  date: '2026-04-02', description: 'April Salary',        amount: 85000, category: 'Salary',            type: 'income'  },
  { id: 3,  date: '2026-04-01', description: 'Electricity Bill',    amount: 1800,  category: 'Bills & Utilities', type: 'expense' },
  { id: 4,  date: '2026-03-31', description: 'Netflix',             amount: 649,   category: 'Entertainment',     type: 'expense' },
  { id: 5,  date: '2026-03-30', description: 'Uber Rides',          amount: 320,   category: 'Transport',         type: 'expense' },
  { id: 6,  date: '2026-03-28', description: 'Restaurant Dinner',   amount: 1850,  category: 'Food & Dining',     type: 'expense' },
  { id: 7,  date: '2026-03-25', description: 'Gym Membership',      amount: 1500,  category: 'Health & Fitness',  type: 'expense' },
  { id: 8,  date: '2026-03-22', description: 'Amazon Shopping',     amount: 3200,  category: 'Shopping',          type: 'expense' },
  { id: 9,  date: '2026-03-20', description: 'Freelance Project',   amount: 25000, category: 'Freelance',         type: 'income'  },
  { id: 10, date: '2026-03-18', description: 'Internet Bill',       amount: 999,   category: 'Bills & Utilities', type: 'expense' },
  { id: 11, date: '2026-03-15', description: 'Coffee & Snacks',     amount: 540,   category: 'Food & Dining',     type: 'expense' },
  { id: 12, date: '2026-03-12', description: 'Movie Tickets',       amount: 800,   category: 'Entertainment',     type: 'expense' },
  { id: 13, date: '2026-03-10', description: 'March Salary',        amount: 85000, category: 'Salary',            type: 'income'  },
  { id: 14, date: '2026-03-08', description: 'Petrol',              amount: 2500,  category: 'Transport',         type: 'expense' },
  { id: 15, date: '2026-03-05', description: 'Medical Checkup',     amount: 1200,  category: 'Health & Fitness',  type: 'expense' },
  { id: 16, date: '2026-03-02', description: 'Clothing Store',      amount: 4500,  category: 'Shopping',          type: 'expense' },
  { id: 17, date: '2026-02-28', description: 'Grocery Store',       amount: 2800,  category: 'Food & Dining',     type: 'expense' },
  { id: 18, date: '2026-02-25', description: 'Water & Gas Bill',    amount: 450,   category: 'Bills & Utilities', type: 'expense' },
  { id: 19, date: '2026-02-22', description: 'Spotify Premium',     amount: 119,   category: 'Entertainment',     type: 'expense' },
  { id: 20, date: '2026-02-20', description: 'February Salary',     amount: 85000, category: 'Salary',            type: 'income'  },
  { id: 21, date: '2026-02-18', description: 'Metro Recharge',      amount: 500,   category: 'Transport',         type: 'expense' },
  { id: 22, date: '2026-02-15', description: 'Restaurant Lunch',    amount: 950,   category: 'Food & Dining',     type: 'expense' },
  { id: 23, date: '2026-02-12', description: 'Yoga Classes',        amount: 2000,  category: 'Health & Fitness',  type: 'expense' },
  { id: 24, date: '2026-02-10', description: 'Stock Dividend',      amount: 4200,  category: 'Investment',        type: 'income'  },
  { id: 25, date: '2026-02-05', description: 'Electronics Store',   amount: 8500,  category: 'Shopping',          type: 'expense' },
  { id: 26, date: '2026-01-31', description: 'Grocery Store',       amount: 2200,  category: 'Food & Dining',     type: 'expense' },
  { id: 27, date: '2026-01-28', description: 'January Salary',      amount: 85000, category: 'Salary',            type: 'income'  },
  { id: 28, date: '2026-01-25', description: 'Phone Bill',          amount: 699,   category: 'Bills & Utilities', type: 'expense' },
  { id: 29, date: '2026-01-20', description: 'Freelance Project',   amount: 18000, category: 'Freelance',         type: 'income'  },
  { id: 30, date: '2026-01-15', description: 'Food Delivery',       amount: 1200,  category: 'Food & Dining',     type: 'expense' },
  { id: 31, date: '2026-01-10', description: 'Cab Rides',           amount: 680,   category: 'Transport',         type: 'expense' },
  { id: 32, date: '2026-01-05', description: 'Apartment Rent',      amount: 12000, category: 'Rental',            type: 'income'  },
  { id: 33, date: '2025-12-31', description: 'New Year Dinner',     amount: 3500,  category: 'Food & Dining',     type: 'expense' },
  { id: 34, date: '2025-12-28', description: 'December Salary',     amount: 85000, category: 'Salary',            type: 'income'  },
  { id: 35, date: '2025-12-25', description: 'Christmas Shopping',  amount: 12000, category: 'Shopping',          type: 'expense' },
  { id: 36, date: '2025-12-20', description: 'Year-end Bonus',      amount: 30000, category: 'Bonus',             type: 'income'  },
  { id: 37, date: '2025-12-15', description: 'Health Insurance',    amount: 5000,  category: 'Health & Fitness',  type: 'expense' },
  { id: 38, date: '2025-12-10', description: 'Streaming Bundle',    amount: 1200,  category: 'Entertainment',     type: 'expense' },
  { id: 39, date: '2025-11-30', description: 'November Salary',     amount: 85000, category: 'Salary',            type: 'income'  },
  { id: 40, date: '2025-11-25', description: 'Grocery Store',       amount: 2600,  category: 'Food & Dining',     type: 'expense' },
  { id: 41, date: '2025-11-20', description: 'Car Insurance',       amount: 4500,  category: 'Bills & Utilities', type: 'expense' },
  { id: 42, date: '2025-11-15', description: 'Dentist Visit',       amount: 2500,  category: 'Health & Fitness',  type: 'expense' },
  { id: 43, date: '2025-11-10', description: 'Consulting Income',   amount: 20000, category: 'Business',          type: 'income'  },
  { id: 44, date: '2025-11-05', description: 'Weekend Trip',        amount: 8000,  category: 'Entertainment',     type: 'expense' },
]

export const BALANCE_TREND = [
  { month: "Nov '25", balance: 125000, income: 105000, expenses: 17600 },
  { month: "Dec '25", balance: 232500, income: 115000, expenses: 21700 },
  { month: "Jan '26", balance: 330100, income: 103000, expenses: 6079  },
  { month: "Feb '26", balance: 408600, income: 91200,  expenses: 12700 },
  { month: "Mar '26", balance: 487700, income: 110000, expenses: 15508 },
  { month: "Apr '26", balance: 569450, income: 85000,  expenses: 4250  },
]
