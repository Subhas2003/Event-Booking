import { useSelector, useDispatch } from 'react-redux'
import { setSearch, setCategoryFilter, selectFilteredEvents } from '../store/eventsSlice.js'
import EventCard from '../components/EventCard.jsx'

const CATEGORY_TABS = [
  'All',
  'Music & Concerts',
  'Technology & Web3',
  'Business & Startups',
  'Workshops & Masterclasses',
  'Arts & Culture',
  'Standup & Comedy',
]

export default function Explore() {
  const dispatch = useDispatch()
  const search = useSelector((s) => s.events.search)
  const categoryFilter = useSelector((s) => s.events.categoryFilter)
  const filtered = useSelector(selectFilteredEvents)

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-content mx-auto">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface2/70 text-[11px] font-display font-semibold text-tertiary-bright border border-tertiary/20 mb-3">
          Live Arena Discovery
        </span>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-2">Explore Events</h1>
        <p className="text-text-secondary mb-8">Find your next unforgettable experience in Kolkata &amp; beyond.</p>

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <input
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              type="text"
              placeholder="Search events, artists, arenas, or genres..."
              className="w-full pl-11 pr-4 py-3 rounded-control bg-surface1 border border-white/10 text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">
              <SearchIcon />
            </span>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-1 px-1">
          {CATEGORY_TABS.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setCategoryFilter(cat))}
              className={`px-4 py-2 rounded-full text-sm font-display font-semibold whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-primary/20 text-primary border border-primary/40'
                  : 'bg-surface1 text-text-secondary border border-white/10 hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-sm text-text-tertiary mb-4">
          Showing {filtered.length} of {useSelector((s) => s.events.items.length)} events
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-card bg-surface1 border border-white/10 p-12 text-center">
            <p className="font-display font-semibold text-text-primary mb-1">No events match your search</p>
            <p className="text-text-secondary text-sm">Try a different keyword or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
