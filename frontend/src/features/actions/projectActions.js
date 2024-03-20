import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';

//Get All Projects
export const fetchProjects = createAsyncThunk(
  'user/projects',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.get('/projects', payload);
      console.log('hellos', response);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProjectsByUserId = createAsyncThunk(
  '/fetchProjectsByUserId',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await instance.get(`projects/${userId}`, {
        withCredentials: true,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
