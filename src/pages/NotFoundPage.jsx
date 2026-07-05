import PrimaryButton from '../components/PrimaryButton/PrimaryButton.jsx'
import { PinIcon } from '../components/Icons.jsx'
import './NotFoundPage.css'

/*
 * NotFoundPage (*) - עמוד 404 לכתובת לא מוכרת.
 */
export default function NotFoundPage() {
  return (
    <div className="notfound">
      <span className="notfound__icon">
        <PinIcon width={40} height={40} />
      </span>
      <h1 className="notfound__code">404</h1>
      <p className="notfound__text">הכתובת הזאת לא קיימת</p>
      <PrimaryButton to="/">חזרה לדף הבית</PrimaryButton>
    </div>
  )
}
