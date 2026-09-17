import { createSlice } from '@reduxjs/toolkit'
import { EVENTS } from '../data/events.js'

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: EVENTS,
    search: '',
    categoryFilter: 'All',
    wishlist: [],
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload
    },
    toggleWishlist: (state, action) => {
      const id = action.payload
      state.wishlist = state.wishlist.includes(id)
        ? state.wishlist.filter((x) => x !== id)
        : [...state.wishlist, id]
    },
  },
})

export const { setSearch, setCategoryFilter, toggleWishlist } = eventsSlice.actions
export default eventsSlice.reducer

export const selectFilteredEvents = (state) => {
  const { items, search, categoryFilter } = state.events
  return items.filter((e) => {
    const matchesCategory = categoryFilter === 'All' || e.category === categoryFilter
    const matchesSearch =
      !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })
}
