import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionSummaryPageState {
  correctAnswersCount: number;
  totalQuestionsCount: number;
  xpPointsAwarded: number;
}

const initialState: SessionSummaryPageState = {
  correctAnswersCount: 0,
  totalQuestionsCount: 0,
  xpPointsAwarded: 0,
};

const sessionSummaryPageSlice = createSlice({
  name: 'sessionSummaryPage',
  initialState,
  reducers: {
    setSessionSummaryCorrectCount: (state, action: PayloadAction<number>) => {
      state.correctAnswersCount = action.payload;
    },
    setSessionSummaryTotalCount: (state, action: PayloadAction<number>) => {
      state.totalQuestionsCount = action.payload;
    },
    setSessionSummaryXp: (state, action: PayloadAction<number>) => {
      state.xpPointsAwarded = action.payload;
    },
  },
});

export const { setSessionSummaryCorrectCount, setSessionSummaryTotalCount, setSessionSummaryXp } = sessionSummaryPageSlice.actions;
export default sessionSummaryPageSlice.reducer;
