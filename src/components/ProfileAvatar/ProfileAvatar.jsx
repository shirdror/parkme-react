import './ProfileAvatar.css'

/*
 * ProfileAvatar (Reusable) - תמונת הפרופיל של המשתמש.
 * מציג ראשי תיבות על רקע מותג (ללא תלות בתמונה חיצונית).
 */
export default function ProfileAvatar({ initials, size = 'md', editable = false, onEdit }) {
  return (
    <div className={`avatar avatar--${size}`}>
      <span className="avatar__initials">{initials}</span>
      {editable && (
        <button type="button" className="avatar__edit" onClick={onEdit} aria-label="שינוי תמונה">
          ✎
        </button>
      )}
    </div>
  )
}
