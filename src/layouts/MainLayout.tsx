import { Outlet } from 'react-router-dom'
import { BottomTabBar } from '@/components/BottomTabBar'

export function MainLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  )
}
