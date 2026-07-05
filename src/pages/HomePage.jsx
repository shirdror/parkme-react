import { Link } from 'react-router-dom'
import { MapIcon, PlusCircleIcon, UserIcon, PinIcon } from '../components/Icons.jsx'
import QuickActionCard from '../components/QuickActionCard/QuickActionCard.jsx'
import ParkingDetailsCard from '../components/ParkingDetailsCard/ParkingDetailsCard.jsx'
import PrimaryButton from '../components/PrimaryButton/PrimaryButton.jsx'
import { parkingSpots } from '../data/parkingSpots.js'
import { currentUser } from '../data/user.js'
import './HomePage.css'

/*
 * HomePage (/) - מסך הבית: גישה מהירה למסכים הראשיים + חניות קרובות.
 */
export default function HomePage() {
  const nearby = parkingSpots.slice(0, 3)
  const freeCount = parkingSpots.filter((s) => s.status === 'free').length

  return (
    <div className="home">
      <section className="home__hero">
        <p className="home__hello">שלום {currentUser.name.split(' ')[0]} 👋</p>
        <h1 className="home__headline">איפה נחנה היום?</h1>
        <p className="home__sub">
          יש כרגע <strong>{freeCount} חניות פנויות</strong> באזור שלך
        </p>
        <PrimaryButton to="/parking-map" fullWidth icon={<MapIcon width={20} height={20} />}>
          פתח את המפה
        </PrimaryButton>
      </section>

      <section className="home__section">
        <h2 className="section-title">פעולות מהירות</h2>
        <div className="home__actions">
          <QuickActionCard
            to="/report-parking"
            tone="accent"
            icon={<PlusCircleIcon width={24} height={24} />}
            title="דיווח על חניה"
            description="מצאת חניה פנויה? שתף אחרים"
          />
          <QuickActionCard
            to="/parking-map"
            tone="primary"
            icon={<MapIcon width={24} height={24} />}
            title="מפת החניות"
            description="חניות פנויות בזמן אמת"
          />
          <QuickActionCard
            to="/profile"
            tone="neutral"
            icon={<UserIcon width={24} height={24} />}
            title="הפרופיל שלי"
            description="הדיווחים והעדפות"
          />
        </div>
      </section>

      <section className="home__section">
        <div className="home__section-head">
          <h2 className="section-title">חניות קרובות אליך</h2>
          <Link to="/parking-map" className="home__link">
            הצג הכל
          </Link>
        </div>
        <div className="home__list">
          {nearby.map((spot) => (
            <ParkingDetailsCard key={spot.id} spot={spot} variant="list" />
          ))}
        </div>
      </section>

      <section className="home__banner">
        <span className="home__banner-icon">
          <PinIcon width={22} height={22} />
        </span>
        <div>
          <p className="home__banner-title">כל דיווח עוזר לכולם</p>
          <p className="home__banner-text">
            כבר {currentUser.reportsCount} דיווחים שלך חסכו זמן לנהגים אחרים
          </p>
        </div>
      </section>
    </div>
  )
}
