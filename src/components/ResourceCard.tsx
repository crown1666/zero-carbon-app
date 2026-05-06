import { Link } from 'react-router-dom'
import { Heart, Eye, ExternalLink } from 'lucide-react'
import type { Resource } from '@/types'
import { formatDate, truncateText } from '@/utils/mockData'

interface ResourceCardProps {
  resource: Resource
  onFavorite?: (id: string) => void
  isFavorited?: boolean
}

export function ResourceCard({ resource, onFavorite, isFavorited }: ResourceCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onFavorite?.(resource.id)
  }

  return (
    <Link to={`/library/${resource.id}`} className="card group overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-2">
              {resource.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="px-2 py-0.5 rounded bg-gray-100">{resource.category?.name}</span>
              <span>•</span>
              <span>{formatDate(resource.created_at)}</span>
            </div>
          </div>
          {resource.link && (
            <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
          )}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {truncateText(resource.summary, 80)}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {resource.tags.slice(0, 3).map((tag) => (
              <span key={tag.id} className="badge-secondary">
                {tag.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {resource.view_count}
            </span>
            <button
              onClick={handleFavoriteClick}
              className={`flex items-center gap-1 transition-colors ${
                isFavorited ? 'text-red-500' : 'hover:text-red-500'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
              {resource.favorite_count}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

interface ResourceGridProps {
  resources: Resource[]
  onFavorite?: (id: string) => void
  favoriteIds?: Set<string>
}

export function ResourceGrid({ resources, onFavorite, favoriteIds }: ResourceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          onFavorite={onFavorite}
          isFavorited={favoriteIds?.has(resource.id)}
        />
      ))}
    </div>
  )
}
