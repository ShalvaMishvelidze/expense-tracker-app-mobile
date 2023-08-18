import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { GlobalStyles } from '../assets/styles';
import TotalContainer from '../components/TotalContainer';
import { useDispatch, useSelector } from 'react-redux';
import ExpensesList from '../components/ExpensesList';
import { setRecentExpenses, setRecentTotal } from '../features/expensesSlice';

const RecentExpensesScreen = () => {
  const { recentTotal, allExpenses, recentExpenses, isLoading } = useSelector(
    (state) => state.expenses
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRecentExpenses());
    dispatch(setRecentTotal());
  }, []);

  useEffect(() => {
    dispatch(setRecentExpenses());
    dispatch(setRecentTotal());
  }, [allExpenses]);

  return (
    <View style={[styles.container, isLoading && { justifyContent: 'center' }]}>
      {isLoading && <ActivityIndicator size={100} />}
      {isLoading || (
        <>
          <TotalContainer title={'last 7 days'} amount={recentTotal} />
          <ExpensesList expenses={recentExpenses} />
        </>
      )}
    </View>
  );
};

export default RecentExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 16,
  },
});
