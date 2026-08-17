# Frame House Palakkad — Venue Website (MERN)

Single-page site for Frame House, a photoshoot/event venue in Vettumpully,
Palakkad. Built with React (Vite) on the front end and a minimal Express +
MongoDB (Mongoose) backend for booking enquiries.

## Real details already in place
- Venue name: Frame House ("Make Your Moments with our Frames")
- Phone: 88484 77706 / 96337 77706 / 62823 88736
- Instagram: @framehousepalakkad
- Location: Vettumpully, Palakkad

## Still to confirm before launch
- Exact address for the Google Maps pin (currently just searches "Vettumpully, Palakkad")
- Working hours (currently a placeholder 8:00 AM – 6:30 PM, Mon–Sun)
- Real business email (currently framehousepalakkad@gmail.com — confirm this is correct)
- Copy under Hero / About — written as placeholder, keep the tone or rewrite

## Structure
```
client/   React + Vite frontend (the site itself)
server/   Express + Mongoose API for booking enquiries
```

## Run the frontend
```
cd client
npm install
npm run dev
```
Opens at http://localhost:5173

## Run the backend
```
cd server
npm install
cp .env.example .env   # set MONGO_URI if you have MongoDB running
npm run dev
```
Runs at http://localhost:5000 — the frontend's `vite.config.js` already
proxies `/api` calls to it.

## Gallery
- `src/assets/gallery/traditional/` — heritage & festive frames (post office, floral wall, marigold arch, tharavadu courtyard)
- `src/assets/gallery/western/` — modern arch & minimal frames (indigo arch, violet arch, white arch, pavilion)
- `src/assets/gallery/motion/` — the four images used in the scrolling "Moments in Motion" column
- `src/assets/gallery/props/` — rental props/furniture shown in the "Props & Furniture Available" section (guitar, flower stands, floor vase). Add more by dropping a file in this folder, importing it in `App.jsx`, and adding it to the `PROPS` array.

Swap any image by replacing the file in place (keep the same filename) or
update the import path in `App.jsx`.

## The scroll-motion column
In `App.jsx`, the `.motion-track` has two image columns whose `transform:
translateY()` is recalculated on scroll — they drift up as you scroll down
and back down as you scroll up. The caption text beside them (`.motion-text`)
is a separate sticky element with no transform applied, so it stays in place
while the images move. Tune the drift speed by editing the `220` / `160`
multipliers in the `offsetA` / `offsetB` calculation.

## Booking form
The contact form currently just shows an alert on submit. To wire it to the
backend, replace the `onSubmit` handler in `App.jsx` with a `fetch('/api/bookings', { method: 'POST', ... })` call.

## Next steps for production
- Connect a real MongoDB URI (Atlas or self-hosted) in `server/.env`
- Deploy `client` (Vercel/Netlify) and `server` (Render/Railway), set CORS origin accordingly
- Compress gallery images before shipping (currently a few are 2–4MB — run through TinyPNG or `sharp` for web sizes)
