import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTotal } from '../features/expensesSlice';
import TotalContainer from '../components/TotalContainer';
import ExpensesList from '../components/ExpensesList';
import { GlobalStyles } from '../assets/styles';

const AllExpensesScreen = () => {
  const { total, allExpenses, isLoading } = useSelector(
    (state) => state.expenses
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTotal());
  }, []);

  useEffect(() => {
    dispatch(setTotal());
  }, [allExpenses]);

  return (
    <View style={[styles.container, isLoading && { justifyContent: 'center' }]}>
      {isLoading && <ActivityIndicator size={100} />}
      {isLoading || (
        <>
          <TotalContainer title={'total'} amount={total} />
          <ExpensesList expenses={allExpenses} />
        </>
      )}
    </View>
  );
};

export default AllExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 16,
  },
});
