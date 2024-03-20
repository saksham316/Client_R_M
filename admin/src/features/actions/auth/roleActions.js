import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../services/axiosInterceptor';

// ------------------------------------Async Actions----------------------------------

//This action is used to fetch all roles list from the database.
export const fetchRolesList = createAsyncThunk(
  'auth/fetchRolesList',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `admin/auth/role?limit=${payload?.limit}`,
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

//This action is used to fetch user's specific roles list from the database.
export const fetchUserSpecificRolesList = createAsyncThunk(
  'roles/fetchUserSpecificRolesList',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `admin/auth/role/${payload?.roleId}`,
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

// This Action is used to add new role.
export const addNewRole = createAsyncThunk(
  'roles/addNewRole',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post('/admin/auth/role', payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// This Action is used to update role.
export const updateRoleDetails = createAsyncThunk(
  'roles/updateRoleDetails',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(
        `admin/auth/role/${payload?.roleId}`,
        payload,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// This Action is used to delete role.
export const deleteRole = createAsyncThunk(
  'roles/deleteRole',
  async ({ roleId }, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/admin/auth/role/${roleId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return { ...data, roleId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
