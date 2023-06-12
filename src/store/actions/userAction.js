import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchusers = createAsyncThunk(
  '/fetch/users',
  async (payload, {rejectWithValue}) => {
    try {
      const {page, perPage} = payload;
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}&per_page=${perPage}`
      );  
   
      if (response && response?.status === 200 && response?.data?.length!==0) {
       return response?.data;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
   
  },
);

