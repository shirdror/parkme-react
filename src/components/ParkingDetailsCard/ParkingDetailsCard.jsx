import { PinIcon, ClockIcon, CoinIcon } from '../Icons.jsx'
import { statusLabels } from '../../data/parkingSpots.js'
import PrimaryButton from '../PrimaryButton/PrimaryButton.jsx'
import SecondaryButton from '../SecondaryButton/SecondaryButton.jsx'
import './ParkingDetailsCard.css'

/*
 * ParkingDetailsCard (Reusable) - כרטיס המציג מידע על חניה.
 * משמש גם ברשימת החניות (variant="list") וגם ככרטיס הפרטים הנבחר
 * במפה (variant="detail" - עם כפתורי ניווט ושמירה למועדפים).
 */
export default function ParkingDetailsCard({
  spot,
  variant = 'list',
  selected = false,
  onClick,
  onSave,
  saved = false,
}) {
  const status = statusLabels[spot.status]
  const isDetail = variant === 'detail'

  // ניווט אמיתי לנקודת החניה במפת OpenStreetMap
  const navigateUrl = `https://www.openstreetmap.org/?mlat=${spot.lat}&mlon=${spot.lng}#map=18/${spot.lat}/${spot.lng}`

  const Wrapper = isDetail ? 'div' : 'button'

  return (
    <Wrapper
      type={isDetail ? undefined : 'button'}
      className={`pcard pcard--${variant} ${selected ? 'pcard--selected' : ''}`}
      onClick={onClick}
    >
      <div className="pcard__head">
        <div className="pcard__title-wrap">
          <h3 className="pcard__title">{spot.title}</h3>
          <p className="pcard__area">
            <PinIcon width={14} height={14} />
            {spot.area}
          </p>
        </div>
        <span className="pcard__status" style={{ color: status.color }}>
          {status.label}
        </span>
      </div>

      <div className="pcard__meta">
        <span className="pcard__meta-item">
          <PinIcon width={15} height={15} />
          {spot.distance}
        </span>
        <span className="pcard__meta-item">
          <ClockIcon width={15} height={15} />
          {spot.time}
        </span>
        {spot.price && (
          <span className="pcard__meta-item">
            <CoinIcon width={15} height={15} />
            {spot.price}
          </span>
        )}
      </div>

      {isDetail && (
        <div className="pcard__actions">
          <a
            className="btn btn--primary btn--full"
            href={navigateUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="btn__icon"><PinIcon width={18} height={18} /></span>
            <span>נווט לחניה</span>
          </a>
          {onSave && (
            <SecondaryButton fullWidth onClick={onSave}>
              {saved ? 'נשמר ✓' : 'שמור'}
            </SecondaryButton>
          )}
        </div>
      )}
    </Wrapper>
  )
}
