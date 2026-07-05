import './ToggleSwitch.css'

/*
 * ToggleSwitch (Reusable) - מתג/צ'קבוקס לסימון העדפות המשתמש.
 * בשימוש בעמודי Profile (העדפות) ו-Report Parking (חניה בתשלום).
 */
export default function ToggleSwitch({ label, description, checked, onChange }) {
  return (
    <label className="toggle">
      <span className="toggle__text">
        <span className="toggle__label">{label}</span>
        {description && <span className="toggle__description">{description}</span>}
      </span>
      <span className="toggle__switch">
        <input
          type="checkbox"
          className="toggle__input"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span className="toggle__track" aria-hidden="true">
          <span className="toggle__thumb" />
        </span>
      </span>
    </label>
  )
}
