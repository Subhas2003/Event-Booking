# Evently — Event Discovery & Ticketing (Frontend Demo)

A frontend-only React implementation of the Evently design system: discover events,
view details, select tickets, and get a booking confirmation with a digital pass.

## Stack
- **React 18** — UI
- **Redux Toolkit** — app state (routing/UI, event catalog & filters, ticket selection & orders)
- **Three.js** — animated ambient particle/light-tunnel background in the hero
- **GSAP** — orchestrated page-transition animation on navigation
- **Tailwind CSS** — styling, themed from `DESIGN.md` (Evently Kinetic Dark)

No backend: all data is mocked in `src/data/events.js`, and "checkout" simply
computes totals and generates a booking reference client-side.

## Run locally
```
npm install
npm run dev
```

## Structure
```
src/
  store/        Redux Toolkit slices: ui, events, booking
  data/         Mock event catalog
  components/   Header, Footer, EventCard, Badge, ThreeBackground, PageTransition
  pages/        Home, Explore, EventDetail, Booking
```

## Pages
- **Home** — hero with Three.js ambient visual, featured events, category browser
- **Explore Events** — search + category filters over the catalog
- **Event Detail** — lineup/schedule, ticket tiers with live price breakdown
- **Booking Confirmation** — order summary, QR pass placeholder, booking reference
