-- ParkMe Database Schema
-- Run this in: Supabase Dashboard > SQL Editor

-- =====================
-- TABLES
-- =====================

-- חניות ידועות בעיר (רחובות / חניונים) - נתוני בסיס
create table parking_spots (
  id         uuid default gen_random_uuid() primary key,
  title      text not null,
  area       text not null,
  kind       text check (kind in ('street', 'lot')) default 'street',
  base_price text,
  lat        numeric(9,6) not null,
  lng        numeric(9,6) not null,
  created_at timestamptz default now()
);

-- דיווחי סטטוס חיים על חניה (הבסיס ל-Realtime)
create table parking_reports (
  id         uuid default gen_random_uuid() primary key,
  spot_id    uuid references parking_spots(id) on delete cascade not null,
  user_id    uuid references auth.users(id) on delete cascade not null,
  status     text check (status in ('free', 'paid', 'taken')) not null,
  notes      text,
  created_at timestamptz default now()
);

-- חניות שמורות למשתמש
create table favorites (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid references auth.users(id) on delete cascade not null,
  spot_id    uuid references parking_spots(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, spot_id)
);

-- =====================
-- ROW LEVEL SECURITY
-- =====================

alter table parking_spots   enable row level security;
alter table parking_reports enable row level security;
alter table favorites       enable row level security;

-- Parking spots: כל אחד יכול לקרוא, משתמש מחובר יכול להוסיף חניה חדשה
create policy "spots_public_read"
  on parking_spots for select using (true);

create policy "spots_auth_insert"
  on parking_spots for insert to authenticated
  with check (true);

-- Parking reports: כל אחד קורא, רק משתמש מחובר מדווח בשמו
create policy "reports_public_read"
  on parking_reports for select using (true);

create policy "reports_auth_insert"
  on parking_reports for insert
  with check (auth.uid() = user_id);

-- Favorites: כל משתמש רואה/עורך רק את שלו
create policy "favorites_owner_all"
  on favorites for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =====================
-- SEED DATA
-- =====================

insert into parking_spots (title, area, kind, base_price, lat, lng) values
  ('רחוב דיזנגוף 120',    'לב תל אביב',          'street', null,        32.079300, 34.774900),
  ('שדרות רוטשילד 45',    'המושבה האמריקאית',    'street', '₪6 לשעה',   32.064100, 34.773600),
  ('רחוב אבן גבירול 30',  'הצפון הישן',          'street', null,        32.081200, 34.780600),
  ('רחוב הרצל 8',         'נווה צדק',            'street', null,        32.062500, 34.768800),
  ('חניון עזריאלי',       'מרכז עזריאלי',        'lot',    '₪12 לשעה',  32.074100, 34.792500),
  ('רחוב שינקין 22',      'לב תל אביב',          'street', null,        32.069800, 34.774300),
  ('רחוב ארלוזורוב 15',   'הצפון הישן',          'street', '₪6 לשעה',   32.086900, 34.781200),
  ('חניון דיזנגוף סנטר',  'לב תל אביב',          'lot',    '₪10 לשעה',  32.075400, 34.774800);

-- דיווח סטטוס התחלתי לכל חניה (משתמש דמו יוזרק אוטומטית בהמשך, כאן ללא user_id)
-- אפשר להריץ אחרי הרשמת המשתמש הראשון, או להשאיר לסטטוס להיווצר מדיווחים אמיתיים.

-- =====================
-- REALTIME
-- =====================

-- Supabase Dashboard > Database > Replication:
-- הוסף את הטבלה parking_reports ל-publication בשם supabase_realtime.
-- או הרץ:
--   alter publication supabase_realtime add table parking_reports;
