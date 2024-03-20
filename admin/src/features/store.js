import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import authReducer from './slices/auth/authenticationSlice';
import roleReducer from './slices/auth/roleSlice';
import permissionReducer from './slices/auth/permissionSlice';
import employeeReducer from './slices/auth/employeeSlice';

// ---------------------------------------------------------

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  transforms: [
    encryptTransform({
      secretKey: `${process.env.REACT_APP_REDUX_PERSIST_SECRET_KEY}`,
      onError: (err) => {
        console.log('Redux Persist Encryption Failed: ', err);
      },
    }),
  ],
  // if you do not want to persist this part of the state
  // blacklist: ["omitedPart"],
};

const reducer = combineReducers({
  authentication: authReducer,
  roles: roleReducer,
  permissions: permissionReducer,
  employees: employeeReducer,
  // omitedPart: OmitReducer // not persisting this reducer
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/clearReduxStoreData') {
    state = undefined;
    localStorage.clear();
    sessionStorage.clear();
  }
  return reducer(state, action);
};

// This ensures your redux state is saved to persisted storage whenever it changes
// we pass this to the store
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.REACT_APP_WORKING_ENVIRONMENT === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

// ================================================== THE END ==================================================
