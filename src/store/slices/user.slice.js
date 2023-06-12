import {createSlice} from '@reduxjs/toolkit';
import {fetchusers} from '../actions/userAction';
import {ThunkStatusEnum} from '../../../assets/constants/thunkStatus.enum';
import {
  defaultThunkFailureState,
  defaultThunkLoadingState,
  defaultThunkSuccessState,
} from '../../../assets/constants/thunk.config';
// TODO: Should we have api based status and errors for more fine grained control

const initialThunkState = {status: ThunkStatusEnum.IDLE, error: null};

// The initial state value for this slice of state.
const initialState = {
  user: {},
  updateFeeStatus: initialThunkState,
  
};

// TODO: Remove boilerplate?
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {restoreUserStore: () => initialState},
  extraReducers: builder => {
    builder.addCase(fetchusers.pending, state => {
      state.updateFeeStatus = defaultThunkLoadingState;
    });

    builder.addCase(fetchusers.fulfilled, (state, action) => {
      state.updateFeeStatus = defaultThunkSuccessState;
      state.user = action.payload;
    });

    builder.addCase(fetchusers.rejected, (state, action) => {
      state.updateFeeStatus = {
        ...defaultThunkFailureState,
        error: action.payload,
      };
    });
  },
});

export default userSlice.reducer;
export const {restoreUserStore} = userSlice.actions;
export const user = state => state?.user?.user || {};
