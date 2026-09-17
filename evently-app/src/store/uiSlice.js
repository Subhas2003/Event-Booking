import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    page: 'home', // home | explore | event | booking
    selectedEventId: null,
    mobileNavOpen: false,
    toast: null,
  },
  reducers: {
    navigate: (state, action) => {
      const { page, eventId = null } = action.payload
      state.page = page
      state.selectedEventId = eventId
      state.mobileNavOpen = false
    },
    toggleMobileNav: (state) => {
      state.mobileNavOpen = !state.mobileNavOpen
    },
    showToast: (state, action) => {
      state.toast = action.payload
    },
    clearToast: (state) => {
      state.toast = null
    },
  },
})

export const { navigate, toggleMobileNav, showToast, clearToast } = uiSlice.actions
export default uiSlice.reducer
