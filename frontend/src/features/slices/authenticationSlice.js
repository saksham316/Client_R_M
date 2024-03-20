import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  forgotPassword,
  generateLoginOTP,
  logIn,
  logout,
} from '../actions/authenticationActions';
// -------------------------------------------------------------------------------------------

// initialState -- initial state of authentication
const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  isOtpSentSuccessfully: false,
  isLogInSuccess: false,
  isForgotPasswordSentLinkDone: false,
  isLogoutSuccess: false,
  isUserLoggedIn: false,
  loggedInUserData: {},
  isPasswordReset: false,
};

// -------------------------------------- Slices------------------------------------------------
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearLoginUpState: (state) => {
      state.isOtpSentSuccessfully = false;
    },
    clearReduxStoreData: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      // sendOtpForLogin cases
      .addCase(generateLoginOTP.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isOtpSentSuccessfully = false;
        state.errorMessage = '';
      })
      .addCase(generateLoginOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isOtpSentSuccessfully = true;
        toast.success('Otp Sent seccussfully', {
          position: 'top-right',
        });
      })
      .addCase(generateLoginOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isOtpSentSuccessfully = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: 'top-right',
        });
      })
      // verifyOtpAndLogin cases
      .addCase(logIn.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isLogInSuccess = false;
        state.isUserLoggedIn = false;
        state.errorMessage = '';
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loggedInUserData = action.payload?.data;
        state.isUserLoggedIn = true;
        state.isLogInSuccess = true;
        toast.success('User Logged In Successfully');
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isLogInSuccess = false;
        state.isUserLoggedIn = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: 'top-right',
        });
      })

      .addCase(forgotPassword.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isForgotPasswordSentLinkDone = false;
        state.errorMessage = '';
        state.isUserLoggedIn = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isForgotPasswordSentLinkDone = true;
        toast.success(
          'Forgot Password Link successfully sent to your email address.'
        );
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isForgotPasswordSentLinkDone = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
      })

      // Logout lifecycle methods
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isLogoutSuccess = false;
        state.errorMessage = '';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = '';
        state.isOtpSentSuccessfully = false;
        state.isLogInSuccess = false;
        state.isLogoutSuccess = true;
        state.isUserLoggedIn = false;
        state.loggedInUserData = null;
        state.isPasswordReset = false;
        localStorage.clear();
        sessionStorage.clear();
        localStorage.removeItem('persist:root');
        toast.success('Logout Successfully', {
          position: 'top-center',
        });
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isLogoutSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: 'top-right',
        });
      });
  },
});

// ===========================================Exports==================================================
export default authSlice.reducer;
export const {
  resetFields,
  clearReduxStoreData,
  clearSignUpState,
  clearLoginUpState,
} = authSlice.actions;
