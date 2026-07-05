import { useState, useEffect } from 'react'
import { AccessibilityIcon } from '../Icons.jsx'
import './AccessibilityButton.css'

/*
 * AccessibilityButton (Shared) - כפתור הגדרות נגישות.
 * מחליף בין מצב טקסט רגיל למצב טקסט מוגדל (data-a11y="large" על <html>),
 * מה שמגדיל את כל טוקני הפונט דרך ה-CSS Variables ב-globals.css.
 */
export default function AccessibilityButton() {
  const [large, setLarge] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.a11y = large ? 'large' : 'normal'
  }, [large])

  return (
    <button
      type="button"
      className={`a11y-btn ${large ? 'a11y-btn--active' : ''}`}
      onClick={() => setLarge((v) => !v)}
      aria-pressed={large}
      aria-label={large ? 'כבה טקסט מוגדל' : 'הפעל טקסט מוגדל לנגישות'}
      title="נגישות: הגדלת טקסט"
    >
      <AccessibilityIcon width={22} height={22} />
    </button>
  )
}
