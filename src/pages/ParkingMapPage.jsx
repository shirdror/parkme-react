import { useState } from 'react'
import ScreenHeader from '../components/ScreenHeader/ScreenHeader.jsx'
import SearchBar from '../components/SearchBar/SearchBar.jsx'
import ParkingMap from '../components/ParkingMap/ParkingMap.jsx'
import ParkingDetailsCard from '../components/ParkingDetailsCard/ParkingDetailsCard.jsx'
import { parkingSpots } from '../data/parkingSpots.js'
import './ParkingMapPage.css'

/*
 * ParkingMapPage (/parking-map) - הצגת מפת החניות, חיפוש וצפייה בפרטי חניה.
 */
const filters = [
  { key: 'all', label: 'הכל' },
  { key: 'free', label: 'פנויות' },
  { key: 'paid', label: 'בתשלום' },
]

export default function ParkingMapPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(parkingSpots[0].id)

  const visibleSpots = parkingSpots.filter((spot) => {
    const matchesFilter = filter === 'all' || spot.status === filter
    const matchesQuery =
      !query ||
      spot.title.includes(query) ||
      spot.area.includes(query)
    return matchesFilter && matchesQuery
  })

  const selectedSpot =
    visibleSpots.find((s) => s.id === selectedId) || visibleSpots[0] || null

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

      <ParkingMap
        spots={visibleSpots}
        selectedId={selectedSpot?.id}
        onSelect={setSelectedId}
      />

      {selectedSpot && (
        <div className="pmap__selected">
          <ParkingDetailsCard spot={selectedSpot} variant="detail" />
        </div>
      )}

      <div className="pmap__list">
        <h2 className="section-title">
          {visibleSpots.length} חניות ברשימה
        </h2>
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
    </div>
  )
}
