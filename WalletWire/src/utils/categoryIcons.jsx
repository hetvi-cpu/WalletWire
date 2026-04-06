import {
  UtensilsCrossed, Car, Clapperboard, ShoppingBag,
  Zap, Dumbbell, Package,
  BriefcaseBusiness, Laptop, TrendingUp, Building2, Gift, Home,
} from 'lucide-react'

const ICON_MAP = {
  // income
  BriefcaseBusiness,
  Laptop,
  TrendingUp,
  Building2,
  Gift,
  Home,
  // expense
  UtensilsCrossed,
  Car,
  Clapperboard,
  ShoppingBag,
  Zap,
  Dumbbell,
  Package,
}

export default function CategoryIcon({ iconName, size = 13, color, strokeWidth = 2 }) {
  const Icon = ICON_MAP[iconName] || Package
  return <Icon size={size} color={color} strokeWidth={strokeWidth} />
}
