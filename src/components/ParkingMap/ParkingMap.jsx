import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import { PinIcon } from '../Icons.jsx'
import './ParkingMap.css'

/*
 * ParkingMap (Section) - מפה אינטראקטיבית אמיתית מבוססת Leaflet + OpenStreetMap.
 * כל חניה מסומנת כעיגול צבעוני לפי הסטטוס (פנויה / בתשלום / נתפסה), ניתן ללחיצה.
 * המפה זזה אוטומטית לחניה שנבחרה. אין צורך במפתח API - אריחי OSM חינמיים.
 */
const CENTER = [32.0793, 34.7749] // מרכז תל אביב - דיזנגוף

const statusColor = {
  free: '#15803d',
  paid: '#b45309',
  taken: '#b91c1c',
}

// רכיב עזר: מזיז את המפה לחניה שנבחרה
function PanToSelected({ spot }) {
  const map = useMap()
  useEffect(() => {
    if (spot) map.panTo([spot.lat, spot.lng], { animate: true })
  }, [spot, map])
  return null
}

export default function ParkingMap({ spots, selectedId, onSelect }) {
  const selected = spots.find((s) => s.id === selectedId) || null

  return (
    <div className="parking-map">
      <MapContainer
        center={CENTER}
        zoom={14}
        scrollWheelZoom={false}
        className="parking-map__canvas"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {spots.map((spot) => {
          const isSelected = spot.id === selectedId
          const color = statusColor[spot.status] || statusColor.free
          return (
            <CircleMarker
              key={spot.id}
              center={[spot.lat, spot.lng]}
              radius={isSelected ? 13 : 9}
              pathOptions={{
                color: '#fff',
                weight: isSelected ? 3 : 2,
                fillColor: color,
                fillOpacity: 1,
              }}
              eventHandlers={{ click: () => onSelect?.(spot.id) }}
            >
              <Tooltip direction="top" offset={[0, -6]}>
                {spot.title}
              </Tooltip>
            </CircleMarker>
          )
        })}

        <PanToSelected spot={selected} />
      </MapContainer>

      <div className="parking-map__badge">
        <PinIcon width={16} height={16} />
        <span>{spots.length} חניות באזור</span>
      </div>
    </div>
  )
}
