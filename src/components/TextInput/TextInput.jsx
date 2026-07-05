import { useId } from 'react'
import './TextInput.css'

/*
 * TextInput (Reusable) - שדה להזנת מידע עם תווית ואייקון אופציונלי.
 * בשימוש בעמודי Login, Profile, Report Parking.
 */
export default function TextInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon = null,
  hint = null,
  name,
  multiline = false,
  rows = 3,
}) {
  const id = useId()

  return (
    <div className="text-input">
      {label && (
        <label htmlFor={id} className="text-input__label">
          {label}
        </label>
      )}
      <div
        className={`text-input__field ${icon ? 'text-input__field--has-icon' : ''} ${
          multiline ? 'text-input__field--multiline' : ''
        }`}
      >
        {icon && <span className="text-input__icon">{icon}</span>}
        {multiline ? (
          <textarea
            id={id}
            name={name}
            rows={rows}
            className="text-input__control text-input__control--area"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            className="text-input__control"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
      {hint && <p className="text-input__hint">{hint}</p>}
    </div>
  )
}
