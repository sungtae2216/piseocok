import type { SeoMeta } from '@/types/seo'
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '@/constants/site'

/**
 * React 19은 컴포넌트 트리 어디서든 렌더링된 title/meta/link 태그를
 * 문서 head로 자동으로 끌어올려요. 별도 라이브러리 없이 페이지별 SEO 태그를
 * 처리하기 위해 이 방식을 써요.
 */
export function Seo({
  title,
  description,
  path,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}: SeoMeta) {
  const url = `${SITE_URL}${path}`

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="ko_KR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  )
}
