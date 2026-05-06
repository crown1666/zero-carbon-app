import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Link as LinkIcon, Tag, FileText, CheckCircle } from 'lucide-react'
import { Layout } from '@/components/Layout'
import { mockCategories, mockTags } from '@/utils/mockData'
import { useAuthStore } from '@/store/authStore'

export function PublishPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    source: '',
    link: '',
    tags: [] as string[],
    summary: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setShowSuccess(true)

    setTimeout(() => {
      navigate('/library')
    }, 2000)
  }

  const handleTagToggle = (tagName: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagName)
        ? prev.tags.filter((t) => t !== tagName)
        : [...prev.tags, tagName],
    }))
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
            <FileText className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">请先登录</h2>
          <p className="text-gray-500 mb-6">登录后即可发布资料</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => navigate('/login')} className="btn-secondary">
              登录
            </button>
            <button onClick={() => navigate('/register')} className="btn-primary">
              注册
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  if (showSuccess) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center py-16 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">发布成功！</h2>
          <p className="text-gray-500">正在跳转到资料库...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">发布资料</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card p-6">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-500" />
              基本信息
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  资料标题 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="请输入资料标题"
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  资料分类 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input"
                  required
                >
                  <option value="">请选择分类</option>
                  {mockCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  资料来源 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  placeholder="如：国家发改委、国际能源署等"
                  className="input"
                  required
                />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-blue-500" />
              资料链接
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  原文链接
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://example.com/article"
                  className="input"
                />
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-emerald-300 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">点击或拖拽上传文件</p>
                <p className="text-xs text-gray-400 mt-1">支持 PDF、Word、Excel 等格式</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-amber-500" />
              标签与摘要
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  标签
                </label>
                <div className="flex flex-wrap gap-2">
                  {mockTags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => handleTagToggle(tag.name)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ${
                        formData.tags.includes(tag.name)
                          ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500/20'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  资料摘要 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="请简要描述资料内容，方便其他用户快速了解..."
                  className="input min-h-[120px] resize-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary min-w-[100px]"
            >
              {isSubmitting ? '发布中...' : '发布资料'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
