// -----------------------------------------------Imports-----------------------------------------------------
import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../../../services/axiosInterceptor';
// -----------------------------------------------------------------------------------------------------------

// -----------------------------------------Coder Async Actions-----------------------------------------------

// createCoderTask Action
export const createCoderTask = createAsyncThunk(
  'coder/createCoderTask',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        '/admin/task/coder',
        { payload },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// updateCoderTask Action
export const updateCoderTask = createAsyncThunk(
  'coder/updateCoderTask',
  async ({ payload, coderTaskId }, { rejectWithValue }) => {
    try {
      const response = await instance.patch(
        `/admin/task/coder/${coderTaskId}`,
        { payload },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// getAllCoderTasks Action
export const getAllCoderTasks = createAsyncThunk(
  'coder/getAllCoderTasks',
  async (query, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/admin/task/coder${query ? `?${query}` : ''}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// assignCoderTasks -- action to call the assignCoderTasks api in order to assign the tasks to the coder
export const assignCoderTasks = createAsyncThunk(
  'coder/assignCoderTasks',
  async ({ coderId, payload }, { rejectWithValue }) => {
    try {
      const response = await instance.patch(
        `/admin/task/coder/assign/${coderId}`,
        { payload },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// -----------------------------------------------------------------------------------------------------------
