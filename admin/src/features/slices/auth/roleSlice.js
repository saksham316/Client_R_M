import { createSlice, current } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  fetchRolesList,
  fetchUserSpecificRolesList,
  addNewRole,
  updateRoleDetails,
  deleteRole,
} from '../../actions/auth/roleActions';

// -------------------------------------------------------------------------------------------

// initialState -- initial state of roles
const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  rolesList: [],
};

// -------------------------------------- Slices------------------------------------------------
const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    clearReduxStoreData: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Roles Cases
      .addCase(fetchRolesList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(fetchRolesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = '';
        state.rolesList = action?.payload?.data?.data?.roles;
        toast.success('Roles Fetched Successfully');
      })
      .addCase(fetchRolesList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
      })

      // Fetch User based Roles Cases
      .addCase(fetchUserSpecificRolesList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(fetchUserSpecificRolesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = '';
        state.rolesList = action?.payload?.data?.data?.roles;
        toast.success('Roles Fetched Successfully');
      })
      .addCase(fetchUserSpecificRolesList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
      })

      // Add New Role Cases
      .addCase(addNewRole.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(addNewRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = '';
        state.rolesList = [action.payload];
        toast.success('Role Added successfully');
      })
      .addCase(addNewRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
      })
      // Update Roles Cases
      .addCase(updateRoleDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(updateRoleDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = '';
        state.rolesList = [action.payload];
        toast.success('Roles Updated successfully');
      })
      .addCase(updateRoleDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
      })
      // Delete Roles Cases
      .addCase(deleteRole.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = '';
        const filterData = current(state.rolesList).filter(
          (item) => item._id != action?.payload?.roleId
        );
        state.rolesList = filterData;
        toast.success('Role Deleted successfully');
      })
      .addCase(deleteRole.rejected, (state, action) => {
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
export default roleSlice.reducer;
export const { clearReduxStoreData } = roleSlice.actions;
