import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user';

const initialState: User = {
  user_email: null,
  user_token: null,
  user_IsAuthenticated: false,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      state.user_IsAuthenticated = true;
      state.user_token = action.payload.token;
    },
    logout: (state) => {
      state.user_IsAuthenticated = false;
      state.user_token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice;
