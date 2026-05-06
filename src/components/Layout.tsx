import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  Home,
  Library,
  PlusCircle,
  User,
  Menu,
  X,
  Leaf,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/library', label: '资料库', icon: Library },
  { path: '/publish', label: '发布', icon: PlusCircle },
  { path: '/profile', label: '我的', icon: User },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const { isAuthenticated, user } = useAuthStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gradient">零碳资料库</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.[0] || 'U'}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="btn-secondary">
                    登录
                  </Link>
                  <Link to="/register" className="btn-primary">
                    注册
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white animate-slide-up">
            <nav className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <div className="px-4 py-3 border-t border-gray-100">
              {isAuthenticated ? (
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.[0] || 'U'}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login" className="btn-secondary flex-1">
                    登录
                  </Link>
                  <Link to="/register" className="btn-primary flex-1">
                    注册
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-500" />
              <span className="text-sm text-gray-500">零碳资料库 - 助力碳中和知识传播</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>© 2024 零碳资料库</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
