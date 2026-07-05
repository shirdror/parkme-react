import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '../Icons.jsx'
import './QuickActionCard.css'

/*
 * QuickActionCard (Reusable) - שורת פעולה בעמוד הבית, בסגנון אינדקס אדיטוריאלי:
 * מספר סידורי + כותרת + תיאור + חץ. חוזר על עצמו באותו עמוד ולכן לשימוש חוזר.
 */
export default function QuickActionCard({ to, index, title, description }) {
  return (
    <Link to={to} className="qcard">
      <span className="qcard__index">{index}</span>
      <span className="qcard__text">
        <span className="qcard__title">{title}</span>
        <span className="qcard__description">{description}</span>
      </span>
      <ChevronLeftIcon width={20} height={20} className="qcard__arrow" />
    </Link>
  )
}
