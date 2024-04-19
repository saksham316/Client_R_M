// -----------------------------------------------Imports-----------------------------------------------------
import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../../../services/axiosInterceptor';
// -----------------------------------------------------------------------------------------------------------

// -----------------------------------------Coder Async Actions-----------------------------------------------

// createNoteTakerTask Action
export const createNoteTakerTask = createAsyncThunk(
  'noteTakerTask/createNoteTakerTask',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        '/admin/task/noteTaker',
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

// getAllNoteTakerTasks Action
export const getAllNoteTakerTasks = createAsyncThunk(
  'noteTakerTask/getAllNoteTakerTasks',
  async (query, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/admin/task/noteTaker${query ? `?${query}` : ''}`,
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

// assignNoteTakerTasks -- action to call the assignNoteTakerTasks api in order to assign the tasks to the note taker
export const assignNoteTakerTasks = createAsyncThunk(
  'coder/assignNoteTakerTasks',
  async ({ noteTakerId, payload }, { rejectWithValue }) => {
    try {
      const response = await instance.patch(
        `/admin/task/noteTaker/assign/${noteTakerId}`,
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
