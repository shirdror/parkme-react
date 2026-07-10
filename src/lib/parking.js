import { supabase } from './supabase.js'

/*
 * שכבת גישה לנתונים - שאילתות משותפות מול Supabase לחניות ולדיווחים.
 * הסטטוס של כל חניה נגזר מהדיווח האחרון עליה (parking_reports).
 */

// נקודת ייחוס לחישוב מרחק כשאין מיקום מהדפדפן (מרכז תל אביב - דיזנגוף)
const CENTER = { lat: 32.0793, lng: 34.7749 }

export function timeAgo(dateStr) {
  if (!dateStr) return 'אין דיווח עדיין'
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 60000)
  if (diff < 1) return 'עכשיו'
  if (diff < 60) return `לפני ${diff} דק׳`
  const hours = Math.floor(diff / 60)
  if (hours < 24) return `לפני ${hours} שעות`
  return `לפני ${Math.floor(hours / 24)} ימים`
}

function distanceStr(lat, lng, origin = CENTER) {
  const R = 6371000
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(lat - origin.lat)
  const dLng = toRad(lng - origin.lng)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(origin.lat)) * Math.cos(toRad(lat)) * Math.sin(dLng / 2) ** 2
  const meters = Math.round(2 * R * Math.asin(Math.sqrt(a)))
  return meters < 1000 ? `${meters} מ׳` : `${(meters / 1000).toFixed(1)} ק״מ`
}

export function latestReportPerSpot(reports) {
  const map = {}
  for (const r of reports) {
    if (!map[r.spot_id] || new Date(r.created_at) > new Date(map[r.spot_id].created_at)) {
      map[r.spot_id] = r
    }
  }
  return map
}

// ממזג חניה עם הדיווח האחרון עליה למבנה שכרטיס החניה מצפה לו
export function enrichSpot(spot, latest, origin) {
  return {
    id: spot.id,
    title: spot.title,
    area: spot.area,
    lat: Number(spot.lat),
    lng: Number(spot.lng),
    price: spot.base_price,
    status: latest?.status || 'free',
    time: latest ? timeAgo(latest.created_at) : 'אין דיווח עדיין',
    distance: distanceStr(Number(spot.lat), Number(spot.lng), origin),
  }
}

export async function fetchSpotsWithStatus(origin) {
  const [{ data: spots }, { data: reports }] = await Promise.all([
    supabase.from('parking_spots').select('*').order('created_at'),
    supabase
      .from('parking_reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200),
  ])
  const latest = latestReportPerSpot(reports || [])
  return (spots || []).map((s) => enrichSpot(s, latest[s.id], origin))
}
