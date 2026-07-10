import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfilePageState {
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  language: string;
}

const initialState: UserProfilePageState = {
  theme: 'system',
  notificationsEnabled: true,
  language: 'en',
};

const userProfilePageSlice = createSlice({
  name: 'userProfilePage',
  initialState,
  reducers: {
    setProfileTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    setProfileNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.notificationsEnabled = action.payload;
    },
    setProfileLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setProfileTheme, setProfileNotificationsEnabled, setProfileLanguage } = userProfilePageSlice.actions;
export default userProfilePageSlice.reducer;
