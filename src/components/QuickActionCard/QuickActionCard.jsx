import { Link } from 'react-router-dom'
import './QuickActionCard.css'

/*
 * QuickActionCard (Reusable) - כרטיס פעולה מהירה בעמוד הבית.
 * חוזר על עצמו באותו עמוד (מפה / דיווח / פרופיל) ולכן רכיב לשימוש חוזר.
 */
export default function QuickActionCard({ to, icon, title, description, tone = 'primary' }) {
  return (
    <Link to={to} className={`qcard qcard--${tone}`}>
      <span className="qcard__icon">{icon}</span>
      <span className="qcard__text">
        <span className="qcard__title">{title}</span>
        <span className="qcard__description">{description}</span>
      </span>
    </Link>
  )
}
