import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AchievementPageState {
  sortType: 'recent' | 'difficulty' | 'name';
  unlockedOnly: boolean;
}

const initialState: AchievementPageState = {
  sortType: 'recent',
  unlockedOnly: false,
};

const achievementPageSlice = createSlice({
  name: 'achievementPage',
  initialState,
  reducers: {
    setAchievementSortType: (state, action: PayloadAction<'recent' | 'difficulty' | 'name'>) => {
      state.sortType = action.payload;
    },
    setUnlockedOnly: (state, action: PayloadAction<boolean>) => {
      state.unlockedOnly = action.payload;
    },
  },
});

export const { setAchievementSortType, setUnlockedOnly } = achievementPageSlice.actions;
export default achievementPageSlice.reducer;
