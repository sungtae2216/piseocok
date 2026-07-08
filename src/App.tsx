import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { MapPage } from '@/pages/MapPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { MyPage } from '@/pages/MyPage'
import { SpotDetailPage } from '@/pages/SpotDetailPage'
import { SpotsPage } from '@/pages/SpotsPage'
import { RankingPage } from '@/pages/RankingPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.MAP} element={<MapPage />} />
        <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
        <Route path={ROUTES.MY_PAGE} element={<MyPage />} />
      </Route>
      <Route path={ROUTES.SPOT_DETAIL} element={<SpotDetailPage />} />
      <Route path={ROUTES.SPOTS} element={<SpotsPage />} />
      <Route path={ROUTES.RANKING} element={<RankingPage />} />
    </Routes>
  )
}

export default App
