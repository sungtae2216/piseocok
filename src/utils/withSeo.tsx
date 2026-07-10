import type { ComponentType } from 'react'
import { Seo } from '@/components/Seo'
import type { SeoMeta } from '@/types/seo'

/**
 * 정적 콘텐츠 컴포넌트에 Seo 태그를 씌워 라우트의 기본 export로 써요.
 * prerender 스크립트는 Content만 따로 가져다 렌더링하고, seoMeta는 별도로 읽어서
 * head를 직접 구성하기 때문에 이렇게 분리해뒀어요.
 */
export function withSeo(Content: ComponentType, seoMeta: SeoMeta) {
  return function PageWithSeo() {
    return (
      <>
        <Seo {...seoMeta} />
        <Content />
      </>
    )
  }
}
