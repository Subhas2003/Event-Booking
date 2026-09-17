import { useSelector, useDispatch } from 'react-redux'
import { navigate } from '../store/uiSlice.js'
import { setTierCount, confirmOrder } from '../store/bookingSlice.js'
import Badge from '../components/Badge.jsx'

export default function EventDetail() {
  const dispatch = useDispatch()
  const eventId = useSelector((s) => s.ui.selectedEventId)
  const event = useSelector((s) => s.events.items.find((e) => e.id === eventId))
  const selection = useSelector((s) => s.booking.selections[eventId] || {})
  const imageStyle = event?.image.startsWith('http')
    ? { background: `url("${event.image}") center / cover no-repeat` }
    : { background: event?.image }

  if (!event) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <p className="text-text-secondary mb-4">Event not found.</p>
        <button onClick={() => dispatch(navigate({ page: 'explore' }))} className="text-primary font-display font-semibold">
          Back to Explore Events
        </button>
      </div>
    )
  }

  const totalTickets = Object.values(selection).reduce((a, b) => a + b, 0)
  const subtotal = event.tiers.reduce((sum, t) => sum + t.price * (selection[t.name] || 0), 0)
  const convenienceFee = Math.round(subtotal * 0.05)
  const tax = Math.round((subtotal + convenienceFee) * 0.18)
  const total = subtotal + convenienceFee + tax

  const handleCheckout = () => {
    if (totalTickets === 0) return
    dispatch(confirmOrder({ event, tiers: event.tiers }))
    dispatch(navigate({ page: 'booking' }))
  }

  return (
    <div>
      <div className="relative h-64 md:h-80 w-full" >
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-transparent" />
        <div role="img" aria-label={event.title} className="absolute inset-0 w-full h-full" style={imageStyle} />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-content mx-auto w-full px-4 md:px-8 lg:px-16 pb-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge tone={event.tagTone}>{event.tag}</Badge>
              <Badge tone="live">Verified Organizer</Badge>
            </div>
            <h1 className="font-display font-extrabold text-2xl md:text-4xl text-text-primary max-w-2xl">
              {event.title}: <span className="gradient-text">{event.subtitle}</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-content mx-auto px-4 md:px-8 lg:px-16 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <InfoTile label="Date" value={event.date} />
            <InfoTile label="Time" value={event.time} />
            <InfoTile label="Venue" value={event.venue} />
            <InfoTile label="Starting Tier" value={event.startingPrice === 0 ? 'Free RSVP' : `₹${event.startingPrice}/person`} />
          </div>

          <section className="rounded-card bg-surface1 border border-white/[0.07] p-6">
            <h2 className="font-display font-semibold text-lg text-text-primary mb-3">About This Event</h2>
            <p className="text-text-secondary leading-relaxed mb-4">{event.description}</p>
            <div className="flex flex-wrap gap-2">
              {event.perks.map((perk) => (
                <span key={perk} className="px-3 py-1.5 rounded-lg bg-surface2 text-xs text-text-secondary border border-white/5">
                  {perk}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-card bg-surface1 border border-white/[0.07] p-6">
            <h2 className="font-display font-semibold text-lg text-text-primary mb-4">Lineup &amp; Schedule</h2>
            <div className="space-y-0">
              {event.lineup.map((slot, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 py-4 ${i !== 0 ? 'border-t border-white/5' : ''}`}
                >
                  <span className="text-tertiary-bright text-sm font-display font-semibold w-24 shrink-0">{slot.time}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-display font-semibold text-text-primary">{slot.title}</p>
                      <span className="px-2 py-0.5 rounded-full bg-surface2 text-[10px] text-text-secondary border border-white/5">
                        {slot.tag}
                      </span>
                      {slot.headline && <Badge tone="hot">Headliner</Badge>}
                    </div>
                    <p className="text-sm text-text-tertiary mt-1">{slot.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-card bg-surface1 border border-white/[0.07] p-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="font-display font-semibold text-text-primary">{event.organizer.name}</h2>
              <p className="text-sm text-text-tertiary mt-1">
                {event.organizer.rating} Rating &middot; {event.organizer.arenas} &middot; {event.organizer.fans}
              </p>
            </div>
            <button className="px-4 py-2 rounded-control bg-surface2 text-text-primary font-display font-semibold text-sm hover:bg-surface3 transition-colors">
              Follow
            </button>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-28 rounded-card bg-surface1 border border-white/[0.07] p-6 shadow-l2">
            <p className="text-xs uppercase tracking-wide text-text-tertiary font-display font-semibold mb-1">Step 1 of 2</p>
            <h2 className="font-display font-semibold text-lg text-text-primary mb-4">Select Your Tickets</h2>

            <div className="space-y-4">
              {event.tiers.map((tier) => (
                <div key={tier.name} className="border border-white/10 rounded-control p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-display font-semibold text-text-primary text-sm">{tier.name}</p>
                    {tier.badge && <Badge tone={tier.badge === 'POPULAR' ? 'hot' : 'default'}>{tier.badge}</Badge>}
                  </div>
                  <p className="text-xs text-text-tertiary mb-3">{tier.note}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-display font-bold text-text-primary">
                      {tier.price === 0 ? 'Free' : `₹${tier.price}`}
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          dispatch(
                            setTierCount({ eventId, tierName: tier.name, count: (selection[tier.name] || 0) - 1 })
                          )
                        }
                        className="w-7 h-7 rounded-lg bg-surface2 text-text-primary flex items-center justify-center hover:bg-surface3"
                      >
                        −
                      </button>
                      <span className="w-4 text-center text-sm">{selection[tier.name] || 0}</span>
                      <button
                        onClick={() =>
                          dispatch(
                            setTierCount({ eventId, tierName: tier.name, count: (selection[tier.name] || 0) + 1 })
                          )
                        }
                        className="w-7 h-7 rounded-lg bg-surface2 text-text-primary flex items-center justify-center hover:bg-surface3"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 space-y-1.5 text-sm">
              <Row label="Subtotal" value={`₹${subtotal}`} />
              <Row label="Convenience Fee (5%)" value={`₹${convenienceFee}`} />
              <Row label="GST & Taxes (18%)" value={`₹${tax}`} />
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="font-display font-semibold text-text-primary">Total Payable</span>
                <span className="font-display font-bold text-lg text-text-primary">₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={totalTickets === 0}
              className="mt-5 w-full py-3 rounded-control bg-gradient-to-r from-primary to-secondary text-white font-display font-semibold shadow-cta hover:shadow-cta-hover transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-cta"
            >
              Proceed to Checkout
            </button>
            <p className="text-[11px] text-text-tertiary text-center mt-3">
              100% Buyer Protection Guaranteed — Instant encrypted QR wallet delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoTile({ label, value }) {
  return (
    <div className="rounded-control bg-surface1 border border-white/[0.06] p-3">
      <p className="text-[10px] uppercase tracking-wide text-text-tertiary font-display font-semibold">{label}</p>
      <p className="text-sm text-text-primary font-display font-semibold mt-1 truncate">{value}</p>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between text-text-secondary">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}
