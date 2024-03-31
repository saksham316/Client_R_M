// -----------------------------------------------Imports-----------------------------------------------------
import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../../../services/axiosInterceptor';
// -----------------------------------------------------------------------------------------------------------

// -----------------------------------------Coder Async Actions-----------------------------------------------

// getBucketData Action
export const getBucketData = createAsyncThunk(
  'bucket/getBucketData',
  async (query, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/admin/task/bucket${query ? `?${query}` : ''}`,
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

// -----------------------------------------------------------------------------------------------------------
