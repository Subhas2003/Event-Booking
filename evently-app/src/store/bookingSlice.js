import { createSlice, nanoid } from '@reduxjs/toolkit'

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    // { [eventId]: { [tierName]: count } }
    selections: {},
    lastOrder: null,
  },
  reducers: {
    setTierCount: (state, action) => {
      const { eventId, tierName, count } = action.payload
      if (!state.selections[eventId]) state.selections[eventId] = {}
      state.selections[eventId][tierName] = Math.max(0, count)
    },
    confirmOrder: (state, action) => {
      const { event, tiers } = action.payload
      const lineItems = tiers
        .map((t) => ({
          name: t.name,
          price: t.price,
          count: state.selections[event.id]?.[t.name] || 0,
        }))
        .filter((li) => li.count > 0)

      const subtotal = lineItems.reduce((sum, li) => sum + li.price * li.count, 0)
      const convenienceFee = Math.round(subtotal * 0.05)
      const tax = Math.round((subtotal + convenienceFee) * 0.18)
      const total = subtotal + convenienceFee + tax

      state.lastOrder = {
        id: `EVT-2026-${nanoid(6).toUpperCase()}`,
        eventId: event.id,
        eventTitle: event.title,
        venue: event.venue,
        date: event.date,
        time: event.time,
        lineItems,
        subtotal,
        convenienceFee,
        tax,
        total,
        issuedAt: new Date().toISOString(),
      }
      state.selections[event.id] = {}
    },
  },
})

export const { setTierCount, confirmOrder } = bookingSlice.actions
export default bookingSlice.reducer
