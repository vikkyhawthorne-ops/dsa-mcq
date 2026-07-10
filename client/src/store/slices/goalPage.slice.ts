import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GoalPageState {
  dailyQuizGoal: number;
  xpGoal: number;
  draftGoalText: string;
}

const initialState: GoalPageState = {
  dailyQuizGoal: 1,
  xpGoal: 100,
  draftGoalText: '',
};

const goalPageSlice = createSlice({
  name: 'goalPage',
  initialState,
  reducers: {
    setDailyQuizGoal: (state, action: PayloadAction<number>) => {
      state.dailyQuizGoal = action.payload;
    },
    setXpGoal: (state, action: PayloadAction<number>) => {
      state.xpGoal = action.payload;
    },
    setDraftGoalText: (state, action: PayloadAction<string>) => {
      state.draftGoalText = action.payload;
    },
  },
});

export const { setDailyQuizGoal, setXpGoal, setDraftGoalText } = goalPageSlice.actions;
export default goalPageSlice.reducer;
