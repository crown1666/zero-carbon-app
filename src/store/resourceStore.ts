import { create } from 'zustand'
import type { Resource, Category, Tag } from '@/types'

interface ResourceState {
  resources: Resource[]
  categories: Category[]
  tags: Tag[]
  currentResource: Resource | null
  loading: boolean
  setResources: (resources: Resource[]) => void
  setCategories: (categories: Category[]) => void
  setTags: (tags: Tag[]) => void
  setCurrentResource: (resource: Resource | null) => void
  setLoading: (loading: boolean) => void
  addResource: (resource: Resource) => void
  updateResource: (id: string, resource: Partial<Resource>) => void
  removeResource: (id: string) => void
}

export const useResourceStore = create<ResourceState>((set) => ({
  resources: [],
  categories: [],
  tags: [],
  currentResource: null,
  loading: false,
  setResources: (resources) => set({ resources }),
  setCategories: (categories) => set({ categories }),
  setTags: (tags) => set({ tags }),
  setCurrentResource: (resource) => set({ currentResource: resource }),
  setLoading: (loading) => set({ loading }),
  addResource: (resource) => set((state) => ({ resources: [resource, ...state.resources] })),
  updateResource: (id, updated) => set((state) => ({
    resources: state.resources.map((r) => (r.id === id ? { ...r, ...updated } : r)),
  })),
  removeResource: (id) => set((state) => ({
    resources: state.resources.filter((r) => r.id !== id),
  })),
}))
