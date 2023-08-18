import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllExpensesThunk, setAllExpensesThunk } from './expensesThunk';

const initialState = {
  allExpenses: [],
  recentExpenses: [],
  total: 0,
  recentTotal: 0,
  isLoading: false,
};

export const setAllExpenses = createAsyncThunk(
  'expenses/setExpenses',
  setAllExpensesThunk
);
export const getAllExpenses = createAsyncThunk(
  'expenses/getExpenses',
  getAllExpensesThunk
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, { payload }) => {
      state.allExpenses.push(payload);
    },
    deleteExpense: (state, { payload }) => {
      state.allExpenses = state.allExpenses.filter(
        (expense) => expense.id !== payload
      );
    },
    editExpense: (state, { payload: { expense, id } }) => {
      state.allExpenses[
        state.allExpenses.findIndex((expense) => expense.id === id)
      ] = expense;
    },
    setRecentExpenses: (state) => {
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);

      state.recentExpenses = state.allExpenses.filter((item) => {
        const itemDate = new Date(
          item.date.year,
          item.date.month - 1,
          item.date.day
        );
        return itemDate >= sevenDaysAgo && itemDate <= today;
      });
    },
    setTotal: (state) => {
      state.total = state.allExpenses.reduce((sum, expense) => {
        return (sum += expense.amount);
      }, 0);
    },
    setRecentTotal: (state) => {
      state.recentTotal = state.recentExpenses.reduce((sum, expense) => {
        return sum + expense.amount;
      }, 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setAllExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setAllExpenses.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllExpenses.fulfilled, (state, { payload }) => {
        state.allExpenses = payload;
        state.isLoading = false;
      });
  },
});

export const {
  addExpense,
  deleteExpense,
  editExpense,
  setRecentExpenses,
  setTotal,
  setRecentTotal,
} = expensesSlice.actions;

export default expensesSlice.reducer;
