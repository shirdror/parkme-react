import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ReportParkingPage from './pages/ReportParkingPage.jsx'
import ParkingMapPage from './pages/ParkingMapPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

/*
 * מפת הניווט (Routing) של ParkMe
 * כל העמודים עטופים ב-Layout המשותף (Navbar + Footer + Bottom Navigation).
 * ראה חלק 2 ב-DESIGN.md לטבלת הכתובות המלאה.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/report-parking" element={<ReportParkingPage />} />
        <Route path="/parking-map" element={<ParkingMapPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
