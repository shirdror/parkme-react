/*
 * נתוני Dummy - חניות פנויות בעיר.
 * אין חיבור ל-Backend. הכל סטטי לצורך הדגמת ה-Frontend (מודול 6).
 * במודול הבא (Data Design) התוכן הזה יגדיר מה ה-Database צריך לאחסן.
 */
export const parkingSpots = [
  {
    id: 1,
    title: 'רחוב דיזנגוף 120',
    area: 'לב תל אביב',
    distance: '90 מ׳',
    status: 'free', // free | paid | taken
    price: null,
    time: 'לפני 2 דקות',
    reporter: 'דנה כ.',
    lat: 32.0793,
    lng: 34.7749,
  },
  {
    id: 2,
    title: 'שדרות רוטשילד 45',
    area: 'המושבה האמריקאית',
    distance: '210 מ׳',
    status: 'paid',
    price: '₪6 לשעה',
    time: 'לפני 5 דקות',
    reporter: 'יואב מ.',
    lat: 32.0641,
    lng: 34.7736,
  },
  {
    id: 3,
    title: 'רחוב אבן גבירול 30',
    area: 'הצפון הישן',
    distance: '340 מ׳',
    status: 'free',
    price: null,
    time: 'לפני 8 דקות',
    reporter: 'נועה ב.',
    lat: 32.0812,
    lng: 34.7806,
  },
  {
    id: 4,
    title: 'רחוב הרצל 8',
    area: 'נווה צדק',
    distance: '520 מ׳',
    status: 'taken',
    price: null,
    time: 'לפני 12 דקות',
    reporter: 'איתי ל.',
    lat: 32.0625,
    lng: 34.7688,
  },
  {
    id: 5,
    title: 'חניון עזריאלי',
    area: 'מרכז עזריאלי',
    distance: '650 מ׳',
    status: 'paid',
    price: '₪12 לשעה',
    time: 'לפני 15 דקות',
    reporter: 'שיר ד.',
    lat: 32.0741,
    lng: 34.7925,
  },
]

export const statusLabels = {
  free: { label: 'פנויה', color: 'var(--color-free)', bg: 'var(--color-free-bg)' },
  paid: { label: 'בתשלום', color: 'var(--color-paid)', bg: 'var(--color-paid-bg)' },
  taken: { label: 'נתפסה', color: 'var(--color-taken)', bg: 'var(--color-taken-bg)' },
}
