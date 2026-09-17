import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload
    },
    signUp: (state, action) => {
      state.user = action.payload
    },
    signOut: (state) => {
      state.user = null
    },
  },
})

export const { signIn, signUp, signOut } = authSlice.actions
export const selectCurrentUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => Boolean(state.auth.user)

export default authSlice.reducer