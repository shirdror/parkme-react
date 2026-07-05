import ParkingMarker from '../ParkingMarker/ParkingMarker.jsx'
import { PinIcon } from '../Icons.jsx'
import './ParkingMap.css'

/*
 * ParkingMap (Section) - רכיב המציג את המפה עם סימוני החניות.
 * המפה עצמה מדומה (Dummy) - רקע רחובות מעוצב ב-CSS, ללא שירות מפות חיצוני.
 * מיקומי הסיכות קבועים ודטרמיניסטיים לצורך הדגמה.
 */
const positions = [
  { top: '28%', left: '32%' },
  { top: '52%', left: '58%' },
  { top: '40%', left: '74%' },
  { top: '68%', left: '38%' },
  { top: '22%', left: '66%' },
]

export default function ParkingMap({ spots, selectedId, onSelect }) {
  return (
    <div className="parking-map" role="img" aria-label="מפת חניות בעיר">
      <div className="parking-map__grid" aria-hidden="true" />

      {/* מיקום המשתמש */}
      <span className="parking-map__me" aria-hidden="true">
        <span className="parking-map__me-dot" />
        <span className="parking-map__me-pulse" />
      </span>

      {spots.map((spot, i) => (
        <ParkingMarker
          key={spot.id}
          status={spot.status}
          selected={spot.id === selectedId}
          onClick={() => onSelect?.(spot.id)}
          label={`${spot.title} - ${spot.status === 'free' ? 'פנויה' : spot.status === 'paid' ? 'בתשלום' : 'נתפסה'}`}
          style={positions[i % positions.length]}
        />
      ))}

      <div className="parking-map__badge">
        <PinIcon width={16} height={16} />
        <span>{spots.length} חניות באזור</span>
      </div>
    </div>
  )
}
