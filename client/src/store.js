import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import stockReducer from './features/stock/stockSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    stock: stockReducer,
  },
});
