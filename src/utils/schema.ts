import { SITE_NAME, SITE_URL } from '@/constants/site'

export interface BreadcrumbItem {
  name: string
  path: string
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export interface FaqItem {
  question: string
  answer: string
}

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export interface TouristAttractionJsonLdInput {
  name: string
  description: string
  path: string
  imageUrl: string
  address: string
  lat: number
  lng: number
}

export function buildTouristAttractionJsonLd({
  name,
  description,
  path,
  imageUrl,
  address,
  lat,
  lng,
}: TouristAttractionJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name,
    description,
    url: `${SITE_URL}${path}`,
    image: imageUrl,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressLocality: address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: lat,
      longitude: lng,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}
