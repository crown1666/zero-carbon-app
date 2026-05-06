export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  created_at: string
}

export interface Category {
  id: string
  name: string
  icon: string
  description: string
  sort_order: number
}

export interface Tag {
  id: string
  name: string
  usage_count: number
}

export interface Resource {
  id: string
  user_id: string
  title: string
  category_id: string
  category?: Category
  source: string
  link?: string
  summary: string
  file_url?: string
  view_count: number
  favorite_count: number
  status: 'published' | 'draft'
  tags: Tag[]
  created_at: string
  updated_at: string
  user?: User
}

export interface Favorite {
  id: string
  user_id: string
  resource_id: string
  resource?: Resource
  created_at: string
}

export interface ResourceQuery {
  category?: string
  tag?: string
  keyword?: string
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}
