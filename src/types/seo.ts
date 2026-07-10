export interface SeoMeta {
  title: string
  description: string
  /** SITE_URL 기준 상대 경로. 예: '/quiet-beaches' */
  path: string
  ogType?: 'website' | 'article'
  ogImage?: string
  noindex?: boolean
}
