import { Link } from 'react-router-dom'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { useGeolocationPermission } from '@/hooks/useGeolocationPermission'
import type { GeolocationPermissionState } from '@/hooks/useGeolocationPermission'
import { useMyLocation } from '@/hooks/useMyLocation'
import { LocateIcon, HeartIcon, UserIcon } from '@/components/icons'
import { Seo } from '@/components/Seo'
import { ROUTES } from '@/constants/routes'

const PERMISSION_META: Record<
  GeolocationPermissionState,
  { label: string; badgeClass: string }
> = {
  granted: { label: '허용됨', badgeClass: 'bg-emerald-50 text-emerald-600' },
  denied: { label: '거부됨', badgeClass: 'bg-rose-50 text-rose-600' },
  prompt: { label: '확인 필요', badgeClass: 'bg-amber-50 text-amber-600' },
  unsupported: { label: '미지원', badgeClass: 'bg-slate-100 text-slate-500' },
}

const CARD_CLASS =
  'space-y-3 rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.06)]'

export function MyPage() {
  const favoriteCount = useFavoriteStore((state) => state.favoriteIds.length)
  const permission = useGeolocationPermission()
  const { locate, isLocating, location, error } = useMyLocation()
  const permissionMeta = PERMISSION_META[permission]

  return (
    <div className="space-y-6 px-5 pt-[calc(env(safe-area-inset-top)+2rem)] pb-8">
      <Seo
        title="내 정보 | 피서콕"
        description="위치 권한, 즐겨찾기, 앱 정보를 확인하세요."
        path={ROUTES.MY_PAGE}
        noindex
      />
      <header className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-50 text-sky-500">
          <UserIcon className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900">내 정보</h1>
          <p className="text-sm text-slate-500">피서콕을 더 편하게 써보세요</p>
        </div>
      </header>

      <section className={CARD_CLASS}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LocateIcon className="h-4 w-4 text-slate-400" />
            <h2 className="text-sm font-semibold text-slate-900">위치 권한</h2>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${permissionMeta.badgeClass}`}
          >
            {permissionMeta.label}
          </span>
        </div>
        <p className="text-xs text-slate-500">
          내 주변 한산한 피서지 추천, 이동거리 계산에 사용돼요.
        </p>
        {permission !== 'unsupported' && (
          <button
            type="button"
            onClick={locate}
            disabled={isLocating}
            className="w-full rounded-xl bg-sky-50 py-2.5 text-sm font-medium text-sky-600 disabled:opacity-60"
          >
            {isLocating
              ? '확인 중…'
              : location
                ? '위치 다시 확인하기'
                : '위치 확인하기'}
          </button>
        )}
        {error && <p className="text-xs text-rose-500">{error}</p>}
        {permission === 'denied' && (
          <p className="text-xs text-slate-400">
            브라우저(폰) 설정에서 위치 권한을 허용으로 바꾸면 다시 사용할 수
            있어요.
          </p>
        )}
      </section>

      <Link to={ROUTES.FAVORITES} className={`${CARD_CLASS} block`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartIcon className="h-4 w-4 text-rose-400" />
            <span className="text-sm font-semibold text-slate-900">
              즐겨찾기
            </span>
          </div>
          <span className="text-sm text-slate-500">
            {favoriteCount}곳 저장됨
          </span>
        </div>
      </Link>

      <section className={CARD_CLASS}>
        <h2 className="text-sm font-semibold text-slate-900">제보하기</h2>
        <p className="text-xs text-slate-500">
          혼잡도나 정보 오류를 제보하는 기능은 아직 준비 중이에요. 조금만
          기다려주세요!
        </p>
        <div className="rounded-xl bg-slate-50 py-6 text-center text-xs text-slate-400">
          제보 내역이 없어요
        </div>
      </section>

      <section className={CARD_CLASS}>
        <h2 className="text-sm font-semibold text-slate-900">앱 정보</h2>
        <dl className="space-y-1.5 text-xs text-slate-500">
          <div className="flex justify-between">
            <dt>버전</dt>
            <dd>0.1.0</dd>
          </div>
          <div className="flex justify-between">
            <dt>장소 정보 제공</dt>
            <dd>한국관광공사 TourAPI</dd>
          </div>
          <div className="flex justify-between">
            <dt>지도</dt>
            <dd>카카오맵</dd>
          </div>
        </dl>
        <p className="pt-1 text-xs leading-relaxed text-slate-400">
          예상 혼잡도는 실시간 센서 데이터가 아니라 평소 인기도와 현재 시간대를
          기반으로 추정한 값이에요.
        </p>
      </section>
    </div>
  )
}
