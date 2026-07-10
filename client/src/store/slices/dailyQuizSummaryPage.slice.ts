import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DailyQuizSummaryPageState {
  xpEarned: number;
  rankInLeaderboard: number;
  unlockedAchievements: string[];
}

const initialState: DailyQuizSummaryPageState = {
  xpEarned: 0,
  rankInLeaderboard: 0,
  unlockedAchievements: [],
};

const dailyQuizSummaryPageSlice = createSlice({
  name: 'dailyQuizSummaryPage',
  initialState,
  reducers: {
    setSummaryXpEarned: (state, action: PayloadAction<number>) => {
      state.xpEarned = action.payload;
    },
    setSummaryRank: (state, action: PayloadAction<number>) => {
      state.rankInLeaderboard = action.payload;
    },
    setSummaryAchievements: (state, action: PayloadAction<string[]>) => {
      state.unlockedAchievements = action.payload;
    },
  },
});

export const { setSummaryXpEarned, setSummaryRank, setSummaryAchievements } = dailyQuizSummaryPageSlice.actions;
export default dailyQuizSummaryPageSlice.reducer;
