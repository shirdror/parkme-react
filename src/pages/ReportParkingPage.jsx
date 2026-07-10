import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import ScreenHeader from '../components/ScreenHeader/ScreenHeader.jsx'
import TextInput from '../components/TextInput/TextInput.jsx'
import PrimaryButton from '../components/PrimaryButton/PrimaryButton.jsx'
import { PinIcon } from '../components/Icons.jsx'
import { supabase } from '../lib/supabase.js'
import { statusLabels } from '../data/parkingSpots.js'
import { useAuth } from '../context/AuthContext.jsx'
import './ReportParkingPage.css'

/*
 * ReportParkingPage (/report-parking) - דיווח אמיתי על סטטוס חניה.
 * בוחרים חניה, קובעים סטטוס (פנויה / בתשלום / נתפסה), ומוסיפים הערה.
 * השליחה כותבת שורה ב-parking_reports (מפעיל Realtime בשאר האפליקציה)
 * ואם מוגדר EmailJS - נשלח מייל אישור למשתמש.
 */
const statusOptions = ['free', 'paid', 'taken']

export default function ReportParkingPage() {
  const { user } = useAuth()
  const [spotsList, setSpotsList] = useState([])
  const [spotId, setSpotId] = useState('')
  const [status, setStatus] = useState('free')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase
      .from('parking_spots')
      .select('id, title, area')
      .order('title')
      .then(({ data }) => setSpotsList(data || []))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!spotId) {
      setError('בחרו חניה לדיווח')
      return
    }
    setLoading(true)
    setError('')

    const { error: insertError } = await supabase.from('parking_reports').insert({
      spot_id: spotId,
      user_id: user.id,
      status,
      notes: notes || null,
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    await sendConfirmationEmail()

    setSubmitted(true)
    setLoading(false)
  }

  async function sendConfirmationEmail() {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    if (!serviceId || !templateId || !publicKey) return

    const spot = spotsList.find((s) => s.id === spotId)
    await emailjs
      .send(
        serviceId,
        templateId,
        {
          to_email: user.email,
          to_name: user.email?.split('@')[0] || 'נהג/ת',
          spot_name: spot?.title || '',
          status_label: statusLabels[status].label,
          notes: notes || 'ללא הערות',
        },
        publicKey
      )
      .catch(() => {})
  }

  if (submitted) {
    return (
      <div className="report">
        <ScreenHeader title="דיווח על חניה" back />
        <div className="report__success">
          <span className="report__success-icon">
            <PinIcon width={30} height={30} />
          </span>
          <h2 className="report__success-title">הדיווח עלה</h2>
          <p className="report__success-text">
            נהג שמחפש עכשיו ברחוב שלך יראה את המקום. תודה
          </p>
          <PrimaryButton
            fullWidth
            onClick={() => {
              setSubmitted(false)
              setSpotId('')
              setStatus('free')
              setNotes('')
            }}
          >
            דיווח נוסף
          </PrimaryButton>
        </div>
      </div>
    )
  }

  return (
    <div className="report">
      <ScreenHeader title="דיווח על חניה" subtitle="התפנה מקום? ספר לנהג הבא" back />

      {error && <div className="report__error">{error}</div>}

      <form className="report__form" onSubmit={handleSubmit}>
        <div className="report__field">
          <label className="report__label" htmlFor="spot">
            איזו חניה?
          </label>
          <select
            id="spot"
            className="report__select"
            value={spotId}
            onChange={(e) => setSpotId(e.target.value)}
          >
            <option value="" disabled>
              בחרו חניה מהרשימה
            </option>
            {spotsList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title} - {s.area}
              </option>
            ))}
          </select>
        </div>

        <div className="report__field">
          <span className="report__label">מה הסטטוס?</span>
          <div className="report__status-row">
            {statusOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`report__status ${status === opt ? 'report__status--active' : ''}`}
                style={status === opt ? { borderColor: statusLabels[opt].color } : undefined}
                onClick={() => setStatus(opt)}
              >
                <span
                  className="report__status-dot"
                  style={{ background: statusLabels[opt].color }}
                />
                {statusLabels[opt].label}
              </button>
            ))}
          </div>
        </div>

        <TextInput
          label="פרטים נוספים"
          placeholder="לדוגמה: חניה כפולה, פינוי בעוד 5 דקות, צד ימין של הרחוב..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          multiline
          rows={4}
        />

        <PrimaryButton
          type="submit"
          fullWidth
          disabled={loading}
          icon={<PinIcon width={18} height={18} />}
        >
          {loading ? 'שולח...' : 'שליחת הדיווח'}
        </PrimaryButton>
      </form>
    </div>
  )
}
