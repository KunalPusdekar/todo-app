import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, user: null },
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      // Mock authentication (replace this with actual logic in the future)
      if (username === 'user' && password === 'password') {
        state.isAuthenticated = true;
        state.user = username;
      } else {
        alert('Invalid username or password');
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
