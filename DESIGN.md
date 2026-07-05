# DESIGN.md - ParkMe

מערכת העיצוב (Design System) של אפליקציית **ParkMe** - אפליקציית חניה עירונית
המאפשרת למצוא, לדווח ולשתף חניות פנויות בזמן אמת.

- **גישה עיצובית:** "Editorial / Swiss" - שטוח, טיפוגרפי, הרבה white space.
- **עקרונות:** קווי hairline במקום צללים, פינות קטנות (4-8px), שחור-דיו + לבן + אקצנט כחול יחיד. אין גרדיאנטים, אין זוהר, אין אימוג'י.
- **שפה וכיוון:** עברית, RTL. מותג האפליקציה (ParkMe) באנגלית.
- **פונטים:** Heebo לכותרות, Assistant לגוף הטקסט (Google Fonts).

כל טוקני העיצוב מוגדרים כ-CSS Variables בקובץ [`src/styles/globals.css`](src/styles/globals.css).
אין ערכי `hardcode` ברכיבים - כל צבע, פונט, ריווח ורדיוס נגזר מהמשתנים.

---

## 1. צבעים (Color Tokens)

| טוקן | ערך | שימוש |
| --- | --- | --- |
| `--color-ink` | `#0B0B0C` | שחור-דיו: צבע המותג העיקרי, טקסט, כפתורים |
| `--color-text-muted` | `#6B6B70` | טקסט משני |
| `--color-text-subtle` | `#9A9AA0` | טקסט שלישוני, placeholder |
| `--color-bg` | `#FFFFFF` | רקע מסך האפליקציה |
| `--color-surface-alt` | `#F4F4F2` | מילוי עדין, רקע סביב המסך |
| `--color-border` | `#E7E7E4` | קו hairline |
| `--color-border-strong` | `#0B0B0C` | קו הפרדה אדיטוריאלי חזק |
| `--color-accent` | `#1A45E0` | אקצנט כחול יחיד: קישורים, מצב פעיל |
| `--color-free` | `#1C7A45` | סטטוס חניה פנויה |
| `--color-paid` | `#9A6212` | סטטוס חניה בתשלום |
| `--color-taken` | `#A83029` | סטטוס חניה נתפסה |

> **החלטה מודעת:** צבעי הסטטוס הם צבע **פונקציונלי** (מצב), לא קישוט. הם מאופקים ולא מתחרים באקצנט הכחול היחיד.

## 2. טיפוגרפיה (Typography)

- **כותרות:** `--font-heading` = Heebo (400-800), letter-spacing שלילי צמוד.
- **גוף:** `--font-body` = Assistant (400-700).
- **סקאלה:** `--text-xs` (12px) עד `--text-3xl` (52px), עם קפיצות גדולות להיררכיה חדה.
- **eyebrow:** תווית קטנה באותיות רווח (uppercase, letter-spacing רחב) כחתימה אדיטוריאלית.

## 3. ריווח, פינות, קווים

- **Spacing:** סקאלה מ-`--space-1` (4px) ל-`--space-16` (96px), נדיבה במכוון.
- **Radius:** `--radius-sm` (4px), `--radius` (6px), `--radius-lg` (8px), `--radius-full`.
- **קווים במקום צללים:** כרטיסים ושדות משתמשים ב-border בגובה 1px. הצל היחיד (`--shadow-frame`) שמור למסגרת מסך האפליקציה בלבד.

## 4. נגישות (Accessibility)

- כפתור נגישות (`AccessibilityButton`) מפעיל מצב טקסט מוגדל (`data-a11y="large"`) שמגדיל את כל טוקני הפונט גלובלית.
- כיבוד `prefers-reduced-motion`.
- אזורי לחיצה במינימום 38-50px, ניגודיות צבע גבוהה (דיו על לבן).

---

## חלק 1 - פירוק לרכיבים (Component Breakdown)

### רכיבים משותפים (Shared)

| רכיב | באילו עמודים | תיאור |
| --- | --- | --- |
| `Logo` | כל המסכים | לוגו האפליקציה ParkMe |
| `Navbar` | כל המסכים | סרגל עליון: לוגו, ניווט, נגישות |
| `Footer` | כל המסכים | כותרת תחתונה: קישורים + זכויות |
| `BottomNavigation` | Home, Map, Report, Profile | תפריט ניווט תחתון שטוח |
| `ScreenHeader` | Profile, Report, Map | כותרת מסך + כפתור חזרה |
| `AccessibilityButton` | כל המסכים | הגדרות נגישות (הגדלת טקסט) |

### רכיבים לשימוש חוזר (Reusable)

| רכיב | באילו עמודים | תיאור |
| --- | --- | --- |
| `TextInput` | Login, Profile, Report | שדה להזנת מידע (כולל textarea) |
| `PrimaryButton` | Login, Profile, Report, Map | כפתור פעולה ראשי (מילוי דיו) |
| `SecondaryButton` | Login, Profile, Map | כפתור פעולה משני (מתאר) |
| `ToggleSwitch` | Profile, Report | מתג/צ'קבוקס להעדפות |
| `ProfileAvatar` | Profile | תמונת פרופיל (מונוגרם) |
| `SearchBar` | Map | חיפוש כתובת או אזור |
| `ParkingMarker` | Map | סימון חניה על המפה |
| `ParkingDetailsCard` | Home, Map | כרטיס מידע על חניה |
| `QuickActionCard` | Home | שורת פעולה בסגנון אינדקס (מספר + כותרת + חץ) |

### רכיבי מקטע (Section)

| רכיב | באילו עמודים | תיאור |
| --- | --- | --- |
| `ParkingMap` | Map | המפה עם סימוני החניות |

---

## חלק 2 - מפת ניווט (Routing)

| URL | Page Component | תיאור |
| --- | --- | --- |
| `/` | `HomePage` | מסך הבית: הירו צילומי, אינדקס פעולות וחניות קרובות |
| `/login` | `LoginPage` | מסך התחברות למשתמש קיים |
| `/profile` | `ProfilePage` | צפייה ועריכת פרטי המשתמש והעדפותיו |
| `/report-parking` | `ReportParkingPage` | דיווח על חניה פנויה והזנת פרטים |
| `/parking-map` | `ParkingMapPage` | מפת החניות, חיפוש וצפייה בפרטי חניה |
| `*` | `NotFoundPage` | עמוד 404 |

הניווט מנוהל ע"י `react-router-dom`. כל העמודים עטופים ב-`Layout`
המשותף (Navbar + Footer + BottomNavigation) - ראה [`src/App.jsx`](src/App.jsx).

---

## חלק 3 - מבנה תיקיות

```
parkme-react-app/
├── DESIGN.md
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── hero.png                # צילום ההירו (Editorial)
└── src/
    ├── main.jsx
    ├── App.jsx                 # הגדרת הניווט (Routes)
    ├── styles/
    │   └── globals.css         # כל ה-CSS Variables של ה-Design System
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

> כל הנתונים באפליקציה הם **Dummy/Placeholder** - אין חיבור ל-Backend (מודול 6).
