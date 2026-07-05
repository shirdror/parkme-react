import { PinIcon } from '../Icons.jsx'
import './ParkingMarker.css'

/*
 * ParkingMarker (Reusable) - סימון של חניה על גבי המפה.
 * הצבע נגזר מהסטטוס (פנויה / בתשלום / נתפסה). ניתן ללחיצה לבחירת החניה.
 */
export default function ParkingMarker({ status = 'free', selected = false, style, onClick, label }) {
  return (
    <button
      type="button"
      className={`marker marker--${status} ${selected ? 'marker--selected' : ''}`}
      style={style}
      onClick={onClick}
      aria-label={label}
    >
      <PinIcon width={18} height={18} />
    </button>
  )
}
