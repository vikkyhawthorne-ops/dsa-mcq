import { combineReducers } from '@reduxjs/toolkit';

// Learning Component Reducers
import categoryReducer from '../components/learning/store/category.slice';
import questionReducer from '../components/learning/store/question.slice';
import userQuestionDataReducer from '../components/learning/store/userQuestionData.slice';
import learningSessionReducer from '../components/learning/store/learningSession.slice';
import recentQuizzesReducer from '../components/learning/store/recentQuizzes.slice';

const learningRootReducer = combineReducers({
  categories: categoryReducer,
  questions: questionReducer,
  userQuestionData: userQuestionDataReducer,
  learningSession: learningSessionReducer,
  recentQuizzes: recentQuizzesReducer,
});

// Engagement Component Reducers
import userEngagementReducer from '../components/engagement/store/userEngagement.slice';
import notificationReducer from '../components/engagement/store/notification.slice';
import globalEngagementReducer from '../components/engagement/store/globalEngagement.slice';

const engagementRootReducer = combineReducers({
  userEngagement: userEngagementReducer,
  notifications: notificationReducer,
  globalEngagement: globalEngagementReducer,
});

// Analytics Component Reducers
import devOpsMetricsReducer from '../components/analytics/store/devopsMetrics.slice';
import engagementKPIsReducer from '../components/engagement/store/engagementKPIs.slice';
import anomaliesReducer from '../components/analytics/store/anomalies.slice';
import insightsReducer from '../components/analytics/store/insights.slice';

const analyticsRootReducer = combineReducers({
    devOpsMetrics: devOpsMetricsReducer,
    engagementKPIs: engagementKPIsReducer,
    anomalies: anomaliesReducer,
    insights: insightsReducer,
});

// User Component Reducer
import userReducer from '../components/user/store/user.slice';
import userProfileReducer from '../components/user/store/userProfile.slice';

// Mediator Component Reducer
import sharedStateReducer from './sharedState.slice';
import adReducer from './ad.slice';

const mediatorRootReducer = combineReducers({
    sharedState: sharedStateReducer,
    ad: adReducer,
});

// Web Page/Screen Specific Reducers
import homePageReducer from './slices/homePage.slice';
import authPageReducer from './slices/authPage.slice';
import quizPageReducer from './slices/quizPage.slice';
import dailyQuizPageReducer from './slices/dailyQuizPage.slice';
import dailyQuizSummaryPageReducer from './slices/dailyQuizSummaryPage.slice';
import bookmarkPageReducer from './slices/bookmarkPage.slice';
import achievementPageReducer from './slices/achievementPage.slice';
import userProfilePageReducer from './slices/userProfilePage.slice';
import goalPageReducer from './slices/goalPage.slice';
import forgotPasswordPageReducer from './slices/forgotPasswordPage.slice';
import passwordResetPageReducer from './slices/passwordResetPage.slice';
import sessionSummaryPageReducer from './slices/sessionSummaryPage.slice';

const pagesRootReducer = combineReducers({
  home: homePageReducer,
  auth: authPageReducer,
  quiz: quizPageReducer,
  dailyQuiz: dailyQuizPageReducer,
  dailyQuizSummary: dailyQuizSummaryPageReducer,
  bookmark: bookmarkPageReducer,
  achievement: achievementPageReducer,
  userProfile: userProfilePageReducer,
  goal: goalPageReducer,
  forgotPassword: forgotPasswordPageReducer,
  passwordReset: passwordResetPageReducer,
  sessionSummary: sessionSummaryPageReducer,
});

const rootReducer = combineReducers({
  learning: learningRootReducer,
  engagement: engagementRootReducer,
  user: userReducer,
  profile: userProfileReducer,
  analytics: analyticsRootReducer,
  mediator: mediatorRootReducer,
  pages: pagesRootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
