import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, SortAsc, Grid, List } from 'lucide-react'
import { Layout } from '@/components/Layout'
import { SearchBar } from '@/components/SearchBar'
import { ResourceGrid } from '@/components/ResourceCard'
import { mockCategories, mockResources, mockTags } from '@/utils/mockData'
import type { Resource } from '@/types'

type SortType = 'latest' | 'popular' | 'favorites'
type ViewMode = 'grid' | 'list'

export function LibraryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())
  const [sortType, setSortType] = useState<SortType>('latest')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const categoryFilter = searchParams.get('category')
  const tagFilter = searchParams.get('tag')
  const keywordFilter = searchParams.get('keyword')

  const filteredResources = useMemo(() => {
    let result = [...mockResources]

    if (categoryFilter) {
      result = result.filter((r) => r.category_id === categoryFilter)
    }

    if (tagFilter) {
      result = result.filter((r) => r.tags.some((t) => t.id === tagFilter))
    }

    if (keywordFilter) {
      const keyword = keywordFilter.toLowerCase()
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(keyword) ||
          r.summary.toLowerCase().includes(keyword) ||
          r.tags.some((t) => t.name.toLowerCase().includes(keyword))
      )
    }

    switch (sortType) {
      case 'popular':
        result.sort((a, b) => b.view_count - a.view_count)
        break
      case 'favorites':
        result.sort((a, b) => b.favorite_count - a.favorite_count)
        break
      case 'latest':
      default:
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }

    return result
  }, [categoryFilter, tagFilter, keywordFilter, sortType])

  const handleSearch = (keyword: string) => {
    const params = new URLSearchParams(searchParams)
    if (keyword) {
      params.set('keyword', keyword)
    } else {
      params.delete('keyword')
    }
    setSearchParams(params)
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

  const handleCategoryChange = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (categoryId) {
      params.set('category', categoryId)
    } else {
      params.delete('category')
    }
    setSearchParams(params)
  }

  const activeCategory = mockCategories.find((c) => c.id === categoryFilter)
  const activeTag = mockTags.find((t) => t.id === tagFilter)

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">资料库</h1>
        <SearchBar onSearch={handleSearch} showHotKeywords={false} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-64 flex-shrink-0">
          <div className="card p-4 sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-900">筛选</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">分类</label>
                <select
                  value={categoryFilter || ''}
                  onChange={(e) => handleCategoryChange(e.target.value || null)}
                  className="input text-sm"
                >
                  <option value="">全部分类</option>
                  {mockCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">标签</label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => {
                      const params = new URLSearchParams(searchParams)
                      params.delete('tag')
                      setSearchParams(params)
                    }}
                    className={`px-2 py-1 text-xs rounded-full transition-colors ${
                      !tagFilter
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    全部
                  </button>
                  {mockTags.slice(0, 8).map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams)
                        params.set('tag', tag.id)
                        setSearchParams(params)
                      }}
                      className={`px-2 py-1 text-xs rounded-full transition-colors ${
                        tagFilter === tag.id
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {(activeCategory || activeTag || keywordFilter) && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">筛选条件：</span>
                  {activeCategory && (
                    <span className="badge-primary">{activeCategory.name}</span>
                  )}
                  {activeTag && (
                    <span className="badge-secondary">{activeTag.name}</span>
                  )}
                  {keywordFilter && (
                    <span className="badge bg-gray-100 text-gray-700">"{keywordFilter}"</span>
                  )}
                  <button
                    onClick={() => setSearchParams(new URLSearchParams())}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    清除
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSortType('latest')}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    sortType === 'latest'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  最新
                </button>
                <button
                  onClick={() => setSortType('popular')}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    sortType === 'popular'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  热门
                </button>
                <button
                  onClick={() => setSortType('favorites')}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    sortType === 'favorites'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  收藏
                </button>
              </div>

              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {filteredResources.length > 0 ? (
            <ResourceGrid
              resources={filteredResources}
              onFavorite={handleFavorite}
              favoriteIds={favoriteIds}
            />
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <SortAsc className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无相关资料</h3>
              <p className="text-gray-500">尝试调整筛选条件或搜索其他关键词</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
