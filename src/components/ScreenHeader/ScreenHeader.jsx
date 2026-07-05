import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '../Icons.jsx'
import './ScreenHeader.css'

/*
 * ScreenHeader (Shared) - כותרת המסך: כותרת + תת-כותרת + כפתור חזרה אופציונלי.
 * מופיע בעמודי Profile, Report Parking, Parking Map.
 */
export default function ScreenHeader({ title, subtitle, back = false }) {
  const navigate = useNavigate()

  return (
    <div className="screen-header">
      {back && (
        <button
          type="button"
          className="screen-header__back"
          onClick={() => navigate(-1)}
          aria-label="חזרה"
        >
          <ChevronLeftIcon width={22} height={22} />
        </button>
      )}
      <div>
        <h1 className="screen-header__title">{title}</h1>
        {subtitle && <p className="screen-header__subtitle">{subtitle}</p>}
      </div>
    </div>
  )
}
