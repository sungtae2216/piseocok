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
import QuietBeachesPage from '@/pages/seo/QuietBeachesPage'
import QuietValleysPage from '@/pages/seo/QuietValleysPage'
import NearSeoulPage from '@/pages/seo/NearSeoulPage'
import FamilyPage from '@/pages/seo/FamilyPage'
import ParkingEasyPage from '@/pages/seo/ParkingEasyPage'
import BusanRegionPage from '@/pages/seo/BusanRegionPage'
import GangwonRegionPage from '@/pages/seo/GangwonRegionPage'
import JejuRegionPage from '@/pages/seo/JejuRegionPage'
import GuideBestTimePage from '@/pages/seo/GuideBestTimePage'
import GuideCrowdingPage from '@/pages/seo/GuideCrowdingPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.MAP} element={<MapPage />} />
        <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
        <Route path={ROUTES.MY_PAGE} element={<MyPage />} />
        <Route path={ROUTES.QUIET_BEACHES} element={<QuietBeachesPage />} />
        <Route path={ROUTES.QUIET_VALLEYS} element={<QuietValleysPage />} />
        <Route path={ROUTES.NEAR_SEOUL} element={<NearSeoulPage />} />
        <Route path={ROUTES.FAMILY} element={<FamilyPage />} />
        <Route path={ROUTES.PARKING_EASY} element={<ParkingEasyPage />} />
        <Route path={ROUTES.REGION_BUSAN} element={<BusanRegionPage />} />
        <Route path={ROUTES.REGION_GANGWON} element={<GangwonRegionPage />} />
        <Route path={ROUTES.REGION_JEJU} element={<JejuRegionPage />} />
        <Route path={ROUTES.GUIDE_BEST_TIME} element={<GuideBestTimePage />} />
        <Route path={ROUTES.GUIDE_CROWDING} element={<GuideCrowdingPage />} />
      </Route>
      <Route path={ROUTES.SPOT_DETAIL} element={<SpotDetailPage />} />
      <Route path={ROUTES.SPOTS} element={<SpotsPage />} />
      <Route path={ROUTES.RANKING} element={<RankingPage />} />
    </Routes>
  )
}

export default App
