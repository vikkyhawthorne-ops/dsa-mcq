import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userReducer from './user.slice';
import userProfileReducer from './userProfile.slice';
import userInsightReducer from './userInsight.slice';

export const rootReducer = combineReducers({
    user: userReducer,
    profile: userProfileReducer,
    insight: userInsightReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type UserRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  loginUser,
  loginCallback,
  loginWithProviderToken,
  loginWithTwitter,
  registerUser,
  requestPasswordReset,
  resetPassword,
  logoutUser,
  fetchProfilePicture,
  fetchUserProfile,
  setCurrentUser,
  setToken,
  setSyncKey,
  clearAuthError,
  verifyCode,
  requestVerificationCode
} from './user.slice';

export {
  toggleBookmark
} from './userProfile.slice';

export default store;
