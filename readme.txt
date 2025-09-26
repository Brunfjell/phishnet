*PROJECT STRUCTURE*
/phishnet
├─ /public
│  └─ favicon.ico
│
├─ /src
│  ├─ /components
│  │   ├─ Button.jsx
│  │   ├─ Input.jsx
│  │   ├─ Modal.jsx
│  │   └─ Card.jsx
│  │
│  ├─ /pages
│  │   ├─ /auth
│  │   │   ├─ AuthLayout.jsx
│  │   │   ├─ Login.jsx
│  │   │   └─ Register.jsx
│  │   │
│  │   ├─ /layout
│  │   │   ├─ MainLayout.jsx
│  │   │   └─ Navbar.jsx
│  │   │
│  │   ├─ Dashboard.jsx
│  │   ├─ Employee.jsx
│  │   ├─ Campaigns.jsx
│  │   └─ Simulations.jsx
│  │
│  ├─ /routes
│  │   └─ AppRoutes.jsx
│  │
│  ├─ /stores
│  │   ├─ authStore.js
│  │   ├─ uiStore.js
│  │   └─ simulationStore.js
│  │
│  ├─ /utils
│  │   ├─ supabaseClient.js
│  │   ├─ formatters.js
│  │   └─ validators.js
│  │
│  ├─ /services
│  │   ├─ authService.js
│  │   └─ campaignService.js
│  │
│  ├─ /hooks
│  │   ├─ useAuth.js
│  │   └─ useProfile.js
│  │
│  ├─ /styles
│  │   └─ globals.css
│  │
│  ├─ main.jsx
│  └─ App.jsx
│
├─ index.html
├─ package.json
└─ vite.config.js

INSTRUCTIONS
IF DOWNLOADING, DO 
npm i 
FIRST TO INSTALL ALL DEPENDENCIES

THEN CREATE A 
.env.local
AT THE ROOT OF THE FOLDER

THEN PASTE THIS AS THE CONTENT
VITE_SUPABASE_URL=https://gvuqenkdtvetefytqqlo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2dXFlbmtkdHZldGVmeXRxcWxvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODg0NDYwNiwiZXhwIjoyMDc0NDIwNjA2fQ._ucpfXmBg62Ky-Ynz42z7cDiKCoDJXYGCY9irXH1QoY
