import { Link } from 'react-router-dom'
import { Scale, FileText, Lightbulb, Building2, Leaf, BarChart3, ArrowRight } from 'lucide-react'
import type { Category } from '@/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Scale,
  FileText,
  Lightbulb,
  Building2,
  Leaf,
  BarChart3,
}

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || FileText

  return (
    <Link
      to={`/library?category=${category.id}`}
      className="group card p-5 flex flex-col items-center text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center mb-3 group-hover:from-emerald-100 group-hover:to-emerald-200 transition-all duration-300 group-hover:scale-110">
        <Icon className="w-7 h-7 text-emerald-600" />
      </div>
      <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
      <p className="text-xs text-gray-500 line-clamp-2">{category.description}</p>
      <div className="mt-3 flex items-center gap-1 text-xs text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
        <span>查看资料</span>
        <ArrowRight className="w-3 h-3" />
      </div>
    </Link>
  )
}

interface CategoryGridProps {
  categories: Category[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}
