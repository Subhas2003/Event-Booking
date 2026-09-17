import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { navigate } from '../store/uiSlice.js'
import { toggleWishlist } from '../store/eventsSlice.js'
import Badge from './Badge.jsx'

export default function EventCard({ event }) {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()
  const wishlist = useSelector((s) => s.events.wishlist)
  const isWishlisted = wishlist.includes(event.id)
  const imageStyle = event.image.startsWith('http')
    ? { background: `url("${event.image}") center / cover no-repeat` }
    : { background: event.image }
  const openEvent = () => {
    dispatch(navigate({ page: 'event', eventId: event.id }))
    navigateTo(`/event/${event.id}`)
  }

  return (
    <div className="group rounded-card overflow-hidden bg-surface1 border border-white/[0.07] shadow-l1 hover:shadow-l2 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div
        onClick={openEvent}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openEvent()
          }
        }}
        role="button"
        tabIndex={0}
        className="relative aspect-[16/9] w-full overflow-hidden"
        style={imageStyle}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge tone={event.tagTone}>{event.tag}</Badge>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            dispatch(toggleWishlist(event.id))
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-canvas/50 backdrop-blur flex items-center justify-center text-text-secondary hover:text-secondary-bright transition-colors"
          aria-label="Save to wishlist"
        >
          <HeartIcon filled={isWishlisted} />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-xs text-text-tertiary font-body">
          {event.date} &middot; {event.venue}
        </p>
        <button
          onClick={openEvent}
          className="text-left font-display font-semibold text-text-primary leading-snug hover:text-primary transition-colors"
        >
          {event.title}
        </button>
        <p className="text-sm text-text-secondary line-clamp-2">{event.subtitle}</p>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-text-tertiary uppercase tracking-wide font-display">
              {event.startingPrice === 0 ? 'Entry' : 'Starts from'}
            </p>
            <p className="font-display font-bold text-text-primary">
              {event.startingPrice === 0 ? 'Free' : `₹${event.startingPrice}`}
            </p>
          </div>
          <button
            onClick={openEvent}
            className="px-4 py-2 rounded-control bg-surface2 text-text-primary font-display font-semibold text-sm group-hover:bg-primary group-hover:text-white transition-colors"
          >
            {event.startingPrice === 0 ? 'RSVP' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  )
}

function HeartIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M20.8 4.6c-1.8-1.8-4.7-1.8-6.5 0L12 6.9l-2.3-2.3c-1.8-1.8-4.7-1.8-6.5 0-1.8 1.8-1.8 4.7 0 6.5L12 20.4l8.8-9.3c1.8-1.8 1.8-4.7 0-6.5z" />
    </svg>
  )
}
