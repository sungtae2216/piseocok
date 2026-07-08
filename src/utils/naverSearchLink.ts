/** 네이버 통합검색 결과로 바로 연결되는 링크예요. */
export function naverSearchUrl(query: string): string {
  return `https://search.naver.com/search.naver?query=${encodeURIComponent(query)}`
}
