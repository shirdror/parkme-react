import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ReportParkingPage from './pages/ReportParkingPage.jsx'
import ParkingMapPage from './pages/ParkingMapPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { useAuth } from './context/AuthContext.jsx'

/*
 * מפת הניווט (Routing) של ParkMe
 * כל העמודים עטופים ב-Layout המשותף (Navbar + Footer + Bottom Navigation).
 * עמודי האפליקציה מוגנים ב-PrivateRoute (דרושה כניסה); /login חסום למי שכבר מחובר.
 * ראה חלק 2 ב-DESIGN.md לטבלת הכתובות המלאה.
 */

function Splash() {
  return <div className="app-splash">טוען...</div>
}

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <Splash />
  return user ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <Splash />
  return user ? <Navigate to="/" replace /> : children
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/report-parking" element={<PrivateRoute><ReportParkingPage /></PrivateRoute>} />
        <Route path="/parking-map" element={<PrivateRoute><ParkingMapPage /></PrivateRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
