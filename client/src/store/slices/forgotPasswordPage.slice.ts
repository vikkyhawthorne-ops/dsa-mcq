import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ForgotPasswordPageState {
  emailInput: string;
  isSuccess: boolean;
  errorMessage: string | null;
}

const initialState: ForgotPasswordPageState = {
  emailInput: '',
  isSuccess: false,
  errorMessage: null,
};

const forgotPasswordPageSlice = createSlice({
  name: 'forgotPasswordPage',
  initialState,
  reducers: {
    setForgotEmailInput: (state, action: PayloadAction<string>) => {
      state.emailInput = action.payload;
    },
    setForgotSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    setForgotErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    resetForgotPasswordPage: (state) => {
      state.emailInput = '';
      state.isSuccess = false;
      state.errorMessage = null;
    },
  },
});

export const { setForgotEmailInput, setForgotSuccess, setForgotErrorMessage, resetForgotPasswordPage } = forgotPasswordPageSlice.actions;
export default forgotPasswordPageSlice.reducer;
