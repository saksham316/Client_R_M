import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { fetchProjects, fetchProjectsByUserId } from '../actions/projectActions';
// -------------------------------------------------------------------------------------------

// initialState -- initial state of authentication
const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  isProjectApiSuccess: false,
  projectData: [],
};

// -------------------------------------- Slices------------------------------------------------
const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isProjectApiSuccess = false;
        state.errorMessage = '';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isProjectApiSuccess = true;
        state.projectData = action.payload;
        state.errorMessage = '';
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isProjectApiSuccess = false;
        state.errorMessage = action.payload;
      })
// fetchProjectsByUserId
      .addCase(fetchProjectsByUserId.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isProjectApiSuccess = false;
        state.errorMessage = '';
      })
      .addCase(fetchProjectsByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isProjectApiSuccess = true;
        state.projectData = action.payload;
        state.errorMessage = '';
      })
      .addCase(fetchProjectsByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isProjectApiSuccess = false;
        state.errorMessage = action.payload;
      });
    // sendOtpForLogin cases
  },
});

// ===========================================Exports==================================================
export const {} = projectSlice.actions;
export default projectSlice.reducer;
