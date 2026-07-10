import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PasswordResetPageState {
  resetToken: string;
  newPasswordInput: string;
  confirmPasswordInput: string;
  isSuccess: boolean;
}

const initialState: PasswordResetPageState = {
  resetToken: '',
  newPasswordInput: '',
  confirmPasswordInput: '',
  isSuccess: false,
};

const passwordResetPageSlice = createSlice({
  name: 'passwordResetPage',
  initialState,
  reducers: {
    setResetToken: (state, action: PayloadAction<string>) => {
      state.resetToken = action.payload;
    },
    setResetNewPasswordInput: (state, action: PayloadAction<string>) => {
      state.newPasswordInput = action.payload;
    },
    setResetConfirmPasswordInput: (state, action: PayloadAction<string>) => {
      state.confirmPasswordInput = action.payload;
    },
    setResetSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    resetPasswordResetPage: (state) => {
      state.resetToken = '';
      state.newPasswordInput = '';
      state.confirmPasswordInput = '';
      state.isSuccess = false;
    },
  },
});

export const {
  setResetToken,
  setResetNewPasswordInput,
  setResetConfirmPasswordInput,
  setResetSuccess,
  resetPasswordResetPage,
} = passwordResetPageSlice.actions;

export default passwordResetPageSlice.reducer;
