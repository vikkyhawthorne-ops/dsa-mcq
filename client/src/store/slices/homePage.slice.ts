import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HomePageState {
  isLoading: boolean;
  activeSection: string;
  recentQuizzesLimit: number;
}

const initialState: HomePageState = {
  isLoading: false,
  activeSection: 'all',
  recentQuizzesLimit: 5,
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setHomeLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setHomeActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    setRecentQuizzesLimit: (state, action: PayloadAction<number>) => {
      state.recentQuizzesLimit = action.payload;
    },
  },
});

export const { setHomeLoading, setHomeActiveSection, setRecentQuizzesLimit } = homePageSlice.actions;
export default homePageSlice.reducer;
