import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import QuickActionCard from '../components/QuickActionCard/QuickActionCard.jsx'
import ParkingDetailsCard from '../components/ParkingDetailsCard/ParkingDetailsCard.jsx'
import { supabase } from '../lib/supabase.js'
import { fetchSpotsWithStatus } from '../lib/parking.js'
import { useAuth } from '../context/AuthContext.jsx'
import './HomePage.css'

/*
 * HomePage (/) - מסך הבית: הירו צילומי, אינדקס פעולות וחניות קרובות.
 * הנתונים נטענים חיים מ-Supabase (חניות + סטטוס מהדיווח האחרון).
 */
export default function HomePage() {
  const { user } = useAuth()
  const [spots, setSpots] = useState([])
  const [reportsCount, setReportsCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const cityName = 'תל אביב-יפו'

  useEffect(() => {
    async function load() {
      const [spotsData, { count }] = await Promise.all([
        fetchSpotsWithStatus(),
        supabase
          .from('parking_reports')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id),
      ])
      setSpots(spotsData)
      setReportsCount(count || 0)
      setLoading(false)
    }
    load()
  }, [user.id])

  const nearby = spots.slice(0, 3)
  const freeCount = spots.filter((s) => s.status === 'free').length

  return (
    <div className="home">
      <section className="hero">
        <img className="hero__img" src="/hero.png" alt="רחוב עירוני עם חניות בשעת בין ערביים" />
        <div className="hero__overlay">
          <p className="hero__eyebrow">{cityName}</p>
          <h1 className="hero__title">
            החניה הפנויה
            <br />
            הקרובה אליך
          </h1>
          <p className="hero__meta">
            {loading ? 'טוען חניות...' : `${freeCount} פנויות ברחוב שלך עכשיו`}
          </p>
          <Link to="/parking-map" className="hero__cta">
            פתיחת המפה
            <span aria-hidden="true">←</span>
          </Link>
        </div>
      </section>

      <section className="home__block">
        <h2 className="eyebrow">מה עושים</h2>
        <div className="home__index">
          <QuickActionCard
            to="/parking-map"
            index="01"
            title="מפת החניות"
            description="מה פנוי עכשיו ברחובות סביבך"
          />
          <QuickActionCard
            to="/report-parking"
            index="02"
            title="דיווח על חניה"
            description="התפנה מקום? עדכן לפני שנסעת"
          />
          <QuickActionCard
            to="/profile"
            index="03"
            title="הפרופיל שלי"
            description="מה שמרת ומה דיווחת"
          />
        </div>
      </section>

      <section className="home__block">
        <div className="home__block-head">
          <h2 className="section-title">קרוב אליך</h2>
          <Link to="/parking-map" className="home__more">
            לכל החניות
          </Link>
        </div>
        <div className="home__list">
          {loading ? (
            <p className="home__loading">טוען...</p>
          ) : (
            nearby.map((spot) => (
              <ParkingDetailsCard key={spot.id} spot={spot} variant="list" />
            ))
          )}
        </div>
      </section>

      <section className="home__note">
        <span className="home__note-num">{reportsCount}</span>
        <p className="home__note-text">
          דיווחים שיתפת. נהגים ברחוב שלך מצאו חניה בזכותם
        </p>
      </section>
    </div>
  )
}
