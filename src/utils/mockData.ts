import type { Resource, Category, Tag } from '@/types'

export const mockCategories: Category[] = [
  { id: '1', name: '政策法规', icon: 'Scale', description: '碳中和相关政策、法规、标准文件', sort_order: 1 },
  { id: '2', name: '研究报告', icon: 'FileText', description: '行业研究报告、白皮书、调研分析', sort_order: 2 },
  { id: '3', name: '技术方案', icon: 'Lightbulb', description: '低碳技术方案、工程案例、技术应用', sort_order: 3 },
  { id: '4', name: '案例分析', icon: 'Building2', description: '企业碳中和实践案例、成功经验', sort_order: 4 },
  { id: '5', name: '生活指南', icon: 'Leaf', description: '低碳生活指南、环保小贴士、绿色消费', sort_order: 5 },
  { id: '6', name: '数据统计', icon: 'BarChart3', description: '碳排放数据、行业统计、趋势分析', sort_order: 6 },
]

export const mockTags: Tag[] = [
  { id: '1', name: '碳中和', usage_count: 156 },
  { id: '2', name: '碳达峰', usage_count: 89 },
  { id: '3', name: '碳交易', usage_count: 67 },
  { id: '4', name: '新能源', usage_count: 134 },
  { id: '5', name: '绿色建筑', usage_count: 45 },
  { id: '6', name: 'ESG', usage_count: 78 },
  { id: '7', name: '清洁能源', usage_count: 92 },
  { id: '8', name: '低碳生活', usage_count: 56 },
  { id: '9', name: '碳足迹', usage_count: 34 },
  { id: '10', name: '可持续发展', usage_count: 88 },
]

export const mockResources: Resource[] = [
  {
    id: '1',
    user_id: '1',
    title: '国家碳达峰碳中和目标政策解读',
    category_id: '1',
    category: mockCategories[0],
    source: '国家发改委',
    link: 'https://example.com/policy1',
    summary: '深入解读国家碳达峰碳中和目标，分析政策背景、主要内容和实施路径，为企业和个人提供行动指南。',
    view_count: 1234,
    favorite_count: 89,
    status: 'published',
    tags: [mockTags[0], mockTags[1]],
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    user_id: '2',
    title: '2024年全球碳中和进展报告',
    category_id: '2',
    category: mockCategories[1],
    source: '国际能源署',
    link: 'https://example.com/report1',
    summary: '本报告全面分析了2024年全球各国碳中和进展情况，包括政策进展、技术创新和市场发展等多个维度。',
    view_count: 892,
    favorite_count: 56,
    status: 'published',
    tags: [mockTags[0], mockTags[5]],
    created_at: '2024-01-14T08:30:00Z',
    updated_at: '2024-01-14T08:30:00Z',
  },
  {
    id: '3',
    user_id: '3',
    title: '企业碳管理最佳实践案例',
    category_id: '4',
    category: mockCategories[3],
    source: '中国低碳联盟',
    summary: '汇集多家领先企业的碳管理实践案例，涵盖碳核算、减排措施、碳交易等关键环节，为企业提供参考。',
    view_count: 567,
    favorite_count: 34,
    status: 'published',
    tags: [mockTags[5], mockTags[2]],
    created_at: '2024-01-13T14:20:00Z',
    updated_at: '2024-01-13T14:20:00Z',
  },
  {
    id: '4',
    user_id: '1',
    title: '新能源汽车技术发展趋势',
    category_id: '3',
    category: mockCategories[2],
    source: '中国汽车工业协会',
    link: 'https://example.com/tech1',
    summary: '分析新能源汽车技术发展趋势，包括电池技术、充电基础设施、智能化等领域的最新进展。',
    view_count: 1456,
    favorite_count: 78,
    status: 'published',
    tags: [mockTags[3], mockTags[6]],
    created_at: '2024-01-12T09:15:00Z',
    updated_at: '2024-01-12T09:15:00Z',
  },
  {
    id: '5',
    user_id: '2',
    title: '低碳生活方式指南',
    category_id: '5',
    category: mockCategories[4],
    source: '生态环境部',
    summary: '提供实用的低碳生活建议，涵盖衣食住行各个方面，帮助公众在日常生活中践行低碳理念。',
    view_count: 2345,
    favorite_count: 156,
    status: 'published',
    tags: [mockTags[7], mockTags[8]],
    created_at: '2024-01-11T16:45:00Z',
    updated_at: '2024-01-11T16:45:00Z',
  },
  {
    id: '6',
    user_id: '3',
    title: '中国碳排放数据统计年鉴2024',
    category_id: '6',
    category: mockCategories[5],
    source: '国家统计局',
    link: 'https://example.com/data1',
    summary: '全面统计中国各行业、各地区的碳排放数据，为政策制定和研究分析提供数据支撑。',
    view_count: 678,
    favorite_count: 45,
    status: 'published',
    tags: [mockTags[8], mockTags[9]],
    created_at: '2024-01-10T11:30:00Z',
    updated_at: '2024-01-10T11:30:00Z',
  },
]

export const hotKeywords = ['碳中和', '碳达峰', '新能源', 'ESG', '绿色金融', '碳交易']

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) return '今天'
  if (days === 1) return '昨天'
  if (days < 7) return `${days}天前`
  if (days < 30) return `${Math.floor(days / 7)}周前`
  if (days < 365) return `${Math.floor(days / 30)}个月前`
  return `${Math.floor(days / 365)}年前`
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
