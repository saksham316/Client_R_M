// -------------------------------------------------Imports-----------------------------------------------------
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  assignNoteTakerTasks,
  createNoteTakerTask,
  getAllNoteTakerTasks,
  updateNoteTakerTask,
} from '../../../../actions/project/task/noteTaker/noteTakerActions';
// -------------------------------------------------------------------------------------------------------------

// initialState -- initial state of the coder task
const initialState = {
  isNoteTakerTaskLoading: false,
  isNoteTakerTaskCreated: false,
  isNoteTakerTaskUpdated: false,
  isNoteTakerTasksFetched: false,
  isNoteTakerTasksAssigned: false,
  noteTakerTasks: [],
  errorMessage: '',
};

// -------------------------------------------------------------------------------------------------------------

const noteTakerTaskSlice = createSlice({
  name: 'noteTakerTask',
  initialState,
  reducers: {
    resetNoteTakerTaskStatus: (state, action) => {
      state.isNoteTakerTaskCreated = action.payload;
      state.isNoteTakerTasksAssigned = action.payload;
      state.isNoteTakerTaskUpdated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // createNoteTakerTask lifecycle actions
      .addCase(createNoteTakerTask.pending, (state, action) => {
        state.isNoteTakerTaskLoading = true;
        state.isNoteTakerTaskCreated = false;
        state.errorMessage = '';
      })
      .addCase(createNoteTakerTask.fulfilled, (state, action) => {
        state.isNoteTakerTaskLoading = false;
        state.isNoteTakerTaskCreated = true;
        state.errorMessage = '';
      })
      .addCase(createNoteTakerTask.rejected, (state, action) => {
        state.isNoteTakerTaskLoading = false;
        state.isNoteTakerTaskCreated = false;
        state.errorMessage = action.payload;
      })

      // getAllNoteTakerTasks lifecycle actions
      .addCase(getAllNoteTakerTasks.pending, (state, action) => {
        state.isNoteTakerTaskLoading = true;
        state.errorMessage = '';
      })
      .addCase(getAllNoteTakerTasks.fulfilled, (state, action) => {
        state.isNoteTakerTaskLoading = false;
        state.noteTakerTasks = action.payload;
        state.errorMessage = '';
      })
      .addCase(getAllNoteTakerTasks.rejected, (state, action) => {
        state.isNoteTakerTaskLoading = false;
        state.errorMessage = action.payload;
      })

      //  assignNoteTakerTasks lifecycle actions
      .addCase(assignNoteTakerTasks.pending, (state, action) => {
        state.isNoteTakerTaskLoading = true;
        state.errorMessage = '';
        state.isNoteTakerTasksAssigned = false;
      })
      .addCase(assignNoteTakerTasks.fulfilled, (state, action) => {
        state.isNoteTakerTaskLoading = false;
        state.isNoteTakerTasksAssigned = true;
        state.errorMessage = '';
      })
      .addCase(assignNoteTakerTasks.rejected, (state, action) => {
        state.isNoteTakerTaskLoading = false;
        state.isNoteTakerTasksAssigned = false;
        state.errorMessage = action.payload;
      })
      //  updateNoteTakerTask lifecycle actions
      .addCase(updateNoteTakerTask.pending, (state, action) => {
        state.isNoteTakerTaskLoading = true;
        state.errorMessage = '';
        state.isNoteTakerTaskUpdated = false;
      })
      .addCase(updateNoteTakerTask.fulfilled, (state, action) => {
        state.isNoteTakerTaskLoading = false;
        state.isNoteTakerTaskUpdated = true;
        state.errorMessage = '';
      })
      .addCase(updateNoteTakerTask.rejected, (state, action) => {
        state.isNoteTakerTaskLoading = false;
        state.isNoteTakerTaskUpdated = false;
        state.errorMessage = action.payload;
      });
  },
});

export const noteTakerTaskReducer = noteTakerTaskSlice.reducer;
export const { resetNoteTakerTaskStatus } = noteTakerTaskSlice.actions;
