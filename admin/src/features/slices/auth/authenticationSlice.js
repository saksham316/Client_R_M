import { createSlice, current } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  generateLoginOTP,
  logIn,
  generateSignupOTP,
  signUp,
  logout,
  forgotPassword,
} from '../../actions/auth/authenticationActions';
// -------------------------------------------------------------------------------------------

// initialState -- initial state of authentication
const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  isSignUpOtpGenerated: false,
  isUserSignUpDone: false,
  isLoginOtpGenerated: false,
  isUserLoginDone: false,
  loggedInUserData: {},
  isUserLoggedIn: false,
  isLogoutSuccess: false,
  usersList: [],
  isForgotPasswordSentLinkDone: false,
};

// -------------------------------------- Slices------------------------------------------------
const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    clearSignUpState: (state) => {
      state.isSignUpOtpGenerated = false;
    },
    clearLoginUpState: (state) => {
      state.isLoginOtpGenerated = false;
    },
    clearReduxStoreData: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateSignupOTP.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = '';
        state.isSignUpOtpGenerated = false;
        state.isMailSent = false;
      })
      .addCase(generateSignupOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSignUpOtpGenerated = true;
        state.isMailSent = false;
      })
      .addCase(generateSignupOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        state.isSignUpOtpGenerated = false;
        state.isMailSent = false;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
      })

      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = '';
        state.isUserSignUpDone = false;
        state.isMailSent = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUserSignUpDone = true;
        state.isMailSent = false;
        toast.success(`Sign Up Successfull.`);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isUserSignUpDone = false;
        state.isMailSent = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
      })

      .addCase(generateLoginOTP.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isLoginOtpGenerated = false;
        state.errorMessage = '';
      })
      .addCase(generateLoginOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoginOtpGenerated = true;
        toast.success('Login Otp sent to your Email Address');
      })
      .addCase(generateLoginOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isLoginOtpGenerated = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
      })

      .addCase(logIn.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isUserLoginDone = false;
        state.errorMessage = '';
        state.isUserLoggedIn = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUserLoginDone = true;
        state.isUserLoggedIn = true;
        state.isLoginOtpGenerated = false;
        state.loggedInUserData = action.payload;
        toast.success('User Logged In Successfully');
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isUserLoginDone = false;
        state.isUserLoggedIn = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
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
        state.isSignUpOtpGenerated = false;
        state.isUserSignUpDone = false;
        state.isLoginOtpGenerated = false;
        state.isUserLoginDone = false;
        state.loggedInUserData = {};
        state.isUserLoggedIn = false;
        state.isLogoutSuccess = true;
        localStorage.clear();
        sessionStorage.clear();
        localStorage.removeItem('persist:root');
        toast.success('User Logout Successfully');
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isLogoutSuccess = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
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
