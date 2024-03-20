import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';

// ------------------------------------Async Actions----------------------------------

//Login send OTP Api and verify OTP Api both work in one Api
export const generateLoginOTP = createAsyncThunk(
  'user/sendOtpForLogin',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post('/client/auth/login', payload, {
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

//Login Api
export const logIn = createAsyncThunk(
  'user/login',
  async (payload, { rejectWithValue }) => {
    console.log('inner api:::', payload);
    try {
      const { data } = await instance.post(
        'client/auth/verifyclientLoginOtp',
        payload,
        {
          withCredentials: true,
        }
      );
      console.log('Login Api Called::::', data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

// logout -- logout action to call the logout api
export const logout = createAsyncThunk(
  'auth/logout',
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
