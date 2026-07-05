# DESIGN.md — ParkMe

מערכת העיצוב (Design System) של אפליקציית **ParkMe** — אפליקציית חניה עירונית
המאפשרת למצוא, לדווח ולשתף חניות פנויות בזמן אמת.

- **גישה עיצובית:** "Urban Blue" — נקי, אמין, מודרני, mobile-first.
- **שפה וכיוון:** עברית, RTL. מותג האפליקציה (ParkMe) באנגלית.
- **פונטים:** Heebo לכותרות, Assistant לגוף הטקסט (Google Fonts).

כל טוקני העיצוב מוגדרים כ־CSS Variables בקובץ [`src/styles/globals.css`](src/styles/globals.css).
אין ערכי `hardcode` ברכיבים — כל צבע, פונט, ריווח ורדיוס נגזר מהמשתנים.

---

## 1. צבעים (Color Tokens)

| טוקן | ערך | שימוש |
| --- | --- | --- |
| `--color-primary` | `#1D4ED8` | צבע מותג ראשי, כפתורים, קישורים |
| `--color-primary-dark` | `#1E40AF` | Hover של כפתורים ראשיים |
| `--color-primary-light` | `#3B82F6` | הדגשות, גבולות פעילים |
| `--color-primary-50/100` | `#EFF6FF` / `#DBEAFE` | רקעים רכים, מצבי focus |
| `--color-accent` | `#16A34A` | ירוק "חניה פנויה", דגשים חיוביים |
| `--color-warning` | `#D97706` | חניה בתשלום |
| `--color-danger` | `#DC2626` | חניה נתפסה, שגיאות |
| `--color-bg` | `#F8FAFC` | רקע מסך האפליקציה |
| `--color-surface` | `#FFFFFF` | כרטיסים, סרגלים, שדות |
| `--color-text` | `#0F172A` | טקסט ראשי |
| `--color-text-muted` | `#64748B` | טקסט משני |
| `--color-border` | `#E2E8F0` | גבולות |

## 2. טיפוגרפיה (Typography)

- **כותרות:** `--font-heading` = Heebo (400–800)
- **גוף:** `--font-body` = Assistant (400–700)
- **סקאלה:** `--text-xs` (12px) → `--text-3xl` (36px)

## 3. ריווח, רדיוסים, צללים

- **Spacing:** סקאלה מ־`--space-1` (4px) ל־`--space-16` (64px).
- **Radius:** `--radius-sm` (8px), `--radius` (12px), `--radius-lg` (16px), `--radius-xl` (24px), `--radius-full`.
- **Shadow:** `--shadow-sm` → `--shadow-lg` + `--shadow-primary` (הילה כחולה לכפתורים).

## 4. נגישות (Accessibility)

- כפתור נגישות (`AccessibilityButton`) מפעיל מצב טקסט מוגדר (`data-a11y="large"`)
  שמגדיל את כל טוקני הפונט גלובלית.
- כיבוד `prefers-reduced-motion`.
- אזורי לחיצה במינימום 40–50px, ניגודיות צבע תקנית.

---

## חלק 1 — פירוק לרכיבים (Component Breakdown)

### רכיבים משותפים (Shared)

| רכיב | באילו עמודים | תיאור |
| --- | --- | --- |
| `Logo` | כל המסכים | לוגו האפליקציה ParkMe |
| `Navbar` | כל המסכים | סרגל עליון: לוגו, ניווט, נגישות |
| `Footer` | כל המסכים | כותרת תחתונה: קישורים + זכויות |
| `BottomNavigation` | Home, Map, Report, Profile | תפריט ניווט תחתון בסגנון אפליקציה |
| `ScreenHeader` | Profile, Report, Map | כותרת מסך + כפתור חזרה |
| `AccessibilityButton` | כל המסכים | הגדרות נגישות (הגדלת טקסט) |

### רכיבים לשימוש חוזר (Reusable)

| רכיב | באילו עמודים | תיאור |
| --- | --- | --- |
| `TextInput` | Login, Profile, Report | שדה להזנת מידע (כולל textarea) |
| `PrimaryButton` | Login, Profile, Report, Map | כפתור פעולה ראשי |
| `SecondaryButton` | Login, Profile, Map | כפתור פעולה משני |
| `ToggleSwitch` | Profile, Report | מתג/צ'קבוקס להעדפות |
| `ProfileAvatar` | Profile | תמונת פרופיל (ראשי תיבות) |
| `SearchBar` | Map | חיפוש כתובת או אזור |
| `ParkingMarker` | Map | סימון חניה על המפה |
| `ParkingDetailsCard` | Home, Map | כרטיס מידע על חניה |
| `QuickActionCard` | Home | כרטיס פעולה מהירה |

### רכיבי מקטע (Section)

| רכיב | באילו עמודים | תיאור |
| --- | --- | --- |
| `ParkingMap` | Map | המפה עם סימוני החניות |

---

## חלק 2 — מפת ניווט (Routing)

| URL | Page Component | תיאור |
| --- | --- | --- |
| `/` | `HomePage` | מסך הבית עם גישה למסכים הראשיים |
| `/login` | `LoginPage` | מסך התחברות למשתמש קיים |
| `/profile` | `ProfilePage` | צפייה ועריכת פרטי המשתמש והעדפותיו |
| `/report-parking` | `ReportParkingPage` | דיווח על חניה פנויה והזנת פרטים |
| `/parking-map` | `ParkingMapPage` | מפת החניות, חיפוש וצפייה בפרטי חניה |
| `*` | `NotFoundPage` | עמוד 404 |

הניווט מנוהל ע"י `react-router-dom`. כל העמודים עטופים ב־`Layout`
המשותף (Navbar + Footer + BottomNavigation) — ראה [`src/App.jsx`](src/App.jsx).

---

## חלק 3 — מבנה תיקיות

```
parkme-react-app/
├── DESIGN.md
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx                 # הגדרת הניווט (Routes)
    ├── styles/
    │   └── globals.css         # כל ה־CSS Variables של ה-Design System
    ├── data/                   # נתוני Dummy (ללא Backend)
    │   ├── parkingSpots.js
    │   └── user.js
    ├── components/             # רכיבים משותפים + לשימוש חוזר
    │   ├── Layout.jsx
    │   ├── Icons.jsx
    │   ├── Logo/  Navbar/  Footer/  BottomNavigation/  ScreenHeader/
    │   ├── PrimaryButton/  SecondaryButton/  TextInput/  ToggleSwitch/
    │   ├── ProfileAvatar/  SearchBar/  AccessibilityButton/
    │   └── ParkingMap/  ParkingMarker/  ParkingDetailsCard/  QuickActionCard/
    └── pages/                  # Page Components
        ├── HomePage.jsx
        ├── LoginPage.jsx
        ├── ProfilePage.jsx
        ├── ReportParkingPage.jsx
        ├── ParkingMapPage.jsx
        └── NotFoundPage.jsx
```

> כל הנתונים באפליקציה הם **Dummy/Placeholder** — אין חיבור ל־Backend (מודול 6).
