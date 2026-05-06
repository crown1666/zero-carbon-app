import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Heart, Eye, Share2, ExternalLink, Calendar, User } from 'lucide-react'
import { Layout } from '@/components/Layout'
import { ResourceGrid } from '@/components/ResourceCard'
import { mockResources } from '@/utils/mockData'
import { formatDate } from '@/utils/mockData'
import { useState } from 'react'

export function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [isFavorited, setIsFavorited] = useState(false)
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())

  const resource = mockResources.find((r) => r.id === id)

  if (!resource) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h2 className="text-xl font-bold text-gray-900 mb-2">资料不存在</h2>
          <p className="text-gray-500 mb-4">该资料可能已被删除或链接错误</p>
          <Link to="/library" className="btn-primary">
            返回资料库
          </Link>
        </div>
      </Layout>
    )
  }

  const relatedResources = mockResources
    .filter((r) => r.id !== id && r.category_id === resource.category_id)
    .slice(0, 3)

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
  }

  const handleRelatedFavorite = (resId: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev)
      if (next.has(resId)) {
        next.delete(resId)
      } else {
        next.add(resId)
      }
      return next
    })
  }

  return (
    <Layout>
      <div className="mb-6">
        <Link
          to="/library"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回资料库
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2">
          <div className="card p-6 sm:p-8">
            <header className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge-primary">{resource.category?.name}</span>
                {resource.tags.map((tag) => (
                  <span key={tag.id} className="badge-secondary">
                    {tag.name}
                  </span>
                ))}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {resource.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(resource.created_at)}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {resource.source}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {resource.view_count} 次浏览
                </span>
              </div>
            </header>

            <div className="prose prose-emerald max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed">{resource.summary}</p>
              <p className="text-gray-700 leading-relaxed mt-4">
                这是资料的详细内容区域。在实际应用中，这里会显示完整的资料内容，包括文字、图片、表格等。
                用户可以在这里阅读和学习零碳相关的知识和信息。
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                资料内容会根据不同的分类和主题有所不同。例如，政策法规模块会包含具体的政策条文和解读；
                研究报告会包含数据分析和结论；技术方案会包含具体的实施步骤和技术细节。
              </p>
            </div>

            {resource.link && (
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                查看原文
              </a>
            )}
          </div>

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleFavorite}
              className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                isFavorited
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              {isFavorited ? '已收藏' : '收藏'}
            </button>
            <button className="flex-1 py-3 rounded-xl font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              分享
            </button>
          </div>
        </article>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 mb-4">资料信息</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">分类</dt>
                  <dd className="text-gray-900 font-medium">{resource.category?.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">来源</dt>
                  <dd className="text-gray-900 font-medium">{resource.source}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">浏览量</dt>
                  <dd className="text-gray-900 font-medium">{resource.view_count}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">收藏量</dt>
                  <dd className="text-gray-900 font-medium">{resource.favorite_count}</dd>
                </div>
              </dl>
            </div>

            {relatedResources.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">相关推荐</h3>
                <ResourceGrid
                  resources={relatedResources}
                  onFavorite={handleRelatedFavorite}
                  favoriteIds={favoriteIds}
                />
              </div>
            )}
          </div>
        </aside>
      </div>
    </Layout>
  )
}
