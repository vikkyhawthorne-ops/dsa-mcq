import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DailyQuizPageState {
  hasParticipatedToday: boolean;
  streakCount: number;
  loading: boolean;
}

const initialState: DailyQuizPageState = {
  hasParticipatedToday: false,
  streakCount: 0,
  loading: false,
};

const dailyQuizPageSlice = createSlice({
  name: 'dailyQuizPage',
  initialState,
  reducers: {
    setHasParticipatedToday: (state, action: PayloadAction<boolean>) => {
      state.hasParticipatedToday = action.payload;
    },
    setDailyQuizStreak: (state, action: PayloadAction<number>) => {
      state.streakCount = action.payload;
    },
    setDailyQuizLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setHasParticipatedToday, setDailyQuizStreak, setDailyQuizLoading } = dailyQuizPageSlice.actions;
export default dailyQuizPageSlice.reducer;
