import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, FileText, TrendingUp, Settings, LogOut, Bookmark } from 'lucide-react'
import { Layout } from '@/components/Layout'
import { ResourceGrid } from '@/components/ResourceCard'
import { mockResources } from '@/utils/mockData'
import { useAuthStore } from '@/store/authStore'

type TabType = 'favorites' | 'published'

export function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState<TabType>('favorites')
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set(['1', '3', '5']))

  const myPublishedResources = mockResources.slice(0, 2)
  const myFavoriteResources = mockResources.filter((r) => favoriteIds.has(r.id))

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

  const handleLogout = () => {
    logout()
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Settings className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">请先登录</h2>
          <p className="text-gray-500 mb-6">登录后即可查看个人中心</p>
          <div className="flex justify-center gap-3">
            <Link to="/login" className="btn-secondary">
              登录
            </Link>
            <Link to="/register" className="btn-primary">
              注册
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{user?.name || '用户'}</h1>
              <p className="text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              退出登录
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card p-5 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-red-50 flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{favoriteIds.size}</div>
            <div className="text-sm text-gray-500">收藏数</div>
          </div>
          <div className="card p-5 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-emerald-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{myPublishedResources.length}</div>
            <div className="text-sm text-gray-500">发布数</div>
          </div>
          <div className="card p-5 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-blue-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {myPublishedResources.reduce((sum, r) => sum + r.view_count, 0)}
            </div>
            <div className="text-sm text-gray-500">总浏览</div>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'favorites'
                  ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              我的收藏
            </button>
            <button
              onClick={() => setActiveTab('published')}
              className={`flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'published'
                  ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              我的发布
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'favorites' && (
              <div>
                {myFavoriteResources.length > 0 ? (
                  <ResourceGrid
                    resources={myFavoriteResources}
                    onFavorite={handleFavorite}
                    favoriteIds={favoriteIds}
                  />
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-500">暂无收藏的资料</p>
                    <Link to="/library" className="btn-primary mt-4 inline-flex">
                      去发现资料
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'published' && (
              <div>
                {myPublishedResources.length > 0 ? (
                  <ResourceGrid
                    resources={myPublishedResources}
                    onFavorite={handleFavorite}
                    favoriteIds={favoriteIds}
                  />
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-500">暂无发布的资料</p>
                    <Link to="/publish" className="btn-primary mt-4 inline-flex">
                      发布资料
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
