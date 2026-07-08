import type { CongestionLevel } from '@/types/spot'
import { CONGESTION_META } from '@/utils/congestion'

interface CongestionBadgeProps {
  level: CongestionLevel
}

export function CongestionBadge({ level }: CongestionBadgeProps) {
  const meta = CONGESTION_META[level]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${meta.badgeClass}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dotClass}`} />
      {meta.label}
    </span>
  )
}
