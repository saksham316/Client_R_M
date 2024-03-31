// -------------------------------------------------Imports-----------------------------------------------------
import { createSlice } from '@reduxjs/toolkit';
import {
  assignCoderTasks,
  createCoderTask,
  getAllCoderTasks,
} from '../../../../actions/project/task/coder/coderActions';
import toast from 'react-hot-toast';
import { getBucketData } from '../../../../actions/project/task/bucket/bucketActions';
// -------------------------------------------------------------------------------------------------------------

// initialState -- initial state of the coder task
const initialState = {
  isBucketLoading: false,
  bucketData: [],
  errorMessage: '',
};

// -------------------------------------------------------------------------------------------------------------

const bucketSlice = createSlice({
  name: 'bucket',
  initialState,
  reducers: {
    resetBucketStatus: (state, action) => {
      state.isCoderTaskCreated = action.payload;
      state.isCoderTasksAssigned = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getBucketData lifecycle actions
      .addCase(getBucketData.pending, (state, action) => {
        state.isBucketLoading = true;
        state.errorMessage = '';
      })
      .addCase(getBucketData.fulfilled, (state, action) => {
        state.isBucketLoading = false;
        state.bucketData = action.payload;
        state.errorMessage = '';
        toast.success('Bucket Data Found Successfully');
      })
      .addCase(getBucketData.rejected, (state, action) => {
        state.isBucketLoading = false;
        state.errorMessage = action.payload;
      });
  },
});

export const bucketReducer = bucketSlice.reducer;
export const { resetBucketStatus } = bucketSlice.actions;
