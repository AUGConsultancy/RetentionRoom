# Retention Room — MERN Landing Page

Premium dark-mode landing page + lead-capture backend for a YouTube management agency.

## Structure

```
retention-room/
├── client/                        # React (Vite) + Tailwind + Framer Motion
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       └── components/
│           ├── Navbar.jsx
│           ├── Hero.jsx
│           ├── Services.jsx
│           ├── Stats.jsx
│           ├── BookingForm.jsx
│           └── Footer.jsx
│
└── server/                        # Node + Express + Mongoose + Nodemailer
    ├── package.json
    ├── .env.example
    ├── server.js
    ├── config/
    │   ├── db.js                  # MongoDB connection
    │   └── mailer.js              # Nodemailer transporter
    ├── models/
    │   └── Lead.js                # Mongoose schema for booking leads
    ├── routes/
    │   └── booking.js             # POST /api/book-call
    └── controllers/                # (reserved for future route logic)
```

## Setup

### Backend

```bash
cd server
npm install
cp .env.example .env   # fill in MONGO_URI, SMTP credentials, ADMIN_EMAIL
npm run dev            # starts on http://localhost:5000
```

### Frontend

```bash
cd client
npm install
npm run dev             # starts on http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:5000` (see `client/vite.config.js`), so `BookingForm.jsx` can call `axios.post('/api/book-call', ...)` without hardcoding a host.

## Notes

- **SMTP**: Any SMTP provider works (Gmail app password, SendGrid, Resend, Postmark). Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` in `server/.env`.
- **Design tokens** (colors, fonts, shadows) live in `client/tailwind.config.js` — change `violet` / `volt` hex values there to retheme everything at once.
- **Fonts**: Space Grotesk (headings), Syne (logo/display accents), Inter (body) — loaded via Google Fonts in `client/index.html`.
- Deploy the client to Vercel/Netlify and the server to Render/Railway; set `CLIENT_URL` on the server and point the client's API calls (or Vite proxy) at the deployed API URL.
