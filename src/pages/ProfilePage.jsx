import { useState } from 'react'
import ScreenHeader from '../components/ScreenHeader/ScreenHeader.jsx'
import ProfileAvatar from '../components/ProfileAvatar/ProfileAvatar.jsx'
import TextInput from '../components/TextInput/TextInput.jsx'
import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch.jsx'
import PrimaryButton from '../components/PrimaryButton/PrimaryButton.jsx'
import SecondaryButton from '../components/SecondaryButton/SecondaryButton.jsx'
import { currentUser } from '../data/user.js'
import './ProfilePage.css'

/*
 * ProfilePage (/profile) - צפייה ועריכת פרטי המשתמש והעדפותיו.
 */
export default function ProfilePage() {
  const [form, setForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    city: currentUser.city,
  })
  const [prefs, setPrefs] = useState(currentUser.preferences)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const togglePref = (key) => (val) => setPrefs((p) => ({ ...p, [key]: val }))

  return (
    <div className="profile">
      <ScreenHeader title="הפרופיל שלי" subtitle="החשבון שלך וההעדפות" />

      <section className="profile__card profile__identity">
        <ProfileAvatar initials={currentUser.initials} size="lg" editable />
        <div className="profile__identity-text">
          <h2 className="profile__name">{currentUser.name}</h2>
          <p className="profile__member">חבר/ה מאז {currentUser.memberSince}</p>
        </div>
      </section>

      <section className="profile__stats">
        <div className="profile__stat">
          <span className="profile__stat-num">{currentUser.reportsCount}</span>
          <span className="profile__stat-label">דיווחים</span>
        </div>
        <div className="profile__stat">
          <span className="profile__stat-num">{currentUser.savedSpots}</span>
          <span className="profile__stat-label">חניות שמורות</span>
        </div>
        <div className="profile__stat">
          <span className="profile__stat-num">4.9</span>
          <span className="profile__stat-label">דירוג</span>
        </div>
      </section>

      <section className="profile__card">
        <h3 className="profile__card-title">פרטים אישיים</h3>
        <div className="profile__fields">
          <TextInput label="שם מלא" value={form.name} onChange={update('name')} />
          <TextInput label="אימייל" type="email" value={form.email} onChange={update('email')} />
          <TextInput label="טלפון" type="tel" value={form.phone} onChange={update('phone')} />
          <TextInput label="עיר" value={form.city} onChange={update('city')} />
        </div>
      </section>

      <section className="profile__card">
        <h3 className="profile__card-title">העדפות</h3>
        <div className="profile__prefs">
          <ToggleSwitch
            label="הצג רק חניות חינם"
            description="סנן חניות בתשלום מהמפה"
            checked={prefs.freeOnly}
            onChange={togglePref('freeOnly')}
          />
          <ToggleSwitch
            label="התראות Push"
            description="קבל עדכון על חניה פנויה בקרבתך"
            checked={prefs.pushNotifications}
            onChange={togglePref('pushNotifications')}
          />
          <ToggleSwitch
            label="שיתוף מיקום"
            description="אפשר איתור חניות מדויק לפי מיקומך"
            checked={prefs.shareLocation}
            onChange={togglePref('shareLocation')}
          />
        </div>
      </section>

      <div className="profile__actions">
        <PrimaryButton fullWidth>שמירת שינויים</PrimaryButton>
        <SecondaryButton fullWidth>עריכת פרופיל</SecondaryButton>
      </div>
    </div>
  )
}
