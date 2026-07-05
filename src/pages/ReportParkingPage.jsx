import { useState } from 'react'
import ScreenHeader from '../components/ScreenHeader/ScreenHeader.jsx'
import TextInput from '../components/TextInput/TextInput.jsx'
import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch.jsx'
import PrimaryButton from '../components/PrimaryButton/PrimaryButton.jsx'
import { PinIcon, MapIcon } from '../components/Icons.jsx'
import './ReportParkingPage.css'

/*
 * ReportParkingPage (/report-parking) - דיווח על חניה פנויה והזנת פרטי החניה.
 * טופס הדגמה (אין Backend) - שליחה מציגה הודעת אישור מקומית.
 */
export default function ReportParkingPage() {
  const [address, setAddress] = useState('')
  const [details, setDetails] = useState('')
  const [isPaid, setIsPaid] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="report">
        <ScreenHeader title="דיווח על חניה" back />
        <div className="report__success">
          <span className="report__success-icon">
            <PinIcon width={34} height={34} />
          </span>
          <h2 className="report__success-title">הדיווח נשלח, תודה!</h2>
          <p className="report__success-text">
            שיתפת חניה פנויה עם נהגים אחרים באזור. כל דיווח עוזר לכולם.
          </p>
          <PrimaryButton
            fullWidth
            onClick={() => {
              setSubmitted(false)
              setAddress('')
              setDetails('')
              setIsPaid(false)
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
      <ScreenHeader title="דיווח על חניה" subtitle="מצאת חניה פנויה? שתף אותה" back />

      <form className="report__form" onSubmit={handleSubmit}>
        {/* Map Button - כפתור לפתיחת המפה ובחירת מיקום החניה */}
        <button type="button" className="report__map-btn">
          <span className="report__map-preview" aria-hidden="true">
            <MapIcon width={26} height={26} />
          </span>
          <span className="report__map-text">
            <span className="report__map-title">בחר מיקום על המפה</span>
            <span className="report__map-sub">הקש כדי לסמן היכן החניה</span>
          </span>
          <PinIcon width={20} height={20} className="report__map-arrow" />
        </button>

        <TextInput
          label="כתובת החניה"
          placeholder="רחוב, מספר, עיר"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          icon={<PinIcon width={18} height={18} />}
        />

        <TextInput
          label="פרטים נוספים"
          placeholder="לדוגמה: חניה כפולה, פינוי בעוד 5 דקות, צד ימין של הרחוב..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          multiline
          rows={4}
        />

        <div className="report__toggle-card">
          <ToggleSwitch
            label="חניה בתשלום"
            description="סמן אם החניה כרוכה בתשלום"
            checked={isPaid}
            onChange={setIsPaid}
          />
        </div>

        <PrimaryButton type="submit" fullWidth icon={<PinIcon width={18} height={18} />}>
          שליחת הדיווח
        </PrimaryButton>
      </form>
    </div>
  )
}
