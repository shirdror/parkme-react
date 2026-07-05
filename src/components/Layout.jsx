import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar/Navbar.jsx'
import Footer from './Footer/Footer.jsx'
import BottomNavigation from './BottomNavigation/BottomNavigation.jsx'

/*
 * Layout - המעטפת המשותפת לכל העמודים.
 * Navbar + Footer מופיעים בכל עמוד (דרישת המטלה).
 * BottomNavigation מופיע בעמודי האפליקציה, ומוסתר במסך ההתחברות (Login),
 * שהוא מסך עצמאי לפני כניסה.
 */
export default function Layout() {
  const { pathname } = useLocation()
  const hideBottomNav = pathname === '/login'

  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
      {!hideBottomNav && <BottomNavigation />}
    </div>
  )
}
