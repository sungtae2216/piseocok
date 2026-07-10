import { statSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { MOCK_SPOTS } from '../src/apis/mockSpots'
import { SITE_URL } from '../src/constants/site'
import { spotDetailPath } from '../src/constants/routes'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

interface UrlEntry {
  loc: string
  lastmodSourceFile: string
  changefreq: 'daily' | 'weekly' | 'monthly'
  priority: number
}

function mtimeOf(relativeFile: string): string {
  const stat = statSync(path.join(ROOT, relativeFile))
  return stat.mtime.toISOString().slice(0, 10)
}

const STATIC_ENTRIES: UrlEntry[] = [
  {
    loc: '/',
    lastmodSourceFile: 'src/pages/HomePage.tsx',
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    loc: '/spots',
    lastmodSourceFile: 'src/pages/SpotsPage.tsx',
    changefreq: 'daily',
    priority: 0.8,
  },
  {
    loc: '/ranking',
    lastmodSourceFile: 'src/pages/RankingPage.tsx',
    changefreq: 'daily',
    priority: 0.7,
  },
  {
    loc: '/map',
    lastmodSourceFile: 'src/pages/MapPage.tsx',
    changefreq: 'weekly',
    priority: 0.6,
  },
  {
    loc: '/quiet-beaches',
    lastmodSourceFile: 'src/pages/seo/QuietBeachesPage.tsx',
    changefreq: 'daily',
    priority: 0.7,
  },
  {
    loc: '/quiet-valleys',
    lastmodSourceFile: 'src/pages/seo/QuietValleysPage.tsx',
    changefreq: 'daily',
    priority: 0.7,
  },
  {
    loc: '/near-seoul',
    lastmodSourceFile: 'src/pages/seo/NearSeoulPage.tsx',
    changefreq: 'daily',
    priority: 0.7,
  },
  {
    loc: '/family',
    lastmodSourceFile: 'src/pages/seo/FamilyPage.tsx',
    changefreq: 'weekly',
    priority: 0.6,
  },
  {
    loc: '/parking-easy',
    lastmodSourceFile: 'src/pages/seo/ParkingEasyPage.tsx',
    changefreq: 'weekly',
    priority: 0.6,
  },
  {
    loc: '/regions/busan',
    lastmodSourceFile: 'src/pages/seo/BusanRegionPage.tsx',
    changefreq: 'daily',
    priority: 0.7,
  },
  {
    loc: '/regions/gangwon',
    lastmodSourceFile: 'src/pages/seo/GangwonRegionPage.tsx',
    changefreq: 'daily',
    priority: 0.7,
  },
  {
    loc: '/regions/jeju',
    lastmodSourceFile: 'src/pages/seo/JejuRegionPage.tsx',
    changefreq: 'daily',
    priority: 0.7,
  },
  {
    loc: '/guide/best-time',
    lastmodSourceFile: 'src/pages/seo/GuideBestTimePage.tsx',
    changefreq: 'monthly',
    priority: 0.5,
  },
  {
    loc: '/guide/crowding',
    lastmodSourceFile: 'src/pages/seo/GuideCrowdingPage.tsx',
    changefreq: 'monthly',
    priority: 0.5,
  },
]

function buildXml(): string {
  const spotLastmod = mtimeOf('src/apis/mockSpots.ts')

  const entries = [
    ...STATIC_ENTRIES.map((entry) => ({
      loc: entry.loc,
      lastmod: mtimeOf(entry.lastmodSourceFile),
      changefreq: entry.changefreq,
      priority: entry.priority,
    })),
    ...MOCK_SPOTS.map((spot) => ({
      loc: spotDetailPath(spot.id),
      lastmod: spotLastmod,
      changefreq: 'weekly' as const,
      priority: 0.6,
    })),
  ]

  const urlTags = entries
    .map(
      (entry) => `  <url>
    <loc>${SITE_URL}${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlTags}\n</urlset>\n`
}

const xml = buildXml()
writeFileSync(path.join(ROOT, 'public/sitemap.xml'), xml, 'utf-8')
console.log(
  `sitemap.xml 생성 완료 (${xml.match(/<url>/g)?.length ?? 0}개 URL)`,
)
