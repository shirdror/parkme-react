import { useEffect, useState } from 'react'
import ScreenHeader from '../components/ScreenHeader/ScreenHeader.jsx'
import ProfileAvatar from '../components/ProfileAvatar/ProfileAvatar.jsx'
import TextInput from '../components/TextInput/TextInput.jsx'
import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch.jsx'
import PrimaryButton from '../components/PrimaryButton/PrimaryButton.jsx'
import SecondaryButton from '../components/SecondaryButton/SecondaryButton.jsx'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../context/AuthContext.jsx'
import './ProfilePage.css'

/*
 * ProfilePage (/profile) - פרטי המשתמש המחובר, סטטיסטיקות אמיתיות והתנתקות.
 * השם נשמר ב-user_metadata של Supabase. הדיווחים והחניות השמורות נספרים מה-DB.
 */
const months = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר',
]

function initialsFrom(name, email) {
  const source = name || email || ''
  const parts = source.trim().split(/[\s.@]+/).filter(Boolean)
  const letters = parts.slice(0, 2).map((p) => p[0]).join('')
  return letters.toUpperCase() || 'PM'
}

export default function ProfilePage() {
  const { user } = useAuth()
  const defaultName = user.user_metadata?.name || user.email?.split('@')[0] || ''

  const [name, setName] = useState(defaultName)
  const [prefs, setPrefs] = useState({ freeOnly: true, pushNotifications: true, shareLocation: false })
  const [stats, setStats] = useState({ reports: 0, saved: 0 })
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState('')

  useEffect(() => {
    async function loadStats() {
      const [{ count: reports }, { count: saved }] = await Promise.all([
        supabase.from('parking_reports').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('favorites').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      ])
      setStats({ reports: reports || 0, saved: saved || 0 })
    }
    loadStats()
  }, [user.id])

  const created = user.created_at ? new Date(user.created_at) : null
  const memberSince = created ? `${months[created.getMonth()]} ${created.getFullYear()}` : '—'

  const togglePref = (key) => (val) => setPrefs((p) => ({ ...p, [key]: val }))

  async function handleSave() {
    setSaving(true)
    setSavedMsg('')
    const { error } = await supabase.auth.updateUser({ data: { name } })
    setSaving(false)
    setSavedMsg(error ? 'השמירה נכשלה, נסו שוב' : 'הפרטים נשמרו')
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  return (
    <div className="profile">
      <ScreenHeader title="הפרופיל שלי" subtitle="החשבון שלך וההעדפות" />

      <section className="profile__card profile__identity">
        <ProfileAvatar initials={initialsFrom(name, user.email)} size="lg" editable />
        <div className="profile__identity-text">
          <h2 className="profile__name">{name || 'משתמש/ת ParkMe'}</h2>
          <p className="profile__member">חבר/ה מאז {memberSince}</p>
        </div>
      </section>

      <section className="profile__stats">
        <div className="profile__stat">
          <span className="profile__stat-num">{stats.reports}</span>
          <span className="profile__stat-label">דיווחים</span>
        </div>
        <div className="profile__stat">
          <span className="profile__stat-num">{stats.saved}</span>
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
          <TextInput label="שם תצוגה" value={name} onChange={(e) => setName(e.target.value)} />
          <TextInput label="אימייל" type="email" value={user.email || ''} onChange={() => {}} hint="לא ניתן לשינוי" />
        </div>
        {savedMsg && <p className="profile__saved-msg">{savedMsg}</p>}
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
        <PrimaryButton fullWidth onClick={handleSave} disabled={saving}>
          {saving ? 'שומר...' : 'שמירת שינויים'}
        </PrimaryButton>
        <SecondaryButton fullWidth onClick={handleLogout}>
          התנתקות
        </SecondaryButton>
      </div>
    </div>
  )
}
