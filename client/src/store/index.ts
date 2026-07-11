import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { initializeDatabase } from '../components/common/services/dbInitService';

const store = configureStore({
  reducer: rootReducer,
});

// Run root store database initialization, server fetching and hydration as a script on store creation
initializeDatabase(store.dispatch, store.getState).catch((err) => {
  console.error('[Store Init] DB Init service script failed:', err);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
