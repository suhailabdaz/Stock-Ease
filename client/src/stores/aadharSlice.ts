import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parsedData } from '../types/aadharType'


interface aadharDetails{
  aadharDetails: parsedData | null;
  isLoading: boolean;
}

const initialState: aadharDetails = {
  aadharDetails: null,
  isLoading: false

};

const aadharSlice = createSlice({
  name: 'aadharSlice',
  initialState,
  reducers: {
    setParsedData: (state, action: PayloadAction<parsedData | null>) => {
      state.aadharDetails = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
});

export const {setParsedData,setLoading } = aadharSlice.actions;
export default aadharSlice;
