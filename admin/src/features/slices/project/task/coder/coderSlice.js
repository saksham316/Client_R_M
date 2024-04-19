// -------------------------------------------------Imports-----------------------------------------------------
import { createSlice } from '@reduxjs/toolkit';
import {
  assignCoderTasks,
  createCoderTask,
  getAllCoderTasks,
  updateCoderTask,
} from '../../../../actions/project/task/coder/coderActions';
import toast from 'react-hot-toast';
// -------------------------------------------------------------------------------------------------------------

// initialState -- initial state of the coder task
const initialState = {
  isCoderTaskLoading: false,
  isCoderTaskCreated: false,
  isCoderTaskUpdated: false,
  isCoderTasksFetched: false,
  isCoderTasksAssigned: false,
  coderTasks: [],
  errorMessage: '',
};

// -------------------------------------------------------------------------------------------------------------

const coderTaskSlice = createSlice({
  name: 'coderTask',
  initialState,
  reducers: {
    resetCoderTaskStatus: (state, action) => {
      state.isCoderTaskCreated = action.payload;
      state.isCoderTasksAssigned = action.payload;
      state.isCoderTaskUpdated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // createCoderTask lifecycle actions
      .addCase(createCoderTask.pending, (state, action) => {
        state.isCoderTaskLoading = true;
        state.isCoderTaskCreated = false;
        state.errorMessage = '';
      })
      .addCase(createCoderTask.fulfilled, (state, action) => {
        state.isCoderTaskLoading = false;
        state.isCoderTaskCreated = true;
        state.errorMessage = '';
      })
      .addCase(createCoderTask.rejected, (state, action) => {
        state.isCoderTaskLoading = false;
        state.isCoderTaskCreated = false;
        state.errorMessage = action.payload;
      })
      // updateCoderTask lifecycle actions
      .addCase(updateCoderTask.pending, (state, action) => {
        state.isCoderTaskLoading = true;
        state.isCoderTaskUpdated = false;
        state.errorMessage = '';
      })
      .addCase(updateCoderTask.fulfilled, (state, action) => {
        state.isCoderTaskLoading = false;
        state.isCoderTaskUpdated = true;
        state.errorMessage = '';
        toast.success('Task Updated Successfully');
      })
      .addCase(updateCoderTask.rejected, (state, action) => {
        state.isCoderTaskLoading = false;
        state.isCoderTaskUpdated = false;
        state.errorMessage = action.payload;
      })

      // getAllCoderTasks lifecycle actions
      .addCase(getAllCoderTasks.pending, (state, action) => {
        state.isCoderTaskLoading = true;
        state.errorMessage = '';
      })
      .addCase(getAllCoderTasks.fulfilled, (state, action) => {
        state.isCoderTaskLoading = false;
        state.coderTasks = action.payload;
        state.errorMessage = '';
      })
      .addCase(getAllCoderTasks.rejected, (state, action) => {
        state.isCoderTaskLoading = false;
        state.errorMessage = action.payload;
      })

      // getAllCoderTasks lifecycle actions
      .addCase(assignCoderTasks.pending, (state, action) => {
        state.isCoderTaskLoading = true;
        state.isCoderTasksAssigned = false;
        state.errorMessage = '';
      })
      .addCase(assignCoderTasks.fulfilled, (state, action) => {
        state.isCoderTaskLoading = false;
        state.isCoderTasksAssigned = true;
        state.errorMessage = '';
        toast.success('Tasks Assigned Successfully');
      })
      .addCase(assignCoderTasks.rejected, (state, action) => {
        state.isCoderTaskLoading = false;
        state.isCoderTasksAssigned = false;
        state.errorMessage = action.payload;
      });
  },
});

export const coderTaskReducer = coderTaskSlice.reducer;
export const { resetCoderTaskStatus } = coderTaskSlice.actions;
