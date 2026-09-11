# Nivara Design Studio — Website

A full MERN-stack implementation of the Nivara Design Studio landing site
(Home, About Us, Portfolio, Contact), built from the approved Figma design.

- **M**ongoDB — stores contact enquiries and portfolio projects
- **E**xpress — REST API (`/api/contact`, `/api/portfolio`)
- **R**eact — the site itself (Vite + React Router)
- **N**ode — runs the Express server

```
nivara-design-studio/
├── client/     React frontend (Vite)
└── server/     Express + MongoDB API
```

## 1. Prerequisites

- [Node.js](https://nodejs.org) 18 or newer
- A MongoDB database — either:
  - a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (recommended, no local install needed), or
  - MongoDB running locally

## 2. Setup

```bash
# from the project root
npm run install:all
```

This installs dependencies for both `client/` and `server/`.

### Configure the server

```bash
cd server
cp .env.example .env
```

Open `server/.env` and set `MONGODB_URI` to your connection string, e.g.:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/nivara?retryWrites=true&w=majority
```

### Configure the client (optional for local dev)

```bash
cd client
cp .env.example .env
```

For local development you can leave `VITE_API_URL` blank — Vite proxies
`/api` requests to `http://localhost:5000` automatically (see
`client/vite.config.js`). You'll only need to set this once the API is
deployed somewhere separate from the frontend (see Deployment below).

## 3. Load sample portfolio content (optional but recommended)

The Portfolio page reads projects from MongoDB. Seed it with sample
projects (using stock photos as placeholders) so the page isn't empty:

```bash
npm run seed
```

Open `server/seed/seedPortfolio.js` any time to edit, add, or remove
projects — then re-run `npm run seed`. Long-term, you'll likely want a
small admin screen or MongoDB Atlas's own data browser to manage these
without touching code; ask if you'd like that built next.

## 4. Run it locally

```bash
# from the project root — runs both server (5000) and client (5173)
npm run dev
```

Visit **http://localhost:5173**. The contact form on the Contact page
saves enquiries to your `contacts` collection in MongoDB; portfolio
items are read from the `portfolios` collection.

## 5. Brand assets — one thing to swap in

I couldn't pull the actual Nivara peacock logo file or your real project
photography out of the Figma design in this session, so:

- **Logo**: `client/src/components/Logo.jsx` currently draws a
  hand-recreated SVG peacock mark that matches the design closely.
  Replace it with the real logo file (e.g. drop `logo.svg` into
  `client/public/` and swap the `<svg>` in `Logo.jsx` for an `<img>`
  tag) whenever you have it, for an exact brand match.
- **Photos**: About, Portfolio, and the seed data use royalty-free
  Unsplash stock photos as placeholders. Replace the `imageUrl` values
  in `server/seed/seedPortfolio.js` (and the image in `About.jsx`) with
  real photography of your projects, then re-run `npm run seed`.

Everything else — layout, colors, type, copy, the Contact & Sitemap
section, filters — is built to match the screenshots you shared.

## 6. Deployment (making it "live")

The simplest reliable split for a non-technical owner to maintain:

**Frontend (client/) → Vercel or Netlify**
1. Push this project to a GitHub repo.
2. Import it in Vercel/Netlify, set the project's root directory to `client`.
3. Build command: `npm run build`. Output directory: `dist`.
4. Add an environment variable `VITE_API_URL` = your deployed API URL (step below).
   - Netlify already has the SPA redirect rule (`client/public/_redirects`) so routes like `/portfolio` work on refresh.
   - Vercel already has `client/vercel.json` for the same reason.

**Backend (server/) → Render or Railway**
1. Create a new Web Service pointing at the `server` folder of the same repo.
2. Build command: `npm install`. Start command: `npm start`.
3. Add environment variables from `server/.env.example`:
   - `MONGODB_URI` — your Atlas connection string
   - `CLIENT_ORIGIN` — your deployed frontend URL (e.g. `https://nivaradesignstudio.com`), so the API accepts requests from it
   - `PORT` — most hosts set this automatically; safe to leave as-is
4. Once deployed, copy the service's URL into the frontend's `VITE_API_URL` and redeploy the frontend.

**Alternative — one service does both.** If you'd rather manage a single
deployment, set `NODE_ENV=production`, run `npm run build:client`, then
`npm start` from the project root — the Express server will also serve
the built React app directly (see the bottom of `server/server.js`).
This works well on Render as a single Web Service.

**Domain**: once you have `nivaradesignstudio.com` (mentioned in the
design), point it at whichever service hosts the frontend, and set up
`CLIENT_ORIGIN` / `VITE_API_URL` to match.

## 7. What's built in

- Home, About, Portfolio, Contact pages matching the approved design
- Working "Send an Enquiry" form → saved to MongoDB (`/api/contact`)
- Filterable Portfolio grid, reading from MongoDB (`/api/portfolio`)
- Mobile-responsive layout and navigation
- Basic spam protection (rate limiting) on the contact endpoint
- SPA routing configs for Netlify and Vercel

## 8. Sensible next steps (not built yet, happy to add)

- A simple password-protected admin page to read enquiries and manage
  portfolio projects without touching code or MongoDB directly
- Email notifications when a new enquiry comes in (e.g. via Resend or
  Nodemailer + Gmail)
- Real photography and the official logo file in place of placeholders
