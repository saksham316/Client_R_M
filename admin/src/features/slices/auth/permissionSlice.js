import { createSlice, current } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  addNewPermission,
  deletePermission,
  fetchPermissionsList,
  fetchUserSpecificPermissionsList,
  updatePermissionDetails,
} from '../../actions/auth/permissionActions';

// -------------------------------------------------------------------------------------------

// initialState -- initial state of permission
const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  permissionsList: [],
};

// -------------------------------------- Slices------------------------------------------------
const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    clearReduxStoreData: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Permission Cases
      .addCase(fetchPermissionsList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(fetchPermissionsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = '';
        state.permissionsList = action?.payload?.data?.data?.permissions;
        toast.success('Permissions Fetched Successfully');
      })
      .addCase(fetchPermissionsList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
      })

      // Fetch User based Permission Cases
      .addCase(fetchUserSpecificPermissionsList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(fetchUserSpecificPermissionsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = '';
        state.permissionsList = action?.payload?.data?.data?.permissions;
        toast.success('Permissions Fetched Successfully');
      })
      .addCase(fetchUserSpecificPermissionsList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
      })

      // Add New Permission Cases
      .addCase(addNewPermission.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(addNewPermission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = '';
        state.permissionsList = [action.payload];
        toast.success('Permission Added successfully');
      })
      .addCase(addNewPermission.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
      })
      // Update Permission Cases
      .addCase(updatePermissionDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(updatePermissionDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = '';
        state.permissionsList = [action.payload];
        toast.success('Permission Updated successfully');
      })
      .addCase(updatePermissionDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
      })
      // Delete Permission Cases
      .addCase(deletePermission.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = '';
        const filterData = current(state.permissionsList).filter(
          (item) => item._id != action.payload.permissionId
        );
        state.permissionsList = filterData;
        toast.success('Permission Deleted successfully');
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
      });
  },
});

// ===========================================Exports==================================================
export default permissionSlice.reducer;
export const { clearReduxStoreData } = permissionSlice.actions;
