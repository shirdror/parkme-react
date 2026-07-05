import { Link } from 'react-router-dom'
import './Footer.css'

/*
 * Footer (Shared) - כותרת תחתונה, מופיעה בכל העמודים.
 * קישורים משניים + זכויות. במובייל מרופדת מעל ה-BottomNavigation.
 */
export default function Footer() {
  return (
    <footer className="footer">
      <nav className="footer__links" aria-label="קישורים משניים">
        <Link to="/parking-map">מפת חניות</Link>
        <span aria-hidden="true">·</span>
        <Link to="/report-parking">דיווח חדש</Link>
        <span aria-hidden="true">·</span>
        <Link to="/profile">הפרופיל שלי</Link>
      </nav>
      <p className="footer__copy">
        ParkMe · חניה חכמה בעיר · © 2025 כל הזכויות שמורות
      </p>
    </footer>
  )
}
