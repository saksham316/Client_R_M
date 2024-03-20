import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../services/axiosInterceptor';

// ------------------------------------Async Actions----------------------------------

//This action is used to generate otp once user trying to do New Registration.
export const generateSignupOTP = createAsyncThunk(
  'authentication/generateSignupOTP',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post('mail/generateSignUpOtp', payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//This action is used to verify sign up otp and after verification save user's data on DB.
export const signUp = createAsyncThunk(
  'authentication/signUp',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post('admin/auth/signUp', payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

//This action is used to generate login otp.
export const generateLoginOTP = createAsyncThunk(
  'authentication/generateLoginOTP',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post('/admin/auth/login', payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//This action is used to verify login otp and after verification call login api.
export const logIn = createAsyncThunk(
  'authentication/login',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(
        'admin/auth/verifyAdminLoginOtp',
        payload,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

//This action is used to logout the user and clear session.
export const logout = createAsyncThunk(
  'authentication/logout',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post('/admin/auth/logout', payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//This action is used to generate forgot password link on email.
export const forgotPassword = createAsyncThunk(
  'authentication/forgotPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post('/auth/forgetPassword', payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
