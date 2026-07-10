import { useState } from 'react'
import Logo from '../components/Logo/Logo.jsx'
import TextInput from '../components/TextInput/TextInput.jsx'
import PrimaryButton from '../components/PrimaryButton/PrimaryButton.jsx'
import { supabase } from '../lib/supabase.js'
import './LoginPage.css'

/*
 * LoginPage (/login) - כניסה והרשמה אמיתית דרך Supabase Auth.
 * מצב כניסה (signInWithPassword) או הרשמה (signUp) לפי הטוגל בתחתית.
 * לאחר כניסה מוצלחת ה-AuthProvider מזהה את ה-session וה-Router מנתב הביתה.
 */
export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setNotice('')
    setLoading(true)

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({ email, password })
        if (signUpError) throw signUpError
        setNotice('נשלח אליך מייל אישור. אשר אותו ואז אפשר להתחבר')
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) throw signInError
      }
    } catch (err) {
      setError(translateAuthError(err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login">
      <div className="login__brand">
        <Logo size="lg" to={null} />
        <h1 className="login__title">{isSignUp ? 'יצירת חשבון' : 'כניסה לחשבון'}</h1>
        <p className="login__subtitle">כדי לשמור חניות ולדווח על מקומות שהתפנו</p>
      </div>

      {error && <div className="login__error">{error}</div>}
      {notice && <div className="login__notice">{notice}</div>}

      <form className="login__form" onSubmit={handleSubmit}>
        <TextInput
          label="אימייל"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="סיסמה"
          type="password"
          name="password"
          placeholder="לפחות 6 תווים"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PrimaryButton type="submit" fullWidth disabled={loading}>
          {loading ? 'רגע...' : isSignUp ? 'הרשמה' : 'התחברות'}
        </PrimaryButton>
      </form>

      <p className="login__signup">
        {isSignUp ? 'כבר יש לך חשבון? ' : 'עוד אין לך חשבון? '}
        <button
          type="button"
          className="login__toggle"
          onClick={() => {
            setIsSignUp(!isSignUp)
            setError('')
            setNotice('')
          }}
        >
          {isSignUp ? 'לכניסה' : 'להרשמה'}
        </button>
      </p>
    </div>
  )
}

function translateAuthError(message) {
  if (!message) return 'משהו השתבש, נסה שוב'
  if (message.includes('Invalid login credentials')) return 'אימייל או סיסמה שגויים'
  if (message.includes('already registered')) return 'האימייל הזה כבר רשום. אפשר להתחבר'
  if (message.includes('at least 6')) return 'הסיסמה חייבת להיות לפחות 6 תווים'
  if (message.includes('valid email')) return 'כתובת אימייל לא תקינה'
  return message
}
