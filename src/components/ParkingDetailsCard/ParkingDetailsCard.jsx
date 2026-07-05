import { PinIcon, ClockIcon, CoinIcon } from '../Icons.jsx'
import { statusLabels } from '../../data/parkingSpots.js'
import PrimaryButton from '../PrimaryButton/PrimaryButton.jsx'
import SecondaryButton from '../SecondaryButton/SecondaryButton.jsx'
import './ParkingDetailsCard.css'

/*
 * ParkingDetailsCard (Reusable) - כרטיס המציג מידע על חניה.
 * משמש גם ברשימת החניות (variant="list") וגם ככרטיס הפרטים הנבחר
 * במפה (variant="detail" - עם כפתורי פעולה).
 */
export default function ParkingDetailsCard({ spot, variant = 'list', selected = false, onClick }) {
  const status = statusLabels[spot.status]
  const isDetail = variant === 'detail'

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
        <>
          <p className="pcard__reporter">דווח על ידי {spot.reporter}</p>
          <div className="pcard__actions">
            <PrimaryButton fullWidth icon={<PinIcon width={18} height={18} />}>
              נווט לחניה
            </PrimaryButton>
            <SecondaryButton fullWidth>שמור</SecondaryButton>
          </div>
        </>
      )}
    </Wrapper>
  )
}
