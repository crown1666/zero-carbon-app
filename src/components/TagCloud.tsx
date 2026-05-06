import { Link } from 'react-router-dom'
import type { Tag } from '@/types'

interface TagCloudProps {
  tags: Tag[]
  maxTags?: number
}

export function TagCloud({ tags, maxTags = 10 }: TagCloudProps) {
  const displayTags = tags.slice(0, maxTags)

  const getSize = (usageCount: number) => {
    if (usageCount > 100) return 'text-base font-semibold'
    if (usageCount > 50) return 'text-sm font-medium'
    return 'text-xs'
  }

  const getColor = (index: number) => {
    const colors = [
      'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
      'bg-blue-50 text-blue-700 hover:bg-blue-100',
      'bg-amber-50 text-amber-700 hover:bg-amber-100',
      'bg-rose-50 text-rose-700 hover:bg-rose-100',
      'bg-violet-50 text-violet-700 hover:bg-violet-100',
      'bg-cyan-50 text-cyan-700 hover:bg-cyan-100',
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="flex flex-wrap gap-2">
      {displayTags.map((tag, index) => (
        <Link
          key={tag.id}
          to={`/library?tag=${tag.id}`}
          className={`px-3 py-1.5 rounded-full transition-all duration-200 ${getSize(tag.usage_count)} ${getColor(index)}`}
        >
          #{tag.name}
        </Link>
      ))}
    </div>
  )
}
