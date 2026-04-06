import { CATEGORY_META } from '../../data/mockData'
import CategoryIcon from '../../utils/categoryIcons'

export default function CategoryBadge({ category }) {
  const meta = CATEGORY_META[category] || CATEGORY_META['Other']
  return (
    <span
      className="badge"
      style={{ background: meta.bg, color: meta.text }}
    >
      <CategoryIcon iconName={meta.iconName} size={12} color={meta.text} />
      <span>{category}</span>
    </span>
  )
}
