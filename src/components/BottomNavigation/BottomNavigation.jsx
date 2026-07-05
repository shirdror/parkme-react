import { NavLink } from 'react-router-dom'
import { HomeIcon, MapIcon, PlusCircleIcon, UserIcon } from '../Icons.jsx'
import './BottomNavigation.css'

/*
 * BottomNavigation (Shared) - תפריט ניווט תחתון בסגנון אפליקציה.
 * מופיע בכל העמודים הראשיים ומחליף עמוד בלחיצה (ללא טעינה מחדש).
 */
const tabs = [
  { to: '/', label: 'בית', Icon: HomeIcon, end: true },
  { to: '/parking-map', label: 'מפה', Icon: MapIcon },
  { to: '/report-parking', label: 'דיווח', Icon: PlusCircleIcon },
  { to: '/profile', label: 'פרופיל', Icon: UserIcon },
]

export default function BottomNavigation() {
  return (
    <nav className="bottomnav" aria-label="ניווט תחתון">
      {tabs.map(({ to, label, Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `bottomnav__tab ${isActive ? 'bottomnav__tab--active' : ''}`
          }
        >
          <span className="bottomnav__icon">
            <Icon width={22} height={22} />
          </span>
          <span className="bottomnav__label">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
