import { Link } from 'react-router-dom'
import '../PrimaryButton/PrimaryButton.css'
import './SecondaryButton.css'

/*
 * SecondaryButton (Reusable) - כפתור פעולה משני (מתאר, לא מלא).
 * חולק את בסיס ה-.btn עם PrimaryButton. תומך ב-to / onClick / icon.
 */
export default function SecondaryButton({
  children,
  to,
  onClick,
  type = 'button',
  fullWidth = false,
  icon = null,
}) {
  const className = `btn btn--secondary ${fullWidth ? 'btn--full' : ''}`

  const inner = (
    <>
      {icon && <span className="btn__icon">{icon}</span>}
      <span>{children}</span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={className}>
        {inner}
      </Link>
    )
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      {inner}
    </button>
  )
}
