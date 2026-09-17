import { useSelector, useDispatch } from 'react-redux'
import { navigate } from '../store/uiSlice.js'

export default function Booking() {
  const dispatch = useDispatch()
  const order = useSelector((s) => s.booking.lastOrder)

  if (!order) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <p className="text-text-secondary mb-4">No recent booking found.</p>
        <button onClick={() => dispatch(navigate({ page: 'explore' }))} className="text-primary font-display font-semibold">
          Explore Events
        </button>
      </div>
    )
  }

  const ticketCount = order.lineItems.reduce((a, li) => a + li.count, 0)

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-content mx-auto">
        <div className="rounded-card bg-gradient-to-br from-surface1 to-surface2 border border-primary/20 p-6 md:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary-bright text-[11px] font-display font-bold uppercase tracking-wide border border-secondary/40 mb-3">
              Reservation Locked · Official Entry Pass
            </span>
            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-text-primary mb-2">
              Booking confirmed! You're going to
              <br />
              <span className="gradient-text">{order.eventTitle}</span>
            </h1>
            <p className="text-text-secondary text-sm">
              Your encrypted digital pass and tax invoice have been generated and are ready below.
            </p>
          </div>
          <div className="rounded-control bg-canvas/60 border border-white/10 px-5 py-4 text-right">
            <p className="text-[10px] uppercase tracking-wide text-text-tertiary font-display font-semibold">
              Booking Reference
            </p>
            <p className="font-display font-bold text-tertiary-bright">#{order.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div
              className="relative rounded-card overflow-hidden h-56"
              style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.5), rgba(6,182,212,0.4))' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/30 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <p className="font-display font-bold text-xl text-text-primary">{order.eventTitle}</p>
                <p className="text-sm text-text-secondary">{order.venue}</p>
              </div>
            </div>

            <div className="rounded-card bg-surface1 border border-white/[0.07] p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Detail label="Date & Time" value={`${order.date}`} sub={order.time} />
              <Detail label="Venue" value={order.venue} />
              <Detail label="Tickets" value={`${ticketCount} pass${ticketCount > 1 ? 'es' : ''}`} />
              <Detail label="Status" value="Paid in Full" accent />
            </div>

            <div className="rounded-card bg-surface1 border border-white/[0.07] p-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-40 h-40 rounded-xl bg-white p-3 flex items-center justify-center shrink-0">
                <QRPlaceholder />
              </div>
              <div>
                <p className="font-display font-semibold text-text-primary mb-1">Encrypted single-entry pass</p>
                <p className="text-sm text-text-tertiary mb-3">
                  Screenshots or duplication will void admission. Show this QR at the turnstile gate.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 rounded-control bg-gradient-to-r from-primary to-secondary text-white font-display font-semibold text-sm shadow-cta">
                    Download PDF
                  </button>
                  <button className="px-4 py-2 rounded-control bg-surface2 text-text-primary font-display font-semibold text-sm border border-white/10">
                    Add to Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-card bg-surface1 border border-white/[0.07] p-6 sticky top-28">
              <h2 className="font-display font-semibold text-text-primary mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm mb-4">
                {order.lineItems.map((li) => (
                  <div key={li.name} className="flex items-center justify-between text-text-secondary">
                    <span>
                      {li.name} × {li.count}
                    </span>
                    <span>₹{li.price * li.count}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                <Row label="Subtotal" value={`₹${order.subtotal}`} />
                <Row label="Convenience Fee" value={`₹${order.convenienceFee}`} />
                <Row label="GST & Taxes" value={`₹${order.tax}`} />
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="font-display font-semibold text-text-primary">Total Paid</span>
                  <span className="font-display font-bold text-lg text-text-primary">₹{order.total}</span>
                </div>
              </div>
              <button
                onClick={() => dispatch(navigate({ page: 'explore' }))}
                className="mt-5 w-full py-3 rounded-control bg-surface2 text-text-primary font-display font-semibold hover:bg-surface3 transition-colors"
              >
                ← Back to Explore Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Detail({ label, value, sub, accent }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-text-tertiary font-display font-semibold">{label}</p>
      <p className={`text-sm font-display font-semibold mt-1 ${accent ? 'text-tertiary-bright' : 'text-text-primary'}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-text-tertiary">{sub}</p>}
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

function QRPlaceholder() {
  // Decorative placeholder QR-style pattern (not a real scannable code)
  const cells = Array.from({ length: 49 }, (_, i) => i)
  return (
    <div className="grid grid-cols-7 gap-[2px] w-full h-full">
      {cells.map((i) => {
        const isCorner =
          (i < 3 || (i >= 7 && i < 10) || (i >= 14 && i < 17)) ||
          (i % 7 >= 4 && i % 7 <= 6 && i < 21 && i % 7 !== 3)
        const on = isCorner || Math.random() > 0.55
        return <div key={i} className={`rounded-[1px] ${on ? 'bg-canvas' : 'bg-transparent'}`} />
      })}
    </div>
  )
}
