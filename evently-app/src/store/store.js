import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './uiSlice.js'
import eventsReducer from './eventsSlice.js'
import bookingReducer from './bookingSlice.js'
import authReducer from './authSlice.js'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    events: eventsReducer,
    booking: bookingReducer,
    auth: authReducer,
  },
})
