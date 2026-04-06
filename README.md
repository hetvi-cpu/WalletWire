# 💰 WalletWire

 A modern, responsive finance dashboard to track, analyze, and understand financial activity.

---

## 📌 About

**WalletWire** is a frontend finance dashboard designed with a focus on clean UI, intuitive UX, and scalable architecture. It enables users to manage transactions, visualize financial trends, and gain insights through interactive charts.

---

## ✨ Features

### 📊 Dashboard

* Summary cards: Total Balance, Income, Expenses, Savings Rate
* Balance trend visualization (time-based)
* Spending breakdown (category-based)

### 📄 Transactions

* Detailed transaction table
* Search, filter, and sort functionality
* Export data (CSV / JSON)
* Add, edit, delete transactions (Admin role)

### 🔐 Role-Based UI

* **Viewer:** Read-only access
* **Admin:** Full access (CRUD operations)
* Role switching via UI toggle (frontend simulation)

### 📈 Insights

* Top spending category
* Monthly comparison
* Quick financial stats
* Category-wise breakdown

### 🌙 UI Enhancements

* Light & Dark mode
* Smooth animations
* Responsive layout

---

## 🛠️ Tech Stack

* React (Vite)
* Tailwind CSS
* Recharts
* Framer Motion
* React Context API

---

## 📁 Project Structure


src/
│
├── components/
│   ├── charts/
│   │   ├── BalanceTrendChart.jsx
│   │   └── SpendingPieChart.jsx
│   │
│   ├── layout/
│   │   └── Sidebar.jsx
│   │
│   ├── transactions/
│   │   ├── TransactionTable.jsx
│   │   ├── TransactionFilters.jsx
│   │   ├── TransactionModal.jsx
│   │   └── DeleteModal.jsx
│   │
│   ├── ui/
│   │   ├── SummaryCard.jsx
│   │   ├── CategoryBadge.jsx
│   │   └── Button.jsx
│
├── pages/
│   ├── DashboardPage.jsx
│   ├── TransactionsPage.jsx
│   └── InsightsPage.jsx
│
├── context/
│   └── AppContext.jsx
│
├── data/
│   └── mockData.js
│
├── utils/
│   ├── helpers.js
│   └── categoryIcons.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Getting Started

```bash id="9z7b1h"
git clone <your-repo-link>
cd walletwire
npm install
npm run dev
```

---

## 📷 Screenshots

### 📊 Dashboard (Light Mode)

![Dashboard Light](./screenshots/dashboard-light.png)

### 🌙 Dashboard (Dark Mode)

![Dashboard Dark](./screenshots/dashboard-dark.png)

### 📄 Transactions

![Transactions](./screenshots/transactions.png)

### 📈 Insights

![Insights](./screenshots/insights.png)

---

## 🎯 Highlights

* Clean and scalable component architecture
* Fully responsive design
* Interactive charts and smooth animations
* Centralized state management
* Role-based UI simulation
* Export functionality (CSV / JSON)

---
