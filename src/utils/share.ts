export interface ShareLinkPayload {
  title: string
  text?: string
  url: string
}

export type ShareResult = 'shared' | 'copied' | 'failed'

function legacyCopy(text: string): boolean {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }
  document.body.removeChild(textarea)
  return ok
}

export async function shareLink(payload: ShareLinkPayload): Promise<ShareResult> {
  if (navigator.share) {
    try {
      await navigator.share(payload)
      return 'shared'
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return 'shared'
    }
  }

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(payload.url)
      return 'copied'
    } catch {
      // fall through to legacy copy
    }
  }

  return legacyCopy(payload.url) ? 'copied' : 'failed'
}
