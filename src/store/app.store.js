import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';

/*
 * This file is used to create common redux store
 */

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
