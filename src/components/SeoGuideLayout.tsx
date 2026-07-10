import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { JsonLd } from '@/components/JsonLd'
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  type BreadcrumbItem,
  type FaqItem,
} from '@/utils/schema'

interface RelatedLink {
  label: string
  to: string
}

interface SeoGuideLayoutProps {
  eyebrow: string
  h1: string
  body: ReactNode
  faq: FaqItem[]
  breadcrumb: BreadcrumbItem[]
  relatedLinks: RelatedLink[]
  disclaimer: ReactNode
}

/** 카드 목록 없이 설명형 콘텐츠(가이드)로 구성되는 SEO 페이지용 레이아웃이에요. */
export function SeoGuideLayout({
  eyebrow,
  h1,
  body,
  faq,
  breadcrumb,
  relatedLinks,
  disclaimer,
}: SeoGuideLayoutProps) {
  return (
    <div className="space-y-8 px-5 pt-[calc(env(safe-area-inset-top)+1.75rem)] pb-10">
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumb)} />
      {faq.length > 0 && <JsonLd data={buildFaqJsonLd(faq)} />}

      <header className="space-y-2">
        <p className="text-xs font-semibold text-sky-500">{eyebrow}</p>
        <h1 className="text-2xl leading-tight font-bold text-slate-900">
          {h1}
        </h1>
      </header>

      <article className="space-y-4 text-sm leading-relaxed text-slate-700">
        {body}
      </article>

      {faq.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-slate-900">
            자주 묻는 질문
          </h2>
          <div className="space-y-3">
            {faq.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl bg-slate-50 p-4"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {item.question}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {relatedLinks.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-900">
            함께 보면 좋은 페이지
          </h2>
          <ul className="space-y-1.5">
            {relatedLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm font-medium text-sky-600 underline underline-offset-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-xs leading-relaxed text-slate-400">{disclaimer}</p>
    </div>
  )
}
