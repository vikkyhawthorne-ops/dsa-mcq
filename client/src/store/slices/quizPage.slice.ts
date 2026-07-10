import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuizPageState {
  currentQuestionIdx: number;
  selectedAnswers: Record<string, string>;
  timeLeft: number;
  quizCompleted: boolean;
  score: number;
}

const initialState: QuizPageState = {
  currentQuestionIdx: 0,
  selectedAnswers: {},
  timeLeft: 120, // 2 minutes
  quizCompleted: false,
  score: 0,
};

const quizPageSlice = createSlice({
  name: 'quizPage',
  initialState,
  reducers: {
    setQuizQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentQuestionIdx = action.payload;
    },
    selectQuizAnswer: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      state.selectedAnswers[action.payload.questionId] = action.payload.answer;
    },
    setQuizTimeLeft: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload;
    },
    setQuizCompleted: (state, action: PayloadAction<boolean>) => {
      state.quizCompleted = action.payload;
    },
    setQuizScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    resetQuizPage: (state) => {
      state.currentQuestionIdx = 0;
      state.selectedAnswers = {};
      state.timeLeft = 120;
      state.quizCompleted = false;
      state.score = 0;
    },
  },
});

export const {
  setQuizQuestionIndex,
  selectQuizAnswer,
  setQuizTimeLeft,
  setQuizCompleted,
  setQuizScore,
  resetQuizPage,
} = quizPageSlice.actions;

export default quizPageSlice.reducer;
