import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import ExpensesListItem from './ExpensesListItem';

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      style={styles.container}
      data={expenses}
      renderItem={({ item }) => {
        return <ExpensesListItem {...item} />;
      }}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({
  container: {},
});
