import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User,UserData } from '../types/user';

const initialState: User = {
  userData:null,
  user_IsAuthenticated: false,
  email:null
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.user_IsAuthenticated = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.user_IsAuthenticated = false;
      state.userData = null;
    },
    setEmail: (state,action:PayloadAction<string>)=> {
      state.email = action.payload;
    },
    removeEmail: (state)=> {
      state.email =null;
    },
  },
});

export const { login, logout, setEmail, removeEmail } = userSlice.actions;
export default userSlice;
