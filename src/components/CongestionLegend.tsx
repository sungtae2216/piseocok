import { CONGESTION_LEVELS, CONGESTION_META } from '@/utils/congestion'

export function CongestionLegend() {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
      {CONGESTION_LEVELS.map((level) => {
        const meta = CONGESTION_META[level]
        return (
          <div key={level} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${meta.dotClass}`} />
            <span className="text-xs text-slate-600">{meta.label}</span>
          </div>
        )
      })}
    </div>
  )
}
