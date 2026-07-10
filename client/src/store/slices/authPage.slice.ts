import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthPageState {
  activeTab: 'login' | 'register';
  emailInput: string;
  passwordInput: string;
  fullNameInput: string;
  confirmPasswordInput: string;
  rememberMe: boolean;
  errors: Record<string, string>;
}

const initialState: AuthPageState = {
  activeTab: 'login',
  emailInput: '',
  passwordInput: '',
  fullNameInput: '',
  confirmPasswordInput: '',
  rememberMe: false,
  errors: {},
};

const authPageSlice = createSlice({
  name: 'authPage',
  initialState,
  reducers: {
    setAuthTab: (state, action: PayloadAction<'login' | 'register'>) => {
      state.activeTab = action.payload;
    },
    setAuthEmailInput: (state, action: PayloadAction<string>) => {
      state.emailInput = action.payload;
    },
    setAuthPasswordInput: (state, action: PayloadAction<string>) => {
      state.passwordInput = action.payload;
    },
    setAuthFullNameInput: (state, action: PayloadAction<string>) => {
      state.fullNameInput = action.payload;
    },
    setAuthConfirmPasswordInput: (state, action: PayloadAction<string>) => {
      state.confirmPasswordInput = action.payload;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    setAuthErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.errors = action.payload;
    },
    clearAuthPageForm: (state) => {
      state.emailInput = '';
      state.passwordInput = '';
      state.fullNameInput = '';
      state.confirmPasswordInput = '';
      state.errors = {};
    },
  },
});

export const {
  setAuthTab,
  setAuthEmailInput,
  setAuthPasswordInput,
  setAuthFullNameInput,
  setAuthConfirmPasswordInput,
  setRememberMe,
  setAuthErrors,
  clearAuthPageForm,
} = authPageSlice.actions;

export default authPageSlice.reducer;
