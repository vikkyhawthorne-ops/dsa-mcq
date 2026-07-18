import { configureStore, combineReducers } from '@reduxjs/toolkit';

import categoryReducer from './category.slice';
import questionReducer from './question.slice';
import userQuestionDataReducer from './userQuestionData.slice';
import learningSessionReducer from './learningSession.slice';
import gameModesReducer from './gameModes.slice';
import quizReducer from './quiz.slice';
import recentQuizzesReducer from './recentQuizzes.slice';

export const learningRootReducer = combineReducers({
  categories: categoryReducer,
  questions: questionReducer,
  userQuestionData: userQuestionDataReducer,
  learningSession: learningSessionReducer,
  gameModes: gameModesReducer,
  quiz: quizReducer,
  recentQuizzes: recentQuizzesReducer,
});

const store = configureStore({
  reducer: learningRootReducer,
});

export type LearningRootState = ReturnType<typeof learningRootReducer>;
export type AppDispatch = typeof store.dispatch;

// Explicit exports for action creators and thunks to avoid runtime type export issues
export { hydrateCategories, addCategoryDb, updateCategoryDb, removeCategoryDb } from './category.slice';
export { fetchBatchFeedback } from './question.slice';
export { hydrateUserQuestionData, addUserQuestionDataDb, answerCorrectlyDb, answerIncorrectlyDb, updateUserQuestionSM2DataDb, setUserQuestionDataDb } from './userQuestionData.slice';
export { hydrateLearningSession, saveSessionDb, startNewSession, processAnswerAndUpdate, endCurrentSession, nextSubset, generateRecommendations } from './learningSession.slice';
export { startQuiz, answerQuestion, completeQuiz, resetQuiz } from './quiz.slice';

export default store;
