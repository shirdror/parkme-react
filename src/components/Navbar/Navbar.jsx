import { NavLink } from 'react-router-dom'
import Logo from '../Logo/Logo.jsx'
import AccessibilityButton from '../AccessibilityButton/AccessibilityButton.jsx'
import './Navbar.css'

/*
 * Navbar (Shared) - הסרגל העליון, מופיע בכל העמודים.
 * במובייל: לוגו + כפתור נגישות בלבד (הניווט הראשי ב-BottomNavigation).
 * במסך רחב: מוצגים גם קישורי הניווט האופקיים.
 */
const links = [
  { to: '/', label: 'בית', end: true },
  { to: '/parking-map', label: 'מפה' },
  { to: '/report-parking', label: 'דיווח' },
  { to: '/profile', label: 'פרופיל' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <Logo size="sm" badge={false} />

      <nav className="navbar__links" aria-label="ניווט ראשי">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `navbar__link ${isActive ? 'navbar__link--active' : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <AccessibilityButton />
    </header>
  )
}
