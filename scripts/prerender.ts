/**
 * vite build 이후에 실행돼요. SEO 랜딩/가이드/지역 페이지는 브라우저 API(카카오맵,
 * 위치 정보)에 의존하지 않는 정적 콘텐츠라 Node에서 안전하게 미리 렌더링할 수 있어요.
 * 결과물은 dist/<route>/index.html로 저장되고, Vercel은 정적 파일을 rewrite보다
 * 우선 서빙하므로 검색봇이 JS 실행 없이도 title/설명/본문을 그대로 읽을 수 있어요.
 *
 * 홈/지도/상세페이지처럼 카카오맵·위치 정보에 의존하는 페이지는 여기서 다루지
 * 않아요 (Node 환경에서 안전하게 렌더링하기 어려워서 클라이언트 렌더링 + Seo
 * 컴포넌트의 head 태그 삽입으로만 대응해요).
 */

// zustand persist가 store 생성 시점에 localStorage를 참조하므로, 앱 모듈을
// 불러오기 전에 최소한의 메모리 폴리필을 먼저 준비해요.
const memoryStorage = new Map<string, string>()
;(globalThis as Record<string, unknown>).localStorage = {
  getItem: (key: string) => memoryStorage.get(key) ?? null,
  setItem: (key: string, value: string) => {
    memoryStorage.set(key, value)
  },
  removeItem: (key: string) => {
    memoryStorage.delete(key)
  },
}

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')

async function loadPages() {
  const [
    quietBeaches,
    quietValleys,
    nearSeoul,
    family,
    parkingEasy,
    busan,
    gangwon,
    jeju,
    guideBestTime,
    guideCrowding,
    seoRoutesMeta,
    site,
  ] = await Promise.all([
    import('../src/pages/seo/QuietBeachesPage'),
    import('../src/pages/seo/QuietValleysPage'),
    import('../src/pages/seo/NearSeoulPage'),
    import('../src/pages/seo/FamilyPage'),
    import('../src/pages/seo/ParkingEasyPage'),
    import('../src/pages/seo/BusanRegionPage'),
    import('../src/pages/seo/GangwonRegionPage'),
    import('../src/pages/seo/JejuRegionPage'),
    import('../src/pages/seo/GuideBestTimePage'),
    import('../src/pages/seo/GuideCrowdingPage'),
    import('../src/content/seoRoutesMeta'),
    import('../src/constants/site'),
  ])

  const pages = [
    { module: quietBeaches, seoMeta: seoRoutesMeta.quietBeachesSeoMeta },
    { module: quietValleys, seoMeta: seoRoutesMeta.quietValleysSeoMeta },
    { module: nearSeoul, seoMeta: seoRoutesMeta.nearSeoulSeoMeta },
    { module: family, seoMeta: seoRoutesMeta.familySeoMeta },
    { module: parkingEasy, seoMeta: seoRoutesMeta.parkingEasySeoMeta },
    { module: busan, seoMeta: seoRoutesMeta.busanRegionSeoMeta },
    { module: gangwon, seoMeta: seoRoutesMeta.gangwonRegionSeoMeta },
    { module: jeju, seoMeta: seoRoutesMeta.jejuRegionSeoMeta },
    { module: guideBestTime, seoMeta: seoRoutesMeta.guideBestTimeSeoMeta },
    { module: guideCrowding, seoMeta: seoRoutesMeta.guideCrowdingSeoMeta },
  ]

  return { pages, site }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

async function main() {
  const template = readFileSync(path.join(DIST, 'index.html'), 'utf-8')
  const { pages, site } = await loadPages()
  const { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } = site

  for (const { module: pageModule, seoMeta } of pages) {
    const { Content } = pageModule as { Content: React.ComponentType }

    const bodyHtml = renderToStaticMarkup(
      React.createElement(
        MemoryRouter,
        { initialEntries: [seoMeta.path] },
        React.createElement(Content),
      ),
    )

    const url = `${SITE_URL}${seoMeta.path}`
    const ogImage = seoMeta.ogImage ?? DEFAULT_OG_IMAGE
    const title = escapeHtml(seoMeta.title)
    const description = escapeHtml(seoMeta.description)

    const headExtra = `
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:locale" content="ko_KR" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImage}" />
  </head>`

    const html = template
      .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      .replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
        `<meta name="description" content="${description}" />`,
      )
      .replace('</head>', headExtra)
      .replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`)

    const outDir = path.join(DIST, seoMeta.path)
    mkdirSync(outDir, { recursive: true })
    writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8')
  }

  console.log(`정적 프리렌더 완료 (${pages.length}개 페이지)`)
}

main()
