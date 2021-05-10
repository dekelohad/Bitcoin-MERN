import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/API';

export const registerUser = createAsyncThunk(
  'users/register',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await API.post('/users', {
        username,
        password,
      });
      let data = response.data.data;

      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await API.post('users/login', {
        username,
        password,
      });

      let data = response.data;

      if (response.status === 200) {
        const token = data.token;
        localStorage.setItem('token', token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    isFetching: false,
    isError: false,
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isFetching = true;
    },
    [registerUser.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
    [registerUser.fulfilled]: (state) => {
      state.isFetching = false;
      return state;
    },

    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [loginUser.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
    [loginUser.fulfilled]: (state) => {
      state.isFetching = false;
      return state;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state) => state.user;
export default userSlice.reducer;
