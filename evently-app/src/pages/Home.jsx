import { useDispatch, useSelector } from 'react-redux'
import { navigate } from '../store/uiSlice.js'
import { setCategoryFilter } from '../store/eventsSlice.js'
import ThreeBackground from '../components/ThreeBackground.jsx'
import EventCard from '../components/EventCard.jsx'
import { CATEGORIES } from '../data/events.js'

export default function Home() {
  const dispatch = useDispatch()
  const events = useSelector((s) => s.events.items)
  const featured = events.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 px-4 md:px-8 lg:px-16">
        <ThreeBackground className="absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/20 via-canvas/60 to-canvas pointer-events-none" />

        <div className="relative max-w-content mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface2/70 backdrop-blur text-xs font-display font-semibold text-tertiary-bright border border-tertiary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-bright animate-pulse" />
              Live Arena &amp; Discovery Hub — Winter Season 2026
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-[1.05] text-text-primary tracking-tight">
              Discover events.
              <br />
              Create <span className="gradient-text">memories.</span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-xl leading-relaxed">
              Concerts, workshops, summits, and festivals happening around Kolkata — with instant,
              frictionless ticket checkouts.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => dispatch(navigate({ page: 'explore' }))}
                className="px-6 py-3 rounded-control bg-gradient-to-r from-primary to-secondary text-white font-display font-semibold shadow-cta hover:shadow-cta-hover transition-all hover:-translate-y-0.5"
              >
                Explore Events
              </button>
              <button className="px-6 py-3 rounded-control bg-white/5 border border-white/15 text-text-primary font-display font-semibold hover:border-primary/50 hover:bg-primary/10 transition-all">
                Host an Event
              </button>
            </div>
            <div className="flex flex-wrap gap-8 pt-4">
              <Stat label="Live Experiences" value="2,400+" />
              <Stat label="Attendee Rating" value="4.9/5" />
              <Stat label="Digital QR Passes" value="Instant" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <SearchCard />
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="px-4 md:px-8 lg:px-16 py-14">
        <div className="max-w-content mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-tertiary-bright font-display font-semibold mb-1">
                Handpicked Highlights
              </p>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary">Featured Events</h2>
            </div>
            <button
              onClick={() => dispatch(navigate({ page: 'explore' }))}
              className="text-sm font-display font-semibold text-primary hover:text-secondary-bright transition-colors whitespace-nowrap"
            >
              View all →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Explore by category */}
      <section className="px-4 md:px-8 lg:px-16 py-14">
        <div className="max-w-content mx-auto">
          <p className="text-xs uppercase tracking-wide text-secondary-bright font-display font-semibold mb-1">
            Browse by Interest
          </p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-text-primary mb-8">Explore by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  dispatch(setCategoryFilter(cat.name.split(' ')[0] === 'Music' ? 'Music & Concerts' : cat.name))
                  dispatch(navigate({ page: 'explore' }))
                }}
                className="text-left p-5 rounded-card bg-surface1 border border-white/[0.06] hover:border-primary/40 hover:-translate-y-1 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/25 to-tertiary/25 flex items-center justify-center mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>
                <p className="font-display font-semibold text-text-primary text-sm">{cat.name}</p>
                <p className="text-xs text-text-tertiary mt-0.5">{cat.count}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Host CTA */}
      <section className="px-4 md:px-8 lg:px-16 pb-20">
        <div className="max-w-content mx-auto rounded-card bg-gradient-to-br from-surface1 to-surface2 border border-primary/20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-l2">
          <div>
            <p className="text-xs uppercase tracking-wide text-primary font-display font-semibold mb-2">
              Partner With Evently
            </p>
            <h3 className="font-display font-bold text-2xl text-text-primary max-w-md">
              Are you an event organizer or festival creator?
            </h3>
          </div>
          <button className="px-6 py-3 rounded-control bg-gradient-to-r from-primary to-secondary text-white font-display font-semibold shadow-cta hover:shadow-cta-hover transition-all hover:-translate-y-0.5 whitespace-nowrap">
            Start Hosting Today
          </button>
        </div>
      </section>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="font-display font-bold text-xl text-text-primary">{value}</p>
      <p className="text-xs text-text-tertiary">{label}</p>
    </div>
  )
}

function SearchCard() {
  const dispatch = useDispatch()
  return (
    <div className="rounded-card bg-surface1/90 backdrop-blur-md border border-white/10 p-6 shadow-l3">
      <p className="font-display font-semibold text-text-primary mb-4">Find your next experience</p>
      <div className="flex flex-col gap-3">
        <Field label="Looking for" placeholder="Artists, events, venues..." />
        <Field label="City or venue" placeholder="Kolkata, India" />
        <Field label="Date" placeholder="This weekend" />
        <button
          onClick={() => dispatch(navigate({ page: 'explore' }))}
          className="mt-1 w-full py-3 rounded-control bg-gradient-to-r from-primary to-secondary text-white font-display font-semibold shadow-cta hover:shadow-cta-hover transition-all"
        >
          Find Events
        </button>
      </div>
    </div>
  )
}

function Field({ label, placeholder }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-wide text-text-tertiary font-display font-semibold mb-1">
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-control bg-surface2 border border-white/10 text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </label>
  )
}
