import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { hotKeywords } from '@/utils/mockData'

interface SearchBarProps {
  onSearch: (keyword: string) => void
  placeholder?: string
  showHotKeywords?: boolean
}

export function SearchBar({ onSearch, placeholder = '搜索零碳资料...', showHotKeywords = true }: SearchBarProps) {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (keyword.trim()) {
      onSearch(keyword.trim())
    }
  }

  const handleClear = () => {
    setKeyword('')
  }

  const handleHotKeywordClick = (kw: string) => {
    setKeyword(kw)
    onSearch(kw)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
          />
          {keyword && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </form>

      {showHotKeywords && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-400">热门搜索：</span>
          {hotKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => handleHotKeywordClick(kw)}
              className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
            >
              {kw}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
