import { Link } from 'react-router-dom'
import './PrimaryButton.css'

/*
 * PrimaryButton (Reusable) - כפתור פעולה ראשי.
 * מרונדר כ-<Link> אם הועבר prop בשם to, אחרת כ-<button>.
 * fullWidth, icon ו-disabled נתמכים.
 */
export default function PrimaryButton({
  children,
  to,
  onClick,
  type = 'button',
  fullWidth = false,
  disabled = false,
  icon = null,
}) {
  const className = `btn btn--primary ${fullWidth ? 'btn--full' : ''}`

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
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  )
}
