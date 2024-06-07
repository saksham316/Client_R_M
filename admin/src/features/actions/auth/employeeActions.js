import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../services/axiosInterceptor';

// ------------------------------------Async Actions----------------------------------

//This action is used to fetch all employees list from the database.
export const fetchCompleteEmployeesList = createAsyncThunk(
  'employees/fetchCompleteEmployeesList',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `admin/employee?limit=${Infinity}`,
        payload,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// This Action is used to add new employee.
export const addNewEmployee = createAsyncThunk(
  'employees/addNewEmployee',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post('admin/employee', payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// This Action is used to update user by admin.
export const updateEmployeeDetails = createAsyncThunk(
  'employees/updateEmployeeDetails',
  async ({ payload, employeeId }, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(
        `admin/employee${employeeId}`,
        payload,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// This Action is used to delete user by admin.
export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async ({ employeeId }, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/admin/employee/${employeeId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return { ...data, employeeId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// This action is used to fetch id's specific employee details.
export const fetchIdSpecificEmployeeDetails = createAsyncThunk(
  'employees/fetchIdSpecificEmployeeDetails',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `admin/employee/${payload?.employeeId}`,
        payload,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// getAllCoders -- action to fetch all the coders
export const getAllCoders = createAsyncThunk(
  'employees/getAllCoders',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.get(`admin/employee/coder`, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// getAllNoteTakers -- action to fetch all the noteTakers
export const getAllNoteTakers = createAsyncThunk(
  'employees/getAllNoteTakers',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.get(`admin/employee/noteTaker`, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// getAllQAs -- action to fetch all the qas
export const getAllQAs = createAsyncThunk(
  'employees/getAllQAs',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.get(`admin/employee/qa`, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// ===================================================== THE END ===========================================
