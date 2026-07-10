import { useEffect, useState } from 'react'
import ScreenHeader from '../components/ScreenHeader/ScreenHeader.jsx'
import SearchBar from '../components/SearchBar/SearchBar.jsx'
import ParkingMap from '../components/ParkingMap/ParkingMap.jsx'
import ParkingDetailsCard from '../components/ParkingDetailsCard/ParkingDetailsCard.jsx'
import { supabase } from '../lib/supabase.js'
import { fetchSpotsWithStatus } from '../lib/parking.js'
import { useAuth } from '../context/AuthContext.jsx'
import './ParkingMapPage.css'

/*
 * ParkingMapPage (/parking-map) - מפת החניות החיה, חיפוש, סינון ושמירת מועדפים.
 * הנתונים נטענים מ-Supabase, ומתעדכנים ב-Realtime בכל דיווח חדש.
 */
const filters = [
  { key: 'all', label: 'הכל' },
  { key: 'free', label: 'פנויות' },
  { key: 'paid', label: 'בתשלום' },
]

export default function ParkingMapPage() {
  const { user } = useAuth()
  const [spots, setSpots] = useState([])
  const [favorites, setFavorites] = useState(new Set())
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(true)

  async function loadSpots() {
    const data = await fetchSpotsWithStatus()
    setSpots(data)
    setSelectedId((prev) => prev || data[0]?.id || null)
    setLoading(false)
  }

  useEffect(() => {
    loadSpots()

    supabase
      .from('favorites')
      .select('spot_id')
      .eq('user_id', user.id)
      .then(({ data }) => setFavorites(new Set((data || []).map((f) => f.spot_id))))

    // Realtime - בכל דיווח חדש טוענים מחדש כדי לחשב את הסטטוס העדכני
    const channel = supabase
      .channel('parking_reports_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'parking_reports' },
        () => loadSpots()
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id])

  async function toggleFavorite(spotId) {
    const isSaved = favorites.has(spotId)
    const next = new Set(favorites)
    if (isSaved) {
      next.delete(spotId)
      setFavorites(next)
      await supabase.from('favorites').delete().eq('user_id', user.id).eq('spot_id', spotId)
    } else {
      next.add(spotId)
      setFavorites(next)
      await supabase.from('favorites').insert({ user_id: user.id, spot_id: spotId })
    }
  }

  const visibleSpots = spots.filter((spot) => {
    const matchesFilter = filter === 'all' || spot.status === filter
    const matchesQuery = !query || spot.title.includes(query) || spot.area.includes(query)
    return matchesFilter && matchesQuery
  })

  const selectedSpot = visibleSpots.find((s) => s.id === selectedId) || visibleSpots[0] || null

  return (
    <div className="pmap">
      <ScreenHeader title="מפת חניות" subtitle="מה פנוי עכשיו ברחובות סביבך" />

      <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />

      <div className="pmap__filters">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`pmap__filter ${filter === f.key ? 'pmap__filter--active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="pmap__empty">טוען מפה...</p>
      ) : (
        <>
          <ParkingMap
            spots={visibleSpots}
            selectedId={selectedSpot?.id}
            onSelect={setSelectedId}
          />

          {selectedSpot && (
            <div className="pmap__selected">
              <ParkingDetailsCard
                spot={selectedSpot}
                variant="detail"
                saved={favorites.has(selectedSpot.id)}
                onSave={() => toggleFavorite(selectedSpot.id)}
              />
            </div>
          )}

          <div className="pmap__list">
            <h2 className="section-title">{visibleSpots.length} חניות ברשימה</h2>
            {visibleSpots.length === 0 && (
              <p className="pmap__empty">אין חניות שמתאימות לחיפוש</p>
            )}
            {visibleSpots.map((spot) => (
              <ParkingDetailsCard
                key={spot.id}
                spot={spot}
                variant="list"
                selected={spot.id === selectedSpot?.id}
                onClick={() => setSelectedId(spot.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
