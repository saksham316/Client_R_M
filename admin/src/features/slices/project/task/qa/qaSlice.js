// -----------------------------------------------Imports-----------------------------------------------------
import { createSlice } from '@reduxjs/toolkit';
import {
  getAllQATasks,
  updateQATask,
} from '../../../../actions/project/task/qa/qaActions';
// -----------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------
const initialState = {
  isQATaskLoading: false,
  qaTasks: [],
  errorMessage: '',
};
// -----------------------------------------------------------------------------------------------------------

const qaSlice = createSlice({
  name: 'qaTask',
  initialState,
  reducers: {
    resetQATaskStatus: (state, action) => {
      state.isQATaskUpdated = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllQATasks actions
      .addCase(getAllQATasks.pending, (state, action) => {
        state.isQATaskLoading = true;
      })
      .addCase(getAllQATasks.fulfilled, (state, action) => {
        state.isQATaskLoading = false;
        state.qaTasks = action.payload;
      })
      .addCase(getAllQATasks.rejected, (state, action) => {
        state.isQATaskLoading = false;
        state.errorMessage = action.payload;
      })
      // updateQATask actions
      .addCase(updateQATask.pending, (state, action) => {
        state.isQATaskLoading = true;
        state.isQATaskUpdated = false;
      })
      .addCase(updateQATask.fulfilled, (state, action) => {
        state.isQATaskLoading = false;
        state.isQATaskUpdated = true;
      })
      .addCase(updateQATask.rejected, (state, action) => {
        state.isQATaskLoading = false;
        state.isQATaskUpdated = false;
        state.errorMessage = action.payload;
      });
  },
});

export const qaTaskReducer = qaSlice.reducer;
export const { resetQATaskStatus } = qaSlice.actions;
