import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Spot } from '@/types/spot'
import { SpotCard } from '@/components/SpotCard'
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

interface SeoLandingLayoutProps {
  eyebrow: string
  h1: string
  intro: ReactNode
  spots: Spot[]
  spotsHeading: string
  emptyMessage?: string
  faq: FaqItem[]
  breadcrumb: BreadcrumbItem[]
  relatedLinks: RelatedLink[]
  disclaimer: ReactNode
}

export function SeoLandingLayout({
  eyebrow,
  h1,
  intro,
  spots,
  spotsHeading,
  emptyMessage = '조건에 맞는 장소를 찾는 중이에요.',
  faq,
  breadcrumb,
  relatedLinks,
  disclaimer,
}: SeoLandingLayoutProps) {
  return (
    <div className="space-y-8 px-5 pt-[calc(env(safe-area-inset-top)+1.75rem)] pb-10">
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumb)} />
      {faq.length > 0 && <JsonLd data={buildFaqJsonLd(faq)} />}

      <header className="space-y-2">
        <p className="text-xs font-semibold text-sky-500">{eyebrow}</p>
        <h1 className="text-2xl leading-tight font-bold text-slate-900">
          {h1}
        </h1>
        <div className="space-y-2 text-sm leading-relaxed text-slate-600">
          {intro}
        </div>
      </header>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-900">
          {spotsHeading}
        </h2>
        {spots.length === 0 ? (
          <p className="text-sm text-slate-400">{emptyMessage}</p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {spots.map((spot) => (
              <SpotCard key={spot.id} spot={spot} />
            ))}
          </div>
        )}
      </section>

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
