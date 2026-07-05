import { SearchIcon } from '../Icons.jsx'
import './SearchBar.css'

/*
 * SearchBar (Reusable) - שדה חיפוש כתובת או אזור. בשימוש בעמוד Parking Map.
 */
export default function SearchBar({ value, onChange, placeholder = 'חיפוש כתובת או אזור...' }) {
  return (
    <div className="searchbar">
      <SearchIcon width={20} height={20} className="searchbar__icon" />
      <input
        type="search"
        className="searchbar__input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label="חיפוש חניה"
      />
    </div>
  )
}
