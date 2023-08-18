import { configureStore } from '@reduxjs/toolkit';
import expensesSlice from './features/expensesSlice';

export const store = configureStore({
  reducer: {
    expenses: expensesSlice,
  },
});
