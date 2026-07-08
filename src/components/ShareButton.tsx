import { useState } from 'react'
import { ShareIcon } from '@/components/icons'
import { shareLink, type ShareLinkPayload } from '@/utils/share'

interface ShareButtonProps extends ShareLinkPayload {
  className?: string
  iconClassName?: string
}

export function ShareButton({
  title,
  text,
  url,
  className = 'flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm',
  iconClassName = 'h-5 w-5',
}: ShareButtonProps) {
  const [toast, setToast] = useState<'copied' | 'failed' | null>(null)

  const handleShare = async () => {
    const result = await shareLink({ title, text, url })
    if (result === 'shared') return
    setToast(result)
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleShare}
        aria-label="공유하기"
        className={className}
      >
        <ShareIcon className={iconClassName} />
      </button>
      {toast && (
        <span className="absolute top-full right-0 mt-1.5 max-w-[200px] rounded-xl bg-slate-900/90 px-3 py-1.5 text-xs whitespace-nowrap text-white shadow-md">
          {toast === 'copied'
            ? '링크가 복사되었어요'
            : '공유에 실패했어요. 잠시 후 다시 시도해주세요.'}
        </span>
      )}
    </div>
  )
}
