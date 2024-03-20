import { createSlice, current } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  addNewEmployee,
  deleteEmployee,
  fetchCompleteEmployeesList,
  fetchIdSpecificEmployeeDetails,
  updateEmployeeDetails,
} from '../../actions/auth/employeeActions';

// -------------------------------------------------------------------------------------------

// initialState -- initial state of employees
const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  employeesList: [],
};

// -------------------------------------- Slices------------------------------------------------
const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearReduxStoreData: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Employees Cases
      .addCase(fetchCompleteEmployeesList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(fetchCompleteEmployeesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = '';
        state.employeesList = action?.payload?.data?.data?.employees;
        toast.success('Employees Fetched Successfully');
      })
      .addCase(fetchCompleteEmployeesList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
      })

      // Fetch Id based Employee Details Cases
      .addCase(fetchIdSpecificEmployeeDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(fetchIdSpecificEmployeeDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = '';
        state.employeesList = action?.payload?.data?.data?.employee;
        toast.success('Employee Details Fetched Successfully');
      })
      .addCase(fetchIdSpecificEmployeeDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
      })

      // Add New Employee Cases
      .addCase(addNewEmployee.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(addNewEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = '';
        state.employeesList = [action.payload];
        toast.success('Employee Added successfully');
      })
      .addCase(addNewEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
      })
      // Update Employee Cases
      .addCase(updateEmployeeDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(updateEmployeeDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = '';
        state.employeesList = [action.payload];
        toast.success('Employee Details Updated successfully');
      })
      .addCase(updateEmployeeDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(
          state.errorMessage
            ? state.errorMessage
            : 'Sorry, something went wrong. Please try again later may be some Internal server error'
        );
      })
      // Delete Employee Cases
      .addCase(deleteEmployee.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = '';
        const filterData = current(state.employeesList).filter(
          (item) => item._id != action.payload.permissionId
        );
        state.employeesList = filterData;
        toast.success('Employee Deleted successfully');
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
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
export default employeeSlice.reducer;
export const { clearReduxStoreData } = employeeSlice.actions;
