import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  status: 'not-authenticated' | 'authenticated' | 'checking';
  user: any;
  errorMessage?: string;
}

const initialState: AuthState = {
  status: 'not-authenticated',
  user: {},
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, action: PayloadAction<any>) => {
      state.status = 'authenticated';
      state.user = action.payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, action: PayloadAction<string | undefined>) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    }
  }
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;