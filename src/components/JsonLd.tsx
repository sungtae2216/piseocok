interface JsonLdProps {
  data: Record<string, unknown>
}

/** Schema.org 구조화 데이터를 script 태그로 렌더링해요. body 어디에 있어도 검색엔진이 인식해요. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
