import { NavLink } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { HomeIcon, MapIcon, HeartIcon, UserIcon } from '@/components/icons'
import type { ComponentType, SVGProps } from 'react'

interface TabItem {
  to: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  end?: boolean
}

const TAB_ITEMS: TabItem[] = [
  { to: ROUTES.HOME, label: 'Home', icon: HomeIcon, end: true },
  { to: ROUTES.MAP, label: '지도', icon: MapIcon },
  { to: ROUTES.FAVORITES, label: '즐겨찾기', icon: HeartIcon },
  { to: ROUTES.MY_PAGE, label: '내정보', icon: UserIcon },
]

export function BottomTabBar() {
  return (
    <nav className="sticky bottom-0 flex border-t border-slate-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      {TAB_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs ${
              isActive ? 'text-sky-500' : 'text-slate-400'
            }`
          }
        >
          <Icon className="h-5 w-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
