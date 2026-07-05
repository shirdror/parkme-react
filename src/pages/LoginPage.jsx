import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo/Logo.jsx'
import TextInput from '../components/TextInput/TextInput.jsx'
import PrimaryButton from '../components/PrimaryButton/PrimaryButton.jsx'
import SecondaryButton from '../components/SecondaryButton/SecondaryButton.jsx'
import { UserIcon } from '../components/Icons.jsx'
import './LoginPage.css'

/*
 * LoginPage (/login) - מסך התחברות למשתמש קיים.
 * הטופס מדגים בלבד (אין Backend) - שליחה מנווטת לעמוד הבית.
 */
export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // אין חיבור לשרת - הדגמה בלבד. ניווט לעמוד הבית.
    navigate('/')
  }

  return (
    <div className="login">
      <div className="login__brand">
        <Logo size="lg" to={null} />
        <h1 className="login__title">כניסה לחשבון</h1>
        <p className="login__subtitle">כדי לשמור חניות ולדווח על מקומות שהתפנו</p>
      </div>

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
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <a href="#" className="login__forgot" onClick={(e) => e.preventDefault()}>
          שכחת סיסמה?
        </a>

        <PrimaryButton type="submit" fullWidth>
          התחברות
        </PrimaryButton>
      </form>

      <div className="login__divider"><span>או</span></div>

      <SecondaryButton fullWidth icon={<UserIcon width={18} height={18} />} to="/">
        כניסה כאורח
      </SecondaryButton>

      <p className="login__signup">
        עוד אין לך חשבון? <a href="#" onClick={(e) => e.preventDefault()}>להרשמה</a>
      </p>
    </div>
  )
}
