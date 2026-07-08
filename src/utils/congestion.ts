import type { CongestionLevel, Spot } from '@/types/spot'

interface CongestionMeta {
  label: string
  dotClass: string
  badgeClass: string
}

export const CONGESTION_META: Record<CongestionLevel, CongestionMeta> = {
  low: {
    label: '여유',
    dotClass: 'bg-congestion-low',
    badgeClass: 'bg-congestion-low/10 text-congestion-low',
  },
  medium: {
    label: '보통',
    dotClass: 'bg-congestion-medium',
    badgeClass: 'bg-congestion-medium/10 text-congestion-medium',
  },
  high: {
    label: '혼잡',
    dotClass: 'bg-congestion-high',
    badgeClass: 'bg-congestion-high/10 text-congestion-high',
  },
  severe: {
    label: '매우혼잡',
    dotClass: 'bg-congestion-severe',
    badgeClass: 'bg-congestion-severe/10 text-congestion-severe',
  },
}

export const CONGESTION_LEVELS: CongestionLevel[] = [
  'low',
  'medium',
  'high',
  'severe',
]

/** 지도 위에 원형 오버레이를 그릴 때 쓰는 실제 색상값 (index.css의 --color-congestion-*와 동일) */
export const CONGESTION_HEX: Record<CongestionLevel, string> = {
  low: '#22c55e',
  medium: '#eab308',
  high: '#f97316',
  severe: '#ef4444',
}

const BASE_POPULARITY_SCORE: Record<CongestionLevel, number> = {
  low: 0.15,
  medium: 0.35,
  high: 0.55,
  severe: 0.75,
}

function hashToUnitFloat(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return (Math.abs(hash) % 100) / 100
}

/**
 * 시간대별로 사람들이 실제로 야외 활동을 하고 있을 가능성을 0~1 배율로 표현해요.
 * 심야·새벽에는 아무리 인기 있는 곳이라도 방문객이 거의 없다는 걸 반영하기 위해
 * 곱셈 배율로 적용해요 (덧셈 가중치로는 심야에도 인기도가 안 꺾여서 부자연스러웠어요).
 */
function getTimeActivityFactor(hour: number): number {
  if (hour >= 11 && hour <= 16) return 1 // 한낮 피크
  if (hour >= 9 && hour < 11) return 0.7 // 오전
  if (hour >= 16 && hour < 19) return 0.75 // 늦은 오후
  if (hour >= 7 && hour < 9) return 0.4 // 이른 아침
  if (hour >= 19 && hour < 21) return 0.4 // 초저녁
  if (hour >= 21 && hour < 23) return 0.15 // 밤
  return 0.03 // 심야·새벽 (23시~7시)
}

/**
 * 실제 재실 인원 센서 데이터가 없어, 장소별 평소 인기도(basePopularity)에
 * 현재 시간대 활동 배율·요일 배율을 곱해 0~1 사이의 혼잡 점수를 추정해요.
 * 실시간 관측값이 아니라 "예상치"라는 점을 화면에도 함께 표기해주세요.
 */
export function getCongestionScore(
  spot: Pick<Spot, 'id' | 'basePopularity'>,
  now: Date = new Date(),
): number {
  const hour = now.getHours()
  const day = now.getDay() // 0(일) ~ 6(토)
  const isWeekend = day === 0 || day === 6 || (day === 5 && hour >= 17)

  const jitter =
    (hashToUnitFloat(`${spot.id}-${now.toISOString().slice(0, 10)}`) - 0.5) *
    0.1

  const score =
    BASE_POPULARITY_SCORE[spot.basePopularity] *
      getTimeActivityFactor(hour) *
      (isWeekend ? 1.25 : 1) +
    jitter

  return Math.min(1, Math.max(0, score))
}

export function levelFromScore(score: number): CongestionLevel {
  if (score >= 0.6) return 'severe'
  if (score >= 0.4) return 'high'
  if (score >= 0.2) return 'medium'
  return 'low'
}

export function estimateCongestion(
  spot: Pick<Spot, 'id' | 'basePopularity'>,
  now: Date = new Date(),
): CongestionLevel {
  return levelFromScore(getCongestionScore(spot, now))
}
