import { Link } from 'react-router-dom'
import { PinIcon } from '../Icons.jsx'
import './Logo.css'

/*
 * Logo (Shared) - לוגו האפליקציה ParkMe.
 * מופיע בכל המסכים (Navbar, Login וכו').
 * to=null יגרום לרינדור ללא קישור (למשל בעמוד Login).
 */
export default function Logo({ size = 'md', to = '/', badge = true }) {
  const content = (
    <span className={`logo logo--${size}`}>
      {badge && (
        <span className="logo__badge">
          <PinIcon width={size === 'lg' ? 26 : 20} height={size === 'lg' ? 26 : 20} />
        </span>
      )}
      <span className="logo__word">
        Park<span className="logo__word-accent">Me</span>
      </span>
    </span>
  )

  if (!to) return content
  return (
    <Link to={to} className="logo__link" aria-label="ParkMe - דף הבית">
      {content}
    </Link>
  )
}
