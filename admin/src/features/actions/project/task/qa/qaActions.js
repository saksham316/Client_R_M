// --------------------------------------------Imports--------------------------------------------------------
import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../../../services/axiosInterceptor';
// -----------------------------------------------------------------------------------------------------------

// getAllQATasks Action
export const getAllQATasks = createAsyncThunk(
  'qaTask/getAllQATasks',
  async (query, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/admin/task/qa${query ? `?${query}` : ''}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// updateQATask Action
export const updateQATask = createAsyncThunk(
  'qaTask/updateQATask',
  async ({ payload, coderTaskId: qaTaskId }, { rejectWithValue }) => {
    try {
      const response = await instance.patch(
        `/admin/task/qa/${qaTaskId}`,
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
