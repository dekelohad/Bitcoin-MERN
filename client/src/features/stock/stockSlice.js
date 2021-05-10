import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';

import API from '../../utils/API';

export const fetchStock = createAsyncThunk(
  'stock/fetchStock',
  async ({ date }, thunkAPI) => {
    try {
      const response = await API.get(`stocks/stock?date=${date}`);

      let data = response.data.data;
      if (response.status === 201) {
        return [...data];
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const stockSlice = createSlice({
  name: 'stock',
  initialState: {
    value: '',
    date: moment(new Date()).format('YYYY-MM-DD'),
    currency: 'USD',
  },
  reducers: {
    setStockDate: (state, action) => {
      state.date = action.payload.date;
    },
    setStockCurrency: (state, action) => {
      state.currency = action.payload.currency;
    },
    setStockValue: (state, action) => {
      state.value = action.payload.value;
    },
  },
  extraReducers: {
    [fetchStock.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchStock.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [fetchStock.fulfilled]: (state, { payload }) => {
      state.value = payload.value;
      state.date = payload.date;
      state.currency = payload.currency;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
  },
});

export const {
  setStockDate,
  setStockCurrency,
  setStockValue,
} = stockSlice.actions;

export const selectStockDate = (state) => state.stock.date;
export const selectStockValue = (state) => state.stock.value;
export const selectStockCurrency = (state) => state.stock.currency;

export default stockSlice.reducer;
