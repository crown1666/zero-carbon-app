import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Clock, Sparkles } from 'lucide-react'
import { Layout } from '@/components/Layout'
import { SearchBar } from '@/components/SearchBar'
import { CategoryGrid } from '@/components/CategoryCard'
import { ResourceGrid } from '@/components/ResourceCard'
import { TagCloud } from '@/components/TagCloud'
import { mockCategories, mockResources, mockTags } from '@/utils/mockData'

export function HomePage() {
  const navigate = useNavigate()
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())

  const handleSearch = (keyword: string) => {
    navigate(`/library?keyword=${encodeURIComponent(keyword)}`)
  }

  const handleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const latestResources = mockResources.slice(0, 3)
  const popularResources = [...mockResources].sort((a, b) => b.view_count - a.view_count).slice(0, 3)

  return (
    <Layout>
      <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 mb-8 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-gradient">零碳资料库</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            搜集、整理、分享碳中和知识，助力绿色低碳发展
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">资料分类</h2>
        </div>
        <CategoryGrid categories={mockCategories} />
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-emerald-500" />
          <h2 className="text-xl font-bold text-gray-900">热门推荐</h2>
        </div>
        <ResourceGrid
          resources={popularResources}
          onFavorite={handleFavorite}
          favoriteIds={favoriteIds}
        />
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-bold text-gray-900">最新发布</h2>
        </div>
        <ResourceGrid
          resources={latestResources}
          onFavorite={handleFavorite}
          favoriteIds={favoriteIds}
        />
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-bold text-gray-900">热门标签</h2>
        </div>
        <TagCloud tags={mockTags} />
      </section>
    </Layout>
  )
}
