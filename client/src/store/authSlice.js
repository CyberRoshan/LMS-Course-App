import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  loading: false,
  sessionReady: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading: (state, action) => {
      state.loading = action.payload
    },

    setUser: (state, action) => {
      state.user = action.payload
    },

    clearUser: (state) => {
      state.user = null
    },

    setSessionReady: (state, action) => {
      state.sessionReady = action.payload
    },
  },
})

export const { setAuthLoading, setUser, clearUser, setSessionReady } = authSlice.actions
export default authSlice.reducer