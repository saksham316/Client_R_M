import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../../services/axiosInterceptor';

// ------------------------------------Async Actions----------------------------------

//This action is used to fetch all permissions list from the database.
export const fetchPermissionsList = createAsyncThunk(
  'permissions/fetchPermissionsList',
  async (payload, { rejectWithValue }) => {
    console.log('payload::: ', payload);
    try {
      const response = await instance.get(
        `admin/auth/permission?limit=${payload?.limit}`,
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

// This action is used to fetch user's specific permissions list from the database.
export const fetchUserSpecificPermissionsList = createAsyncThunk(
  'permissions/fetchUserSpecificPermissionsList',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `admin/auth/permission/${payload?.permissionId}`,
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

// This Action is used to add new permission.
export const addNewPermission = createAsyncThunk(
  'permissions/addNewPermission',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post('/admin/auth/permission', payload, {
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

// This Action is used to update permission.
export const updatePermissionDetails = createAsyncThunk(
  'permissions/updatePermissionDetails',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(
        `admin/auth/permission/${payload?.permissionId}`,
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

// This Action is used to delete permission.
export const deletePermission = createAsyncThunk(
  'permissions/deletePermission',
  async ({ permissionId }, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(
        `/admin/auth/permission/${permissionId}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return { ...data, permissionId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
